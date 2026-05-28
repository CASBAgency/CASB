# CASB Insights — How to Publish an Article

Everything you need to post a new article, update the featured slot, and keep the insights page tidy.

---

## Folder Structure

```
insights/
├── index.html          ← The insights listing page (filters, featured, grid)
└── articles/
    ├── TEMPLATE.html   ← Copy this every time you write a new article
    ├── cancer-without-critical-illness.html
    ├── medical-card-vs-critical-illness.html
    └── ... (your articles)
```

---

## Step 1 — Write your article

1. Open `insights/articles/TEMPLATE.html`
2. **Save a copy** with a new filename using lowercase words and hyphens:
   - ✅ `epf-retirement-shortfall.html`
   - ✅ `private-hospital-costs-malaysia.html`
   - ❌ `My New Article (2).html`
3. Edit the sections marked with comments `<!-- EDIT ... -->`

### Things to always fill in:
| Field | Where |
|---|---|
| Page `<title>` | Line 8 in `<head>` |
| Meta description | Line 9 |
| OG title + description | Lines 10–11 |
| Canonical URL | Line 14 (replace slug) |
| Category badge | Inside `.art-hero` |
| Article `<h1>` title | Inside `.art-hero` |
| Author name | Inside `.art-hero-meta` |
| Date | Inside `.art-hero-meta` |
| Read time | Inside `.art-hero-meta` (estimate: ~200 words/min) |
| Breadcrumb last item | `<span>` after second `/` |
| Table of Contents | `.toc-list` — one `<a>` per `<h2>` in your article |
| Related articles | Update the 3 links in `.related-list` |

---

## Step 2 — Write the article body

Everything goes between the two `<!-- WRITE YOUR ARTICLE BELOW -->` comments inside `<article class="art-content">`.

### Available components (copy-paste as needed):

**Section heading**
```html
<h2>Your Heading Here</h2>
```

**Regular paragraph**
```html
<p>Your paragraph text here.</p>
```

**Gold callout (key takeaway)**
```html
<div class="callout">
  <strong>Key Takeaway:</strong> Your note here.
</div>
```

**Blue callout (context/info)**
```html
<div class="callout info">
  <strong>Did You Know?</strong> Background fact here.
</div>
```

**Red callout (warning/risk)**
```html
<div class="callout warning">
  <strong>Watch Out:</strong> Risk or mistake here.
</div>
```

**Big stat highlight**
```html
<div class="stat-highlight">
  <div class="big-num">RM300K</div>
  <div class="stat-text">
    <strong>Short bold headline</strong>
    Supporting explanation here.
  </div>
</div>
```

**Bullet list**
```html
<ul>
  <li>First point</li>
  <li>Second point</li>
</ul>
```

**Numbered list**
```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
</ol>
```

**Comparison table**
```html
<table class="compare-table">
  <thead>
    <tr><th>Feature</th><th>Option A</th><th>Option B</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Hospitalisation</td>
      <td class="tick">✓ Yes</td>
      <td class="cross">✗ No</td>
    </tr>
  </tbody>
</table>
```

**Image (if you have one)**
```html
<div class="art-img">
  <img src="../../assets/insights/your-image.jpg" alt="Describe the image">
</div>
```
> Place images in `assets/insights/` and name them clearly (e.g. `cancer-treatment-cost.jpg`)

**Horizontal divider**
```html
<hr class="art-divider">
```

**Bold text** → `<strong>word</strong>`  
**Gold highlight** → `<em>word</em>` (styled gold, not italic)

---

## Step 3 — Add it to the insights listing page

Open `insights/index.html`. Find the `ARTICLES` array near the top of the `<script>` block. It looks like this:

```js
const ARTICLES = [
  {
    title: "Most recent article...",
    ...
  },
  ...
```

**Add your new article as the FIRST item in the array.** This automatically makes it the Featured Article.

```js
const ARTICLES = [
  {
    title: "Your New Article Title",
    cat: "protection",          // protection | medical | planning | wealth | casestudy
    catLabel: "Protection",     // Human-readable label shown on the card
    excerpt: "One or two sentences that summarise what the article is about. Make it compelling.",
    readTime: "7 min read",
    date: "Jun 1, 2026",
    href: "articles/your-article-filename.html"
  },
  // ... existing articles below
```

**Category options:**
| `cat` value | `catLabel` | Used for |
|---|---|---|
| `protection` | `Protection` | Insurance, CI, riders |
| `medical` | `Medical & Health` | Hospital costs, medical cards |
| `planning` | `Planning Basics` | Budgeting, EPF, retirement |
| `wealth` | `Wealth` | Investment, savings, estate |
| `casestudy` | `Case Study` | Real client scenarios (anonymised) |

---

## Step 4 — Commit and push

If you're using GitHub Desktop:
1. Open GitHub Desktop
2. You'll see your changed files listed
3. Write a short commit message: `"Add article: your article title"`
4. Click **Commit to main**
5. Click **Push origin**

The site updates within ~2 minutes.

---

## Tips for good articles

- **Length:** 600–1200 words is ideal. Short enough to read, long enough to be useful.
- **Title format:** Lead with the problem or outcome. *"What Happens If..."*, *"Why Malaysians..."*, *"The Real Cost of..."*
- **No product names:** Keep articles educational. Don't mention specific Allianz product codes.
- **Read time:** Divide your word count by 200 to estimate minutes.
- **Disclaimer:** Already included in every article template — don't remove it.
- **Images:** Optional. If you don't have one, the template shows a clean icon placeholder.

---

## Checklist before publishing

- [ ] Filename is lowercase with hyphens, ends in `.html`
- [ ] `<title>` is filled in (not "YOUR ARTICLE TITLE HERE")
- [ ] Meta description is filled in
- [ ] Hero: category badge, title, date, read time all updated
- [ ] Table of Contents matches the `<h2>` headings in the article
- [ ] Related articles are relevant (update the 3 links)
- [ ] Article added to `ARTICLES` array in `insights/index.html`
- [ ] New article is the **first item** in the array (to become featured)
- [ ] Committed and pushed to GitHub

---

*For questions, contact the CASB web team or open a GitHub issue.*
