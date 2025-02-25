const bookList = [];

function Book(author, title, genre, pages, read) {
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}
const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector("dialog");
const modalCloseButton = document.querySelector("#modal-close-button");


addBookButton.addEventListener("click", () => {
    addBookModal.showModal();
})

modalCloseButton.addEventListener("click", () => {
    addBookModal.close()
})