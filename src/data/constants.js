export const CATEGORIES = ["Fiction", "Science", "History", "Technology", "Biography", "Self-Help", "Children"];
export const LANGUAGES = ["English", "Hindi", "Gujarati", "Spanish", "French"];
export const BOOK_TYPES = ["Fiction", "Non-Fiction"];
export const FORMATS = ["Hardcover", "Paperback", "eBook", "Audiobook"];
export const STATUSES = ["Available", "Issued"];
export const STORAGE_KEY = "lumen_library_books";

const b = (id, name, bookId, author, isbn, publisher, category, language, type, formats, pub, pur, price, quantity, status, description) => ({
  id, name, bookId, author, isbn, publisher, category, language, type, formats,
  publishedDate: pub, purchaseDate: pur, price, quantity, status, description,
});

export const SEED_BOOKS = [
  b(1, "The Pragmatic Programmer", "BK-1001", "Andrew Hunt", "9780135957059", "Addison-Wesley", "Technology", "English", "Non-Fiction", ["Paperback", "eBook"], "2019-09-13", "2023-01-10", 2499, 4, "Available", "A practical guide to software craftsmanship, covering habits that make developers better."),
  b(2, "Sapiens", "BK-1002", "Yuval Noah Harari", "9780062316097", "Harper", "History", "English", "Non-Fiction", ["Hardcover", "Audiobook"], "2015-02-10", "2022-06-21", 899, 3, "Issued", "A brief history of humankind, from the Stone Age to the modern age."),
  b(3, "The Alchemist", "BK-1003", "Paulo Coelho", "9780062315007", "HarperOne", "Fiction", "English", "Fiction", ["Paperback"], "2014-04-15", "2021-11-02", 350, 6, "Available", "A shepherd boy travels in search of treasure and discovers his personal legend."),
  b(4, "Cosmos", "BK-1004", "Carl Sagan", "9780345539434", "Ballantine Books", "Science", "English", "Non-Fiction", ["Hardcover", "eBook"], "2013-07-09", "2020-03-18", 1250, 2, "Available", "A journey through space and time exploring the universe and our place in it."),
  b(5, "Wings of Fire", "BK-1005", "A. P. J. Abdul Kalam", "9788173711466", "Universities Press", "Biography", "English", "Non-Fiction", ["Paperback"], "1999-01-01", "2019-08-30", 295, 5, "Issued", "The autobiography of India's missile man and former President."),
  b(6, "Atomic Habits", "BK-1006", "James Clear", "9780735211292", "Avery", "Self-Help", "English", "Non-Fiction", ["Hardcover", "eBook", "Audiobook"], "2018-10-16", "2023-05-12", 599, 7, "Available", "An easy and proven way to build good habits and break bad ones."),
];
