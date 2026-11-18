# Lumen Library: Library Management System

## Project Description
A responsive library website built with React and Bootstrap 5. Librarians can add, view, edit and delete books in an interactive data table with search, sorting and pagination. All data is saved in the browser's Local Storage.

## Technologies Used
React 18 (Vite), JavaScript (ES6+), Bootstrap 5, Bootstrap Icons, CSS3, Local Storage

## Features
- Create, read, update and delete books (delete asks for confirmation)
- Search by name, author, ISBN, Book ID, category, publisher or language
- Sort ascending/descending from the dropdown or by clicking column headers
- Pagination with Previous/Next, page numbers, and 5/10/15 rows per page
- Full form validation (required fields, ISBN format, unique Book ID, price/quantity rules, date checks, radio/dropdown/checkbox checks)
- Summary cards, hero section, view modal, responsive navbar and footer
- Data persists after refresh

## React Concepts Used
Components and JSX, props and state, `useState`, `useEffect`, `useReducer`, `useMemo`, `useRef` (uncontrolled search input), controlled form inputs, `map`/`filter`, spread and rest operators, conditional rendering.

## Installation
```bash
git clone <your-repo-url>
cd library-management-system
npm install
npm run dev
```
Open the local URL shown in the terminal (usually http://localhost:5173).

## Folder Structure
```
src/
  components/  Navbar, Hero, SummaryCards, BookForm, BookTable, Pagination, BookModal, Footer
  reducer/     bookReducer.js
  utils/       validate.js
  data/        constants.js (dropdown options and sample books)
  App.jsx, main.jsx, index.css
```

## Screenshots
Add screenshots here (home, table, form with validation errors, view modal, mobile view).
