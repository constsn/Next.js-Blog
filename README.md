# 🚀 Next.js Blog (WIP)

A full-featured portfolio blog application built with **Next.js 15 (App Router)** and **TypeScript 5**, supporting Markdown editing, tag management, responsive layout, and admin functionality.

---

## 🚧 Current Features

### 📰 Public Features

- ✅ Display blog post list
- ✅ View blog post details
- ✅ Search blog posts
- ✅ Filter posts by tag
- ✅ Show tags under each post
- ✅ Related posts section
- ✅ Recent posts section
- ✅ Pagination
- ✅ Previous/next post navigation

### 🔐 Auth

- ✅ Login page
- ✅ User authentication with **next-auth** (Credentials Provider)

### ✏️ Admin Features

- ✅ Create new blog posts
- ✅ Edit existing blog posts
- ✅ Delete blog posts
- ✅ Upload & preview cover images
- ✅ Markdown input with live preview
- ✅ Add tags during post creation/editing

### 🧠 Data Model

- ✅ Many-to-many relationship between posts and tags (via Prisma)

---

## 📸 Demo

### 🏠 Home Page

Displays a list of blog posts with cover images, tags, publication dates, and pagination.  
Includes a sidebar showing recent posts and all available tags.

![Home Page](https://i.imgur.com/2Nhgbph.jpeg)

> **Note:** The content shown is mock/test data for demonstration purposes.

---

## 🛠️ Tech Stack

### Framework & Language

- **Next.js 15** – App Router, Server Components, API routes
- **React 19**
- **TypeScript 5**

### Styling

- **Tailwind CSS 4**
- **@tailwindcss/typography** – Rich text (prose) styling

### Auth & Security

- **next-auth** – Authentication (Credentials Provider)
- **bcryptjs** – Password hashing

### Database / ORM

- **Prisma ORM** – Type-safe database access
- _(DB engine: e.g. SQLite / PostgreSQL)_

### Form & Validation

- **Zod** – Schema-based form validation
- **react-textarea-autosize**

### Markdown & Sanitization

- **marked** – Markdown parser
- **DOMPurify** – XSS sanitization

### UI Components

- **Radix UI** – Accessible, unstyled component primitives:
  - `@radix-ui/react-radio-group`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-label`
  - etc.
- **lucide-react** – Icon library

### Dev Tools

- **ESLint** – Linting
- **tsx** – TypeScript Node runtime for scripts

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 Notes

This project is still under active development. Planned features include:

- Dark mode support
- Breadcrumb navigation
- Comments system
- Markdown rendering improvements
