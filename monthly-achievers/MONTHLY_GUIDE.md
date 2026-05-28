# Monthly Achievers — How to Add New Posters

## Folder Structure

```
monthly-achievers/
├── monthly.html              ← the main page (edit this to add new months)
├── MONTHLY_GUIDE.md          ← this file
└── monthly-poster/           ← all poster images live here
    ├── monthly-1.png
    ├── monthly-2.png
    └── ...
```

---

## How to Add a New Month's Posters

### Step 1 — Upload your image(s)

Name your file clearly using this format:

```
YYYY-MM-monthname.png
```

Examples:
- `2026-06-june.png`
- `2026-06-june-2.png` (if there are multiple posters for the same month)

Upload to the `monthly-poster/` folder.

---

### Step 2 — Add the month to `monthly.html`

Open `monthly.html` and find the `MONTHS` list near the top of the `<script>` section. It looks like this:

```python
MONTHS = [
    (2026, 5,  "May",      ["monthly-poster/monthly-1.png"]),
    (2026, 4,  "April",    ["monthly-poster/monthly-2.png"]),
    ...
```

**Add your new month as the FIRST item** (most recent first):

```python
MONTHS = [
    (2026, 6,  "June",     ["monthly-poster/2026-06-june.png"]),   # ← ADD HERE
    (2026, 5,  "May",      ["monthly-poster/monthly-1.png"]),
    ...
```

If a month has multiple posters, add them all in the list:

```python
(2026, 6, "June", [
    "monthly-poster/2026-06-june.png",
    "monthly-poster/2026-06-june-2.png"
]),
```

---

### Step 3 — Commit and push

Using GitHub Desktop:
1. You'll see the changed files
2. Write commit message: `"Add June 2026 monthly achievers"`
3. Click **Commit to main** → **Push origin**

Done. The page updates within ~2 minutes.

---

## How It Works

- **Years** are shown as large headings (2026, 2025, 2024…)
- **Months** are accordion rows — click to expand and see posters
- **Most recent month** is open by default when you land on the page
- **Click any poster** to open it full-size in a lightbox
- **New year is created automatically** when you add a month with a new year number

---

## Naming Convention (recommended going forward)

| Old style | New style |
|---|---|
| `monthly-1.png` | `2026-05-may.png` |
| `monthly-2.png` | `2026-04-april.png` |

The old filenames still work — no need to rename existing files.

---

## Quick Checklist

- [ ] Image uploaded to `monthly-poster/`
- [ ] New entry added as FIRST item in `MONTHS` list in `monthly.html`
- [ ] Year and month number are correct
- [ ] Committed and pushed to GitHub
