# UNIT II - SKILL DEVELOPMENT LABORATORY ASSESSMENT SCENARIO-BASED QUESTIONS
## Course Title: WEB TECHNOLOGY | Course Code: ITA02_WEB
### Topic: Responsive University Event Registration Portal Using CSS3

---

### 📋 Student & Assessment Cover Information

| Field | Assessment Record |
|---|---|
| **Student Name** | **Dhiyanshu Dev K.P.** |
| **Register Number** | **192421056** |
| **Class / Section** | **B.Tech - Information Technology (IT)** |
| **Course Title & Code** | **Web Technology (ITA02_WEB)** |
| **Institution** | **SIMATS University, Chennai** |
| **Assessment Type** | **Unit II Skill Development Laboratory Assessment (Scenario-Based)** |
| **Date & Session** | **August 08, 2026** |
| **Total Marks** | **100 Marks** |

---

## 1. Scenario Interpretation & Problem Statement

SIMATS University conducts various technical workshops, hackathons, cultural galas, and placement-training bootcamps. Its legacy event-registration interface suffered from poor user experience: content was presented as unstyled plain text, event cards were misaligned, and the page required horizontal scrolling on mobile devices.

To address this, a responsive, accessible, and modern **University Event Registration Portal (`SIMATS EventHub`)** was engineered using semantic **HTML5** and **CSS3**.

---

## 2. Technical Note & CSS Architecture Justification

### A. Methods of Applying CSS & Justification (Requirement B.1)

The project demonstrates all three methods of applying CSS:

1. **Inline CSS**: Applied to a specific element within the registration form:
   ```html
   <span style="color: #ef4444; font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
       * All fields marked with asterisk are required
   </span>
   ```
   *Usage Justification*: Suitable only for one-off, unique overrides where global rule abstraction is unnecessary.

2. **Internal CSS**: Defined within the `<style>` element in the document `<head>`:
   ```html
   <style>
       #internal-demo-banner {
           background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
           border-bottom: 1px solid rgba(99, 102, 241, 0.3);
           color: #f8fafc;
           padding: 0.6rem 1rem;
           text-align: center;
           font-size: 0.85rem;
       }
   </style>
   ```
   *Usage Justification*: Ideal for single-page specific styling or page-unique alert notification banners.

3. **External CSS (`style.css`)**: Linked externally via `<link rel="stylesheet" href="style.css">`.
   *Justification for Multi-Page Websites*: External style sheets are **most suitable** for production multi-page applications because:
   - **Reusability**: A single `style.css` file styles hundreds of pages across the portal, ensuring consistent typography, color palettes, and grid layouts.
   - **Browser Caching**: Browsers download and cache `style.css` on the initial visit, reducing HTTP requests and page load latency for subsequent navigation.
   - **Maintainability**: Global design updates (e.g. changing primary color variables) require editing only one central CSS file.
   - **Separation of Concerns**: Maintains clean, semantic HTML structure decoupled from presentation logic.

---

### B. Selector Types & Core Syntax Analysis (Requirement B.2)

The style sheet implements 9 distinct selector types:

1. **Element Selector**: `body`, `header`, `article`, `p`, `label`, `footer`
2. **Class Selector**: `.event-card`, `.glass-card`, `.btn-primary`, `.category-tag`
3. **ID Selector**: `#main-header`, `#card-hackathon`, `#registration-form`, `#fixed-help-btn`
4. **Group Selector**: `h1, h2, h3, h4`, `input, select, textarea`
5. **Descendant Selector**: `.nav-list li a`, `.footer-links a`
6. **Child Selector**: `.event-grid > .event-card`, `.header-container > .brand-logo`
7. **Attribute Selector**: `input[type="email"]`, `input[type="text"]`, `span[data-status="open"]`
8. **Pseudo-Class Selector**: `.btn:hover`, `input:focus`, `.nav-link.active`
9. **Pseudo-Element Selector**: `.sub-header-tag::before`, `.hero-title::after`, `.required-star::after`

---

## 3. CSS Box Model Analysis & Total Horizontal Width Calculation

### Requirement B.3: Box Model Breakdown & Mathematical Proof

Every event card (`.event-card`) visibly demonstrates all four box model components: **content**, **padding**, **border**, and **margin**.

```text
+-------------------------------------------------------+
| MARGIN                                                |
|   +-----------------------------------------------+   |
|   | BORDER                                        |   |
|   |   +---------------------------------------+   |   |
|   |   | PADDING                               |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   |   | CONTENT (Event Title, Image,  |   |   |   |
|   |   |   | Description & Buttons)        |   |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   +---------------------------------------+   |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+
```

### Event Card Box Model Specifications:
- **Specified Content Width ($W_{\text{content}}$)** = $280\text{ px}$
- **Padding Left & Right ($P_{\text{left}}, P_{\text{right}}$)** = $20\text{ px}$ each (Total Horizontal Padding = $40\text{ px}$)
- **Border Left & Right ($B_{\text{left}}, B_{\text{right}}$)** = $2\text{ px}$ solid each (Total Horizontal Border = $4\text{ px}$)
- **Margin Left & Right ($M_{\text{left}}, M_{\text{right}}$)** = $15\text{ px}$ each (Total Horizontal Margin = $30\text{ px}$)

---

### Step-by-Step Width Calculation:

#### 1. Default Box Model (`box-sizing: content-box`):
Under `content-box`, the specified `width` applies **only** to the content area. Padding and border are added **outside** the width.

$$\text{Rendered Box Width} = W_{\text{content}} + P_{\text{left}} + P_{\text{right}} + B_{\text{left}} + B_{\text{right}}$$
$$\text{Rendered Box Width} = 280\text{px} + 20\text{px} + 20\text{px} + 2\text{px} + 2\text{px} = 324\text{px}$$

$$\text{Total Horizontal Space Occupied} = \text{Rendered Box Width} + M_{\text{left}} + M_{\text{right}}$$
$$\text{Total Horizontal Space Occupied} = 324\text{px} + 15\text{px} + 15\text{px} = 354\text{px}$$

---

#### 2. Applied Box Model (`box-sizing: border-box`):
When `box-sizing: border-box` is applied, the specified `width` ($280\text{px}$) includes padding and border. The content area automatically shrinks:

$$W_{\text{content (computed)}} = \text{Specified Width} - (P_{\text{left}} + P_{\text{right}} + B_{\text{left}} + B_{\text{right}})$$
$$W_{\text{content (computed)}} = 280\text{px} - 44\text{px} = 236\text{px}$$

$$\text{Rendered Box Width} = 280\text{px}$$

$$\text{Total Horizontal Space Occupied} = 280\text{px} + 30\text{px} = 310\text{px}$$

### Impact of `border-box`:
Applying `border-box` eliminates unexpected grid overflow by guaranteeing that elements never grow wider than their defined CSS width, simplifying responsive multi-column calculations.

---

## 4. Layout & Positioning Beyond Normal Flow

### Primary Layout (Normal Flow)
The primary layout uses **CSS Grid** (`grid-template-columns: repeat(4, 1fr)`) combined with **Flexbox** for internal card alignment.

### Beyond Normal Flow Techniques (Requirement B.5):
1. **Sticky Positioning (`#main-header`)**:
   - Rule: `position: sticky; top: 0; z-index: 1000;`
   - Purpose: Navigational header remains pinned to top during user scrolling without leaving normal document flow prematurely.
2. **Absolute Positioning (`.status-badge`)**:
   - Rule: `position: absolute; top: 15px; right: 15px;`
   - Purpose: Places event status badges in the top-right corner of event cards. Parent `.event-card` uses `position: relative;` to establish the positioning context.
3. **Fixed Positioning (`#fixed-help-btn`)**:
   - Rule: `position: fixed; bottom: 25px; right: 25px; z-index: 999;`
   - Purpose: Pins a floating support button to the bottom-right corner of the viewport regardless of scroll position.

---

## 5. Other Visual CSS Properties Implemented

The style sheet implements 10 visual properties:
1. `background-image`: Custom linear gradients for card headers and buttons.
2. `border-radius`: Smooth 24px and 16px glassmorphism corners.
3. `box-shadow`: Depth shadow `0 20px 40px -15px rgba(0,0,0,0.5)`.
4. `text-shadow`: Heading contrast enhancement `0 2px 10px rgba(99,102,241,0.3)`.
5. `opacity`: Backdrop blur and subtle ambient orbs opacity control.
6. `overflow`: `overflow-x: hidden` preventing mobile horizontal scroll.
7. `cursor`: `cursor: pointer` on interactive elements.
8. `transition`: `transition: all 0.3s cubic-bezier(...)` smooth hover effects.
9. `transform`: `transform: translateY(-6px)` on card hover states.
10. `max-width`: `max-width: 1200px` for responsive container constraining.

---

## 6. Responsive Design & Media Query Breakpoints

Media queries adapt the portal seamlessly across screen sizes:

```css
/* Desktop: 4 Columns (default) */
.event-grid { grid-template-columns: repeat(4, 1fr); }

/* Tablet (max-width: 992px): 2 Columns */
@media (max-width: 992px) {
    .event-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile (max-width: 768px & 375px): 1 Column */
@media (max-width: 768px) {
    .event-grid { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
}
```

### Mobile Verification at 375px:
- Verified single-column stacked layout.
- Zero horizontal scrolling required.
- Accessible touch targets (minimum 44px height).

---

## 7. Required Testing Evidence & Resolution of Layout Issues

### Browser Compatibility Testing:
Tested and verified across two open-source web browsers:
1. **Mozilla Firefox 125** (Gecko Rendering Engine)
2. **Chromium / Google Chrome 124** (Blink Rendering Engine)

### Documented Layout Issues & Corrections (Requirement F):

#### Issue 1: Absolute Badge Overlapping Event Title on Mobile Viewports (375px)
- **Symptom**: On screen widths <= 375px, the absolutely positioned `.status-badge` overlapped the long event title text in Card 1.
- **Root Cause**: Fixed card header height without sufficient top padding.
- **Correction Applied**: Added `padding-top: 2rem` to `.card-body` and reduced badge font-size to `0.72rem` on mobile media query.

#### Issue 2: Flexbox Navigation Overflowing Header on Tablet Screens (768px)
- **Symptom**: Navigation links wrapped awkwardly and overlapped the university logo on tablet portrait screens.
- **Root Cause**: Static horizontal flex gap without wrapping rules.
- **Correction Applied**: Added `flex-wrap: wrap` to `.header-container` and reduced link gap from `1.5rem` to `0.5rem` below `768px`.

---

## ✍️ Academic Integrity Declaration

I declare that the submitted source code, CSS style sheet, box-model calculations, and design architecture are my own original work, developed independently for the **Unit II Skill Development Laboratory Assessment**.

**Student Name**: Dhiyanshu Dev K.P.  
**Register Number**: 192421056  
**Department**: B.Tech - Information Technology (IT)  
**Date**: August 08, 2026  
