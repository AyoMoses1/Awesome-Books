const listOfBooks = document.querySelector('.list');
const formBtn = document.querySelector('.form_button');


const handleStorage = (data) => {
  localStorage.setItem('books', JSON.stringify(data));
};


class BookShelf {

  constructor(){
    this.books = [] 
  }

  addBook(book){
    const newBook = { id: Math.random(), ...book };
    const newArray = this.books.concat([newBook]);
    handleStorage(newArray);
  }

  removeBook(id){
    this.books = this.books.filter((book) => book.id !== id);
    handleStorage(this.books);
  }
}


let booksArray = new BookShelf()

window.onload = function displayBooks() {
  const collection = JSON.parse(localStorage.getItem('books'));
  booksArray.books = collection;

  booksArray.books.forEach((book) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', book.id)
    listItem.innerHTML = `<div>
                            <span class="title">"${book.title}"</span> by <span class="author">${book.author}</span>
                          </div>
                          <div>
                            <button id=${book.id} class="remove_btn">Remove</button>
                          </div>
                        `;
    listOfBooks.appendChild(listItem);
    const listB = document.getElementById(`${book.id}`);
    listB.addEventListener('click', () => {
      const deletedBook = document.getElementById(book.id);
      deletedBook.parentNode.removeChild(deletedBook);
      booksArray.removeBook(book.id)
    });
  });
};

function handleSubmit() {
  const title = document.querySelector('#book_title').value;
  const author = document.querySelector('#book_author').value;
  const index = Math.random();
  booksArray.addBook({ id: index, title, author });
  const collection = JSON.parse(localStorage.getItem('books'));
  booksArray = collection;
  const newBook = booksArray.filter((book) => book.id === index)[0];
  const listItem = document.createElement('li');
  listItem.setAttribute('id', newBook.id)
  listItem.innerHTML = `<div>
                            <span class="title">"${newBook.title}"</span> by <span class="author">${newBook.author}</span>
                          </div>
                          <div>
                            <button id=${newBook.id} class="remove_btn">Remove</button>
                          </div>
                        `;
  listOfBooks.appendChild(listItem);
  const listB = document.getElementById(`${newBook.id}`);
  listB.addEventListener('click', () => {
    const deletedBook = document.getElementById(newBook.id);
    deletedBook.parentNode.removeChild(deletedBook);
    booksArray.removeBook(newBook.id)
  });
}

formBtn.addEventListener('click', handleSubmit);
