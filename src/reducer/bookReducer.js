export const initialState = { books: [], loaded: false };

export function bookReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return { books: action.payload, loaded: true };
    case "ADD":
      return { ...state, books: [{ ...action.payload, id: Date.now() }, ...state.books] };
    case "UPDATE":
      return { ...state, books: state.books.map((bk) => (bk.id === action.payload.id ? { ...bk, ...action.payload } : bk)) };
    case "DELETE":
      return { ...state, books: state.books.filter((bk) => bk.id !== action.payload) };
    default:
      return state;
  }
}
