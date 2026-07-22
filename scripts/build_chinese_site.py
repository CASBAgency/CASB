"""Build static Simplified Chinese copies of the CASB home and Insight pages."""

from __future__ import annotations

import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CACHE_PATH = ROOT / "scripts" / "zh_translation_cache_v2.json"
TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"
SKIP_TAGS = {"style", "svg", "path", "noscript"}
TRANSLATABLE_ATTRS = {"alt", "aria-label", "placeholder", "title"}
META_NAMES = {
    "description",
    "og:title",
    "og:description",
    "twitter:title",
    "twitter:description",
}

SOURCES = [ROOT / "index.html", ROOT / "insights" / "index.html"] + sorted(
    path for path in (ROOT / "insights" / "articles").glob("*.html")
    if path.name != "TEMPLATE.html"
)

PROTECTED_TERMS = {
    r"\bmedical cards?\b": "医药卡",
    r"\bGuarantee Letters?\b": "保证函",
    r"\bGL\b": "GL",
    r"\bnon-panel hospitals?\b": "非指定医院",
    r"\bpanel hospitals?\b": "指定医院",
    r"\bcritical illness(?:es)?\b": "重大疾病",
    r"\bpolicyholders?\b": "保单持有人",
    r"\bunderwriting\b": "核保",
    r"\bco-insurance\b": "共同保险",
    r"\briders?\b": "附加险",
    r"\bMyAllianz\b": "MyAllianz",
    r"\bCASB Agency\b": "CASB Agency",
    r"\bAllianz\b": "Allianz",
}

CHINESE_NORMALISATION = {
    "医疗卡": "医药卡",
    "担保信": "保证函",
    "保证信": "保证函",
    "担保函": "保证函",
    "小组医院": "指定医院",
    "面板医院": "指定医院",
    "非小组医院": "非指定医院",
    "非面板医院": "非指定医院",
    "保险人": "保险公司",
    "承保过程": "核保过程",
    "CASB 机构": "CASB Agency",
    "保险代理人": "保险代理员",
    "保护需求": "保障需求",
    "保护规划": "保障规划",
    "保护计划": "保障计划",
    "保护范围": "保障范围",
    "承保范围": "保障范围",
    "政策持有人": "保单持有人",
    "保单患者": "保单持有人",
    "政策福利": "保单保障",
    "保单福利": "保单保障",
    "面板状态": "指定医院资格",
    "面板列表": "指定医院名单",
    "面板网络": "指定医院网络",
    "总账": "GL",
    "总帐": "GL",
    "现金医疗": "免现金医疗",
    "无现金入场": "免现金入院",
    "无现金入院": "免现金入院",
    "无免现金": "免现金",
    "医疗保健通胀": "医疗通胀",
    "复职": "保单复效",
    "预先存在的状况": "投保前已存在的疾病",
    "原有疾病": "既有病症",
    "房间权利": "病房与膳食限额",
    "合理且惯常的费用": "合理及惯常费用",
    "免赔额": "自付额",
    "免索赔": "无索赔",
    "专家组医院": "指定医院",
    "非专家组医院": "非指定医院",
    "非专家组身份": "非指定医院身份",
    "非专家组状态": "非指定医院状态",
    "非专家组列表": "非指定医院名单",
    "专家组索赔": "指定医院索赔",
    "非专家组索赔": "非指定医院索赔",
    "医院小组": "指定医院网络",
    "专家组与非指定医院": "指定医院与非指定医院",
    "专家组身份": "指定医院身份",
    "专家组地位": "指定医院身份",
    "专家组状态": "指定医院状态",
    "专家组名单": "指定医院名单",
    "专家组列表": "指定医院名单",
    "专家组网络": "指定医院网络",
    "保留专家组": "维持指定医院资格",
    "医院的指定医院名单": "保险公司的指定医院名单",
    "保单患者": "保单持有人",
    "政策状态": "保单状态",
    "政策限制": "保单限额",
    "政策恢复": "保单复效",
    "政策失效": "保单失效",
    "政策条件": "保单条款",
    "保单承保": "保单保障",
    "最终索赔": "最终索赔决定",
    "最终索赔决定决定": "最终索赔决定",
    "最好的想法": "结语",
    "最后的想法": "结语",
    "支付首保": "先付款",
    "付款单": "付款凭证",
    "医疗报告费": "医疗报告费用",
    "房价": "病房费用",
    "防护完成": "保障规划完整",
    "保护您的收入": "保障您的收入",
    "审查您的保护": "检视您的保障",
    "保险并不是为了在医院里生存。这是关于之后的生存。": "保险不只是帮助您渡过住院期，更要保障康复后的生活。",
    "人们应该知道的挑战": "从业前应了解的挑战",
    "无薪资上限": "收入没有固定上限",
    "销售保单": "销售保单",
    "VISION": "愿景",
    "MISSION": "使命",
    "Step 2: Confirm That the Doctor Participates": "第 2 步：确认主治医生属于指定医疗网络",
    "Step 3: Present Your 医药卡 and Identification": "第 3 步：出示医药卡和身份证明",
    "Step 6: The Final GL Is Requested at Discharge": "第 6 步：出院时申请最终保证函",
}


def has_english(value: str) -> bool:
    return bool(re.search(r"[A-Za-z]{2,}", value))


def should_translate(value: str) -> bool:
    stripped = value.strip()
    if not stripped or not has_english(stripped):
        return False
    if re.fullmatch(r"(?:https?://|mailto:|tel:).*", stripped):
        return False
    if re.fullmatch(r"[A-Z0-9_./:@?&=#%+-]+", stripped):
        return False
    return True


def protect_terms(value: str) -> str:
    # Translate complete English sentences first; terminology is standardised afterward.
    return value


def normalise_chinese(value: str) -> str:
    result = value
    for source, replacement in CHINESE_NORMALISATION.items():
        result = result.replace(source, replacement)
    result = result.replace("CASB机构", "CASB Agency")
    result = result.replace("安联", "Allianz")
    return result


def flatten_translation(payload: list) -> str:
    return "".join(part[0] for part in payload[0] if part and part[0])


class Translator:
    def __init__(self) -> None:
        self.cache = json.loads(CACHE_PATH.read_text(encoding="utf-8")) if CACHE_PATH.exists() else {}

    def translate_many(self, values: list[str]) -> dict[str, str]:
        unique = list(dict.fromkeys(value.strip() for value in values if should_translate(value)))
        missing = [value for value in unique if value not in self.cache]
        batches: list[list[str]] = []
        current: list[str] = []
        size = 0
        for value in missing:
            prepared = protect_terms(value)
            projected = len(prepared) + 28
            if current and size + projected > 3600:
                batches.append(current)
                current = []
                size = 0
            current.append(value)
            size += projected
        if current:
            batches.append(current)

        for batch_index, batch in enumerate(batches, 1):
            markers = [f"[[[CASBSEP{i:04d}]]]" for i in range(1, len(batch))]
            pieces: list[str] = []
            for index, source in enumerate(batch):
                pieces.append(protect_terms(source))
                if index < len(markers):
                    pieces.append(markers[index])
            translated = self._request(" ".join(pieces))
            pattern = r"\s*\[\[\[CASBSEP\d{4}\]\]\]\s*"
            results = re.split(pattern, translated)
            if len(results) != len(batch):
                for source in batch:
                    self.cache[source] = normalise_chinese(self._request(protect_terms(source)))
            else:
                for source, result in zip(batch, results):
                    self.cache[source] = normalise_chinese(result.strip())
            CACHE_PATH.write_text(json.dumps(self.cache, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"Translated batch {batch_index}/{len(batches)} ({len(batch)} segments)")
            time.sleep(0.15)
        return {value: self.cache.get(value.strip(), value.strip()) for value in unique}

    def _request(self, text: str) -> str:
        query = urllib.parse.urlencode({"client": "gtx", "sl": "en", "tl": "zh-CN", "dt": "t", "q": text})
        request = urllib.request.Request(f"{TRANSLATE_URL}?{query}", headers={"User-Agent": "Mozilla/5.0"})
        for attempt in range(4):
            try:
                with urllib.request.urlopen(request, timeout=45) as response:
                    return flatten_translation(json.loads(response.read().decode("utf-8")))
            except Exception:
                if attempt == 3:
                    raise
                time.sleep(1.5 * (attempt + 1))
        raise RuntimeError("Translation request failed")


class SegmentCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.skip_depth = 0
        self.json_script = False
        self.segments: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag in SKIP_TAGS:
            self.skip_depth += 1
        if tag == "script":
            self.json_script = attr_map.get("type") == "application/ld+json"
            if not self.json_script:
                self.skip_depth += 1
        for name, value in attrs:
            if value and (name in TRANSLATABLE_ATTRS or (tag == "meta" and name == "content" and self._meta_translatable(attr_map))):
                if should_translate(value):
                    self.segments.append(value)

    def handle_endtag(self, tag: str) -> None:
        if tag in SKIP_TAGS and self.skip_depth:
            self.skip_depth -= 1
        if tag == "script":
            if self.json_script:
                self.json_script = False
            elif self.skip_depth:
                self.skip_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.json_script:
            try:
                collect_json_strings(json.loads(data), self.segments)
            except json.JSONDecodeError:
                pass
        elif not self.skip_depth and should_translate(data):
            self.segments.append(data)

    @staticmethod
    def _meta_translatable(attrs: dict[str, str | None]) -> bool:
        key = attrs.get("name") or attrs.get("property")
        return key in META_NAMES


def collect_json_strings(value: object, output: list[str], key: str = "") -> None:
    if isinstance(value, dict):
        for child_key, child in value.items():
            collect_json_strings(child, output, child_key)
    elif isinstance(value, list):
        for child in value:
            collect_json_strings(child, output, key)
    elif isinstance(value, str) and key in {"headline", "description", "name", "text", "articleSection"} and should_translate(value):
        output.append(value)


def map_internal_url(value: str, source_path: Path) -> str:
    if not value or value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
        return value
    base = "/" + source_path.relative_to(ROOT).as_posix()
    parsed = urllib.parse.urlsplit(urllib.parse.urljoin(base, value))
    path = parsed.path
    if path in {"/", "/index.html"}:
        path = "/zh/index.html"
    elif path.startswith("/insights/"):
        path = "/zh" + path
    return urllib.parse.urlunsplit(("", "", path, parsed.query, parsed.fragment))


class ChineseRenderer(HTMLParser):
    def __init__(self, translations: dict[str, str], source_path: Path) -> None:
        super().__init__(convert_charrefs=False)
        self.translations = translations
        self.source_path = source_path
        self.parts: list[str] = []
        self.skip_depth = 0
        self.json_script = False

    def handle_decl(self, decl: str) -> None:
        self.parts.append(f"<!{decl}>")

    def handle_comment(self, data: str) -> None:
        self.parts.append(f"<!--{data}-->")

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag in SKIP_TAGS:
            self.skip_depth += 1
        if tag == "script":
            self.json_script = attr_map.get("type") == "application/ld+json"
            if not self.json_script:
                self.skip_depth += 1
        rendered: list[str] = []
        for name, value in attrs:
            if value is None:
                rendered.append(name)
                continue
            updated = value
            if tag == "html" and name == "lang":
                updated = "zh-Hans"
            elif name in {"href", "src"}:
                updated = map_internal_url(value, self.source_path)
            elif name in TRANSLATABLE_ATTRS or (tag == "meta" and name == "content" and SegmentCollector._meta_translatable(attr_map)):
                updated = translate_value(value, self.translations)
            rendered.append(f'{name}="{html.escape(updated, quote=True)}"')
        suffix = " " + " ".join(rendered) if rendered else ""
        self.parts.append(f"<{tag}{suffix}>")

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        rendered: list[str] = []
        attr_map = dict(attrs)
        for name, value in attrs:
            if value is None:
                rendered.append(name)
                continue
            updated = value
            if name in {"href", "src"}:
                updated = map_internal_url(value, self.source_path)
            elif name in TRANSLATABLE_ATTRS or (tag == "meta" and name == "content" and SegmentCollector._meta_translatable(attr_map)):
                updated = translate_value(value, self.translations)
            rendered.append(f'{name}="{html.escape(updated, quote=True)}"')
        suffix = " " + " ".join(rendered) if rendered else ""
        self.parts.append(f"<{tag}{suffix}/>")

    def handle_endtag(self, tag: str) -> None:
        self.parts.append(f"</{tag}>")
        if tag in SKIP_TAGS and self.skip_depth:
            self.skip_depth -= 1
        if tag == "script":
            if self.json_script:
                self.json_script = False
            elif self.skip_depth:
                self.skip_depth -= 1

    def handle_entityref(self, name: str) -> None:
        self.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        self.parts.append(f"&#{name};")

    def handle_data(self, data: str) -> None:
        if self.json_script:
            try:
                payload = translate_json(json.loads(data), self.translations)
                self.parts.append(json.dumps(payload, ensure_ascii=False, indent=2))
                return
            except json.JSONDecodeError:
                pass
        if not self.skip_depth and should_translate(data):
            self.parts.append(preserve_spacing(data, translate_value(data, self.translations)))
        else:
            self.parts.append(normalise_chinese(data))


def translate_value(value: str, translations: dict[str, str]) -> str:
    return normalise_chinese(translations.get(value.strip(), value.strip()))


def preserve_spacing(source: str, translated: str) -> str:
    leading = source[: len(source) - len(source.lstrip())]
    trailing = source[len(source.rstrip()):]
    return leading + translated + trailing


def translate_json(value: object, translations: dict[str, str], key: str = "") -> object:
    if isinstance(value, dict):
        return {child_key: translate_json(child, translations, child_key) for child_key, child in value.items()}
    if isinstance(value, list):
        return [translate_json(child, translations, key) for child in value]
    if isinstance(value, str):
        if key == "inLanguage":
            return "zh-CN"
        if key in {"url", "@id"} and "casb-six.vercel.app/insights/" in value:
            return value.replace("casb-six.vercel.app/insights/", "casb-six.vercel.app/zh/insights/")
        if key in {"headline", "description", "name", "text", "articleSection"}:
            return translate_value(value, translations)
    return value


def translate_article_data(source: str, translations: dict[str, str]) -> str:
    block_match = re.search(r"const ARTICLES = \[(.*?)\n\];", source, flags=re.S)
    if not block_match:
        return source
    block = block_match.group(1)
    pattern = re.compile(r'(?P<prefix>\b(?:title|catLabel|excerpt|readTime|date):\s*")(?P<value>(?:\\.|[^"\\])*)(?P<suffix>")')

    def replace(match: re.Match[str]) -> str:
        value = bytes(match.group("value"), "utf-8").decode("unicode_escape") if "\\" in match.group("value") else match.group("value")
        translated = translate_value(value, translations).replace("\\", "\\\\").replace('"', '\\"')
        return match.group("prefix") + translated + match.group("suffix")

    translated_block = pattern.sub(replace, block)
    return source[: block_match.start(1)] + translated_block + source[block_match.end(1):]


def output_path(source_path: Path) -> Path:
    return ROOT / "zh" / source_path.relative_to(ROOT)


def page_urls(source_path: Path) -> tuple[str, str]:
    relative = source_path.relative_to(ROOT).as_posix()
    english_path = "/" if relative == "index.html" else f"/{relative}"
    chinese_path = f"/zh/{relative}"
    return f"https://casb-six.vercel.app{english_path}", f"https://casb-six.vercel.app{chinese_path}"


def add_language_seo(rendered: str, source_path: Path) -> str:
    english_url, chinese_url = page_urls(source_path)
    # CSS and JavaScript strings are not parsed as HTML attributes. Root-relative
    # asset paths keep those images valid from every nested /zh/ route.
    rendered = re.sub(r'(?:\.\./)+assets/', '/assets/', rendered)
    rendered = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*', "", rendered)
    rendered = rendered.replace("https://casb-six.vercel.app/insights/", "https://casb-six.vercel.app/zh/insights/")
    alternates = (
        f'<link rel="alternate" hreflang="en-MY" href="{english_url}">\n'
        f'<link rel="alternate" hreflang="zh-Hans-MY" href="{chinese_url}">\n'
        f'<link rel="alternate" hreflang="x-default" href="{english_url}">'
    )
    rendered = re.sub(r'<link rel="canonical" href="[^"]+">',
                      f'<link rel="canonical" href="{chinese_url}">\n{alternates}', rendered, count=1)
    rendered = re.sub(r'(<meta property="og:url" content=")[^"]+("\s*/?>)',
                      rf'\g<1>{chinese_url}\2', rendered, count=1)
    rendered = rendered.replace('<meta property="og:locale" content="en_MY">',
                                '<meta property="og:locale" content="zh_MY">')
    if source_path == ROOT / "index.html":
        rendered = rendered.replace('"url": "https://casb-six.vercel.app/"',
                                    '"url": "https://casb-six.vercel.app/zh/index.html"')
        rendered = rendered.replace('"inLanguage": "en-MY"', '"inLanguage": "zh-CN"')
    return rendered


def add_english_language_seo(source: str, source_path: Path) -> str:
    updated = source
    if 'hreflang="zh-Hans-MY"' not in updated:
        english_url, chinese_url = page_urls(source_path)
        alternates = (
            f'<link rel="alternate" hreflang="en-MY" href="{english_url}">\n'
            f'<link rel="alternate" hreflang="zh-Hans-MY" href="{chinese_url}">\n'
            f'<link rel="alternate" hreflang="x-default" href="{english_url}">'
        )
        updated = re.sub(r'(<link rel="canonical" href="[^"]+">)', rf'\1\n{alternates}', updated, count=1)
    if source_path != ROOT / "index.html":
        updated = re.sub(r'<script(?![^>]*\btype=)([^>]*\bsrc="[^"]*main\.js"[^>]*)>',
                         r'<script type="module"\1>', updated)
    return updated


def preserve_homepage_beliefs(rendered: str, english_source: str) -> str:
    pattern = re.compile(r'<section class="casb-belief-section">.*?</section>', re.S)
    match = pattern.search(english_source)
    if not match:
        return rendered
    belief_section = re.sub(r'(?:\.\./)*assets/', '/assets/', match.group(0))
    return pattern.sub(lambda _: belief_section, rendered, count=1)


def update_sitemap() -> None:
    sitemap_path = ROOT / "sitemap.xml"
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    existing = {node.text for node in root.findall(f"{namespace}url/{namespace}loc")}
    for source_path in SOURCES:
        _, chinese_url = page_urls(source_path)
        if chinese_url in existing:
            continue
        url = ET.SubElement(root, f"{namespace}url")
        ET.SubElement(url, f"{namespace}loc").text = chinese_url
        ET.SubElement(url, f"{namespace}lastmod").text = "2026-07-22"
        ET.SubElement(url, f"{namespace}changefreq").text = "monthly"
        ET.SubElement(url, f"{namespace}priority").text = "0.8" if "insights" in chinese_url else "1.0"
    ET.indent(tree, space="  ")
    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)


def main() -> int:
    collector_segments: list[str] = []
    source_texts: dict[Path, str] = {}
    for source_path in SOURCES:
        source = source_path.read_text(encoding="utf-8")
        source_texts[source_path] = source
        collector = SegmentCollector()
        collector.feed(source)
        collector_segments.extend(collector.segments)
        if source_path == ROOT / "insights" / "index.html":
            block = re.search(r"const ARTICLES = \[(.*?)\n\];", source, flags=re.S)
            if block:
                collector_segments.extend(re.findall(r'\b(?:title|catLabel|excerpt|readTime|date):\s*"((?:\\.|[^"\\])*)"', block.group(1)))

    translator = Translator()
    translations = translator.translate_many(collector_segments)

    for source_path, source in source_texts.items():
        english_source = add_english_language_seo(source, source_path)
        if english_source != source:
            source_path.write_text(english_source, encoding="utf-8", newline="\n")
        renderer = ChineseRenderer(translations, source_path)
        renderer.feed(english_source)
        rendered = "".join(renderer.parts)
        if source_path == ROOT / "insights" / "index.html":
            rendered = translate_article_data(rendered, translations)
            rendered = rendered.replace("Read Article →", "阅读文章 →")
        rendered = add_language_seo(rendered, source_path)
        if source_path == ROOT / "index.html":
            rendered = preserve_homepage_beliefs(rendered, english_source)
        target = output_path(source_path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(rendered, encoding="utf-8", newline="\n")
        print(f"Wrote {target.relative_to(ROOT)}")
    update_sitemap()
    return 0


if __name__ == "__main__":
    sys.exit(main())
