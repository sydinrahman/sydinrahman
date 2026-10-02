## 2026-10-02 - Duplicate Render-Blocking Font Stylesheets in HTML Head
**Learning:** Duplicate `<link>` tag imports for Google Fonts (like `Material+Symbols+Outlined`) trigger redundant DNS/TLS or HTTP requests and duplicate CSSOM parsing, increasing initial render-blocking time without providing any functional benefit.
**Action:** Audit `<head>` imports in static HTML sites and consolidate duplicate font stylesheet links into a single request.
