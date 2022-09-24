// Page elements
const btn_add_book = document.getElementById('add-to-library');
const books_container = document.querySelector('.books-container');
let bookOrderInArrayCounter = 0;

let myLibraryNewBooks=[];

/* Event listener on the button that allows to add new books */
btn_add_book.addEventListener('click',getBookFromUser)

function getBookFromUser(){

    let book_name_input = document.querySelector('#book-name').value;
    let book_author_input = document.querySelector('#author-name').value;
    let book_pages_input = document.querySelector('#no-pages').value;
    let book_read_status = document.querySelector('#read-status');   

    let newBook = new Book(book_name_input,book_author_input,book_pages_input,book_read_status);

    myLibraryNewBooks.push(newBook);

    addBook(book_name_input,book_author_input,book_pages_input,book_read_status);

}

/* Function to create new HTML elements and add them to DOM */
function addBook(bookName,bookAuthor,bookPages,bookStatus){
    
    const book_tile_div = document.createElement('div');
    book_tile_div.classList.add('book-tile');
    books_container.appendChild(book_tile_div);
    
    const book_div = document.createElement('div');
    book_div.classList.add('book');
    book_tile_div.appendChild(book_div);

    const book_unique_index = document.createElement('div');
    book_unique_index.classList.add('unique-index');
    book_unique_index.textContent = bookOrderInArrayCounter;
    book_div.appendChild(book_unique_index);
    bookOrderInArrayCounter++;

    const book_title_div = document.createElement('div');
    book_title_div.classList.add('tile-title');
    book_title_div.textContent = bookName;
    book_div.appendChild(book_title_div);

    const book_author_div = document.createElement('div');
    book_author_div.classList.add('tile-author');
    book_author_div.textContent = bookAuthor;
    book_div.appendChild(book_author_div);

    const book_no_pages_div = document.createElement('div');
    book_no_pages_div.classList.add('tile-pages');
    book_no_pages_div.textContent = bookPages;
    book_div.appendChild(book_no_pages_div);

    const book_status_div = document.createElement('div');
    book_status_div.classList.add('tile-status');
    
    if(bookStatus.checked){
        book_status_div.textContent = "Read";    
    } else {    
        book_status_div.textContent = "Not Read"
    }
    
    book_div.appendChild(book_status_div);

    const book_tile_buttons = document.createElement('div');
    book_tile_buttons.classList.add('tile-buttons');
    book_tile_div.appendChild(book_tile_buttons);

    const book_remove_btn = document.createElement('button');
    book_remove_btn.addEventListener('click',removeBook);
    book_remove_btn.classList.add('tile-remove-book');
    book_remove_btn.textContent="Remove";
    book_tile_buttons.appendChild(book_remove_btn);    

    const book_status_btn = document.createElement('button');
    book_status_btn.addEventListener('click',changeStatus);
    book_status_btn.classList.add('tile-status-book');
    book_status_btn.textContent="Status";
    book_tile_buttons.appendChild(book_status_btn);
 
}

/* Function to remove book from page*/
function removeBook(e){
    const tile_buttons_to_remove = this.parentNode.parentNode;
    let book_index = tile_buttons_to_remove.querySelector('.unique-index');
    console.log(book_index.textContent);
    tile_buttons_to_remove.remove();

    delete myLibraryNewBooks[book_index.textContent];

}

/* Function to change status of book*/
function changeStatus(e){
    const book_tile_selected = this.parentNode.parentNode;
    let book_div_selected = book_tile_selected.querySelector('.book');
    let status_div_selected = book_div_selected.querySelector('.tile-status');

    if(status_div_selected.textContent == "Read"){
        status_div_selected.textContent = "Not Read";
    } else {
        status_div_selected.textContent = "Read";
    }
}

/* Constructor for creating new books*/
function Book(title, author, pages, readStatus, info){
    this.title= title
    this.author= author
    this.pages= pages
    this.readStatus= readStatus
    this.info = function(info){
        info = title + " by " + author + ", " + pages + ", " + readStatus;
        return info;   
    }
}