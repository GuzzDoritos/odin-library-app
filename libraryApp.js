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

  finishInput();
}

function finishInput() {
  updateList();
  clearInput();
  addBookModal.close();
}

function updateList() {
  const booksTable = document.querySelector("#books-table");

  booksTable.textContent = "";

  for (book of bookList) {
    const bookRow = document.createElement("tr");

    for (prop in book) {
      const bookCell = document.createElement("td");
      bookCell.textContent = book[prop];
      bookRow.appendChild(bookCell);
    }

    const deleteCell = document.createElement("td");
    deleteCell.className = "delete-cell";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteCell.appendChild(deleteBtn);
    bookRow.appendChild(deleteCell);

    bookRow.dataset.id = bookList.indexOf(book);

    booksTable.appendChild(bookRow);
  }
}

function clearInput() {
  for (prop in bookForm) bookForm[prop].value = "";
}

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
const submitBookBtn = document.querySelector("#submit-book");

submitBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBooktoList();
});

addBookButton.addEventListener("click", () => {
  addBookModal.showModal();
});

modalCloseButton.addEventListener("click", () => {
  addBookModal.close();
});
