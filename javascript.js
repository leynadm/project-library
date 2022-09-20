// Page elements
const btn_add_book = document.getElementById('add-to-library');
const books_container = document.querySelector('.books-container');
const books_tile = document.querySelector('.book-tile');

let myLibrary=[];

btn_add_book.addEventListener('click',function(){

    let book_name_input2 = document.querySelector('#book-name').value;
    let book_author_input = document.querySelector('#author-name').value;
    let book_pages_input = document.querySelector('#no-pages').value;
    let book_read_status = document.querySelector('#read-status');   

    let newBook = new Book(book_name_input2,book_author_input,book_pages_input,book_read_status);

    myLibrary.push(newBook);
    
    console.log(myLibrary);
})

const book_tile_div = document.createElement('div');
book_tile_div.classList.add('book-tile');

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


function addBookToLibrary(){

    for(let i = 0; i < myLibrary.length; i++){
        
        const book_tile_div = document.createElement('div');
        book_tile_div.classList.add('book-tile');
        books_container.appendChild(book_tile_div);

        const book_title_div = document.createElement('div');
        book_title_div.classList.add('tile-title');
        book_title_div.textContent = myLibrary[i].title;
        book_tile_div.appendChild(book_title_div);

        const book_author_div = document.createElement('div');
        book_author_div.classList.add('tile-author');
        book_author_div.textContent = myLibrary[i].author;
        book_tile_div.appendChild(book_author_div);

        const book_no_pages_div = document.createElement('div');
        book_no_pages_div.classList.add('tile-pages');
        book_no_pages_div.textContent = myLibrary[i].pages;
        book_tile_div.appendChild(book_no_pages_div);

        const book_status_div = document.createElement('div');
        book_status_div.classList.add('tile-status');
        book_status_div.textContent = myLibrary[i].readStatus;
        book_tile_div.appendChild(book_status_div);

    }

}

function loopArray(){

    console.log(myLibrary.length);
    for(let i = 0; i < myLibrary.length; i++){
        
        const book_tile_div = document.createElement('div');
        book_tile_div.classList.add('book-tile');
    
        const book_title_div = document.createElement('div');
        book_title_div.classList.add('tile-title');
        book_title_div.textContent = myLibrary[i].title;
        book_tile_div.appendChild(book_title_div);
    
        const book_author_div = document.createElement('div');
        book_author_div.classList.add('tile-author');

    }


}
