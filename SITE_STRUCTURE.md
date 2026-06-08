# CASB Site Structure

This is a static website. Keep the layers simple:

- `index.html` contains the homepage content, links, sections, cards, and forms.
- `style.css` contains layout, colors, responsive rules, and visual states.
- `main.js` contains interactions only: animations, menu toggles, carousels, scroll behavior, and form submission.
- Page folders such as `events/`, `achievements/`, `team/`, `insights/`, `mda-award/`, `mdrt/`, and `monthly-achievers/` contain their own pages and local assets where needed.
- Shared images and icons live under `assets/`.

## Editing Rules

1. Put real content and destination links directly in HTML.
2. Do not use JavaScript to rewrite card text, menus, or footer links after the page loads.
3. Avoid inline `style="..."`; add a class in CSS instead.
4. Keep JavaScript small and behavior-focused.
5. When creating a new gallery or content page, link to it directly from the relevant HTML section.

## Homepage Sections

The homepage flows in this order:

1. Navigation
2. Floating social/contact actions
3. Hero
4. About
5. Vision / Mission / Core Values
6. Achievements
7. Events
8. Branches
9. Contact
10. Footer