# Andrews Library – Library Management System

## Project Description

Andrews Library is a responsive Library Management System built using React and Bootstrap 5.

This project helps librarians manage books easily. Users can add, view, edit, delete, search, and sort book records. All book data is stored in the browser's Local Storage, so the data remains saved even after refreshing the page.

## Technologies Used

- React 18 (Vite)
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- CSS3
- Browser Local Storage

## Features

- Add new books with complete details.
- View all books in an interactive table.
- Edit existing book information.
- Delete books with confirmation.
- Search books by name, author, ISBN, Book ID, category, publisher, or language.
- Sort books in ascending and descending order.
- Pagination with Previous and Next buttons.
- Choose 5, 10, or 15 rows per page.
- Form validation for required fields.
- ISBN validation (10 or 13 digits).
- Unique Book ID validation.
- Price and quantity validation.
- Published date and purchase date validation.
- Summary cards for library statistics.
- Hero section and responsive navigation bar.
- Book details view modal.
- Responsive footer.
- Data remains saved using Local Storage.

## React Concepts Used

- Components and JSX
- Props and State
- useState
- useEffect
- useReducer
- useMemo
- useRef
- Controlled Form Inputs
- Conditional Rendering
- Array Methods (map and filter)
- Spread and Rest Operators
- Event Handling

## Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/ashamishra2820-coder/Andrews-Library-Management-System.git
```

**2. Open the project folder**

```bash
cd Andrews-Library-Management-System
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

http://localhost:5173

## Folder Structure

```text
src/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── SummaryCards
│   ├── BookForm
│   ├── BookTable
│   ├── Pagination
│   ├── BookModal
│   └── Footer
│
├── reducer/
│   └── bookReducer.js
│
├── utils/
│   └── validate.js
│
├── data/
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css

```

## Screenshots

Add your project screenshots here.

- Home Page
- Book Catalogue
- Add New Book Form
- Form Validation
- Book Details

## Video Explanation

[Add your project video explanation link here.
](https://drive.google.com/file/d/1i2F6iQkUsHddVGHFpyZ_YrqvAwKtcHsV/view?usp=sharing)
## Author

**Asha Mishra**

GitHub: [ashamishra2820-coder](https://github.com/ashamishra2820-coder)

---

Thank you for visiting Andrews Library!
