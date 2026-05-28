# Monthly Achievers — How to Add New Posters

## File Structure

```
monthly-achievers/
├── monthly.html          ← Year selector landing page
├── 2026.html             ← 2026 month accordion
├── 2025.html             ← 2025 month accordion
├── 2024.html             ← 2024 month accordion
├── MONTHLY_GUIDE.md      ← This file
└── monthly-poster/       ← All poster images
    ├── monthly-1.png     ← (existing — April 2026)
    ├── monthly-2.png     ← (existing — April 2026)
    └── ...
```

---

## How to Add a New Month's Posters

### Step 1 — Upload the image

Name it clearly:
```
2026-05-may-achievers.png
2026-05-may-achievers-2.png   ← if multiple posters
```

Upload to: `monthly-achievers/monthly-poster/`

---

### Step 2 — Add to the correct year page

Open the matching year file (e.g. `2026.html` for May 2026).

Find the month you want inside `YEAR_DATA`. Example for adding May 2026:

**Before:**
```python
(5, "May", []),
```

**After:**
```python
(5, "May", [
    "monthly-poster/2026-05-may-achievers.png",
]),
```

The month with posters will auto-expand on page load if it's the first one listed.

---

### Step 3 — Commit and push

GitHub Desktop:
1. See changed files listed
2. Commit message: `"Add May 2026 monthly achievers"`
3. Commit to main → Push origin

---

## Adding a New Year

When 2027 arrives:

1. Duplicate `2026.html`, rename to `2027.html`
2. Update the year number and month data inside
3. Add `2027` to the `YEARS` list in `monthly.html`
4. Add a new `<a class="year-btn" href="2027.html">` button in `monthly.html`

---

## Quick Checklist

- [ ] Image uploaded to `monthly-poster/`
- [ ] Filename is clear and dated
- [ ] Entry added to the correct month in the correct year `.html`
- [ ] Committed and pushed
