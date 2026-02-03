Here you go — **full `INSTRUCTION.md` wrapped in a Markdown block**, ready to paste directly into your repo 👌

```md
# Frontend Instructions & Architecture Guide

This document explains **how to build and maintain the frontend** for this project.  
The goal is **clarity, abstraction, and long-term maintainability**.

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime & Package Manager:** Bun
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** react-icons (only when necessary)
- **Styling:** Tailwind CSS
- **Fonts:** Outfit + Rubik (Google Fonts)
- **Theme:** Strictly **black & white** (no flashy colors)

---

## 🎨 Design Rules (Very Important)

- Black & white only  
  - Black backgrounds
  - White text
  - Subtle grayscale for borders/dividers
- No gradients
- No bright accent colors
- Keep spacing generous and typography clean
- UI should feel **calm, premium, and intentional**

---

## 🧭 App Layout Overview

The app contains **5 main tabs**:

1. **Send**
2. **Swap**
3. **Bridge**
4. **Stake**
5. **History**

Each tab:
- Is its **own isolated component**
- Has **no business logic mixed with layout**
- Can be animated independently using Framer Motion

---

## 📁 Folder Structure (Mandatory)

The project must follow this structure exactly:

```

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Navbar.tsx
│   │   └── Tabs.tsx
│   │
│   ├── tabs/
│   │   ├── SendTab.tsx
│   │   ├── SwapTab.tsx
│   │   ├── BridgeTab.tsx
│   │   ├── StakeTab.tsx
│   │   └── HistoryTab.tsx
│   │
│   ├── ui/
│   │   └── (shadcn components live here)
│
├── hooks/
│   └── (empty for now – reserved for future logic)
│
├── lib/
│   └── utils.ts
│
└── styles/
└── fonts.ts

```

---

## 🧠 Architecture Principles

### 1. `page.tsx` is a composition file

`page.tsx` should:
- Import components
- Arrange layout
- Contain **zero UI logic**

❌ Bad:
```

page.tsx handles animations, tabs, logic

```

✅ Good:
```

<AppShell>
  <Tabs />
</AppShell>
```

---

### 2. Every UI element must be abstracted

If something:

* Appears more than once
* Has logic
* Has animations

➡️ It **must** live in `components/`

---

### 3. Tabs are isolated

Each tab component:

* Lives in `components/tabs`
* Handles only its own UI
* Can later receive hooks or props

Examples:

```
SendTab.tsx
SwapTab.tsx
```

---

## 🎞 Animations (Framer Motion)

* Use Framer Motion **sparingly**
* Prefer subtle motion:

  * Fade in/out
  * Small Y-axis movement
* Avoid playful or dramatic animations

Example:

```tsx
<motion.div
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

---

## 🧩 shadcn/ui Usage

* Use shadcn components as **base primitives**
* Wrap them if customization is needed
* Do not modify shadcn source files directly

Allowed components:

* Button
* Tabs
* Input
* Card
* Dialog

---

## 🔤 Fonts Setup (Next.js)

Fonts must be loaded globally and reused everywhere.

### Google Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
```

### Usage Guidelines

* **Outfit** → headings, tabs, titles
* **Rubik** → body text, labels, values

---

## 🎛 Icons (react-icons)

* Use icons only when necessary
* Keep icons minimal and monochrome
* Do not decorate UI with icons

Example:

```tsx
import { FiArrowRight } from "react-icons/fi";
```

---

## 🧪 Hooks Folder

The `hooks/` folder is intentionally empty.

Purpose:

* Wallet logic
* Data fetching
* State abstraction

⚠️ UI logic must never live in hooks.

---

## 🧼 Code Quality Rules

* Clear naming (no `temp`, `test`, `newComponent`)
* One component = one responsibility
* No inline magic numbers
* Prefer readability over cleverness

---

## 🚀 Running the Project

```bash
bun install
bun dev
```

---

## 🧠 Final Thought

This frontend is designed to be:

* Easy to extend
* Easy to reason about
* Easy for the **next developer** to understand without context

If something feels confusing, it probably needs abstraction.

```
