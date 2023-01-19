let books = [];

const handleStorage = (data) => {
  localStorage.setItem('books', JSON.stringify(data));
};

const listOfBooks = document.querySelector('.list');
const formBtn = document.querySelector('.form_button');

function addBook(book) {
  const newBook = { id: Math.random(), ...book };
  const newArray = books.concat([newBook]);
  handleStorage(newArray);
}

function removeBook(id) {
  const deletedBook = document.getElementById(id);
  books = books.filter((book) => book.id !== id);
  deletedBook.parentElement.remove();
  handleStorage(books);
}

window.onload = function displayBooks() {
  const collection = JSON.parse(localStorage.getItem('books'));
  books = collection;

  books.forEach((book) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="title">${book.title}</span>
                          <span class="author">${book.author}</span>
                          <button id=${book.id} class="remove_btn">Remove</button>
                          <div class="divider"></div>
                        `;
    listOfBooks.appendChild(listItem);
    const listB = document.getElementById(`${book.id}`);
    listB.addEventListener('click', () => removeBook(book.id));
  });
};

function handleSubmit() {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const index = Math.random();
  addBook({ id: index, title, author });
  const collection = JSON.parse(localStorage.getItem('books'));
  books = collection;
  const newBook = books.filter((book) => book.id === index)[0];
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span class="title">${newBook.title}</span>
                          <span class="author">${newBook.author}</span>
                          <button id=${newBook.id} class="remove_btn">Remove</button>
                          <div class="divider"></div>
                        `;
  listOfBooks.appendChild(listItem);
  const listB = document.getElementById(`${newBook.id}`);
  listB.addEventListener('click', () => removeBook(newBook.id));
}

formBtn.addEventListener('click', handleSubmit);
