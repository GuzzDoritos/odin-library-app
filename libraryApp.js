const bookList = [];

function Book(author, title, genre, pages, read) {
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}
function addBooktoList() {
  let bookArgs = [];
  for (prop in bookForm) {
    if (bookForm[prop].value.trim() == "") {
      console.log("nope");
      return;
    }
    bookArgs.push(bookForm[prop].value);
  }
  let book = new Book(...bookArgs);
  book.read = book.read === "true";
  bookList.push(book);
const bookForm = {
  authorInput: document.querySelector("#book-author"),
  bookNameInput: document.querySelector("#book-name"),
  genreInput: document.querySelector("#book-genre"),
  pagesInput: document.querySelector("#book-pages"),
  hasRead: document.querySelector("#is-book-finished"),
};
const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector("dialog");
const modalCloseButton = document.querySelector("#modal-close-button");


addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
})

modalCloseButton.addEventListener("click", () => {
    addBookModal.close()
})