// Page elements
const btn_add_book = document.getElementById('add-to-library');
const books_container = document.querySelector('.books-container');
let bookOrderInArrayCounter = 0;

let myLibraryNewBooks=[];

/* Event listener on the button that allows to add new books */

/* This is to be run only after I connected the site to a datasource
btn_add_book.querySelector('form').addEventListener('click',getBookFromUser)
*/

btn_add_book.addEventListener('click',getBookFromUser)


function getBookFromUser(){

    let book_name_input = document.querySelector('#book-name').value;
    let book_author_input = document.querySelector('#author-name').value;
    let book_pages_input = document.querySelector('#no-pages').value;
    let book_read_status = document.querySelector('#read-status');   

    let newBook = new Book(book_name_input,book_author_input,book_pages_input,book_read_status);

    myLibraryNewBooks.push(newBook);

    addBook(book_name_input,book_author_input,book_pages_input,book_read_status);

    addBookToHistory(book_name_input,book_author_input,"New");
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
    book_remove_btn.classList.add('tile-remove-book','page-button');
    book_remove_btn.textContent="Remove";
    book_tile_buttons.appendChild(book_remove_btn);    
    const span_remove_book = document.createElement('span');
    span_remove_book.classList.add('material-symbols-outlined')
    span_remove_book.textContent = "delete";
    book_remove_btn.appendChild(span_remove_book);

    const book_status_lbl = document.createElement('label');
    book_status_lbl.classList.add('toggle');
    book_tile_buttons.appendChild(book_status_lbl);
    const book_status_cbx = document.createElement('input');
    book_status_cbx.type = 'checkbox';
    book_status_cbx.classList.add('toggle__input');
    book_status_lbl.appendChild(book_status_cbx);
    const book_div_status = document.createElement('div');
    book_div_status.classList.add('toggle__fill');
    book_status_lbl.appendChild(book_div_status);
    //book_status_lbl.addEventListener('click',changeStatus);
    book_div_status.addEventListener('click',changeStatus);
    

    if(bookStatus.checked){
        book_status_cbx.checked = true;
    } else{
        book_status_cbx.checked = false;
    }
    
}

/* Function to remove book from page*/
function removeBook(e){

    let book_tile_selected = this.parentNode.parentNode.parentNode;    
    let book_div_selected = book_tile_selected.querySelector('.book');
    
    let status_div_selected = book_div_selected.querySelector('.tile-status');
    let title_div_selected = book_div_selected.querySelector('.tile-title').textContent;
    let author_div_selected = book_div_selected.querySelector('.tile-author').textContent;

    const tile_buttons_to_remove = this.parentNode.parentNode;
    let book_index = tile_buttons_to_remove.querySelector('.unique-index');
    console.log(book_index.textContent);
    tile_buttons_to_remove.remove();
    
    addBookToHistory(title_div_selected,author_div_selected,"Remove")

    delete myLibraryNewBooks[book_index.textContent];
  
}

// Function to change status of book


function changeStatus(e){

    let book_tile_selected = this.parentNode.parentNode.parentNode;    
    let book_div_selected = book_tile_selected.querySelector('.book');
    
    let status_div_selected = book_div_selected.querySelector('.tile-status');
    let title_div_selected = book_div_selected.querySelector('.tile-title').textContent;
    let author_div_selected = book_div_selected.querySelector('.tile-author').textContent;

    let lbl_read = book_tile_selected.childNodes;
    let child_read = lbl_read.item(1);
    let cbx_read = child_read.querySelector('.toggle__input');


    if(cbx_read.checked){
        status_div_selected.textContent="Not Read"
    } else{
        status_div_selected.textContent="Read"
    }

    addBookToHistory(title_div_selected,author_div_selected,status_div_selected.textContent)
} 


/* Constructor for creating new books
function Book(title, author, pages, readStatus, info){
    this.title= title
    this.author= author
    this.pages= pages
    this.readStatus= readStatus
    this.info = function(info){
        info = title + " by " + author + ", " + pages + ", " + readStatus;
        return info;   
    }
}*/

class Book{
    constructor(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    info(info){
        this.info = this.title + " by " + this.author + ", " + this.pages + ", " + this.readStatus;
    }
}

function addBookToHistory(bookTitle,bookAuthor,UpdateType){

    //add Timestamp in front of the line
    const books_submitted_section = document.querySelector('.books-submitted');
    const books_submitted_title = document.querySelector('.book-submitted-title');
    const empty_child = document.querySelector('.empty-child');
    let newParagraph = document.createElement('p');
    if(UpdateType=="New"){
        newParagraph.textContent = getCurrentDate() + " - You added " + "'" + bookTitle +"'" + " written by " + "'" +bookAuthor +"'" + " to your library." 
    } else if (UpdateType=="Remove"){
        newParagraph.textContent = getCurrentDate() + " - You removed " + "'" + bookTitle +"'" + " written by " + "'" +bookAuthor +"'" + " from your library." 
    } else {
        newParagraph.textContent = getCurrentDate() + " - You changed the status of " + "'" + bookTitle +"'" + " written by " + "'" +bookAuthor +"'" + " to " + UpdateType + "."
    }

    empty_child.prepend(newParagraph);
}


function getCurrentDate(){

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let getHour = date.getHours();
    let getMinutes = date.getMinutes();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year} at ${getHour}:${getMinutes}`;

    return currentDate;

}

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.info-button');
const closeModal = document.querySelector('.close-modal');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})
