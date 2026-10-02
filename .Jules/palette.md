## 2026-10-02 - Header Anchor Links and Live Region Feedback
**Learning:** Single-page navigation headers using placeholder `href="#"` prevent standard smooth scrolling and keyboard anchor jumps to page sections. Adding explicit section `id` targets and `aria-live="polite"` feedback on copy buttons creates seamless navigation and screen-reader accessible interactions without adding extra JS runtime overhead.
**Action:** Always verify header `<nav>` links target actual section element IDs (`#section-id`) rather than `#` in single-page applications.
