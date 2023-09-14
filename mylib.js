const myLibrary = [];

const userInput = {
    titleValue: '',
    authorValue: '',
    pageValue: '',
    readValue: '',

};

// User interface
const addDialog = document.getElementById('addDialog');
const addBtn = document.querySelector('#add');
const confirmBtn = addDialog.querySelector('#confirmBtn');
const titleBox = addDialog.querySelector('#title');
const authorBox = addDialog.querySelector('#author');
const npBox = addDialog.querySelector('#pageNumber');
const readSelect = addDialog.querySelector('#isRead');
const contentArea = document.querySelector('#content');


// open a dialog to add new Book
addBtn.addEventListener('click', () => addDialog.showModal() ) ;


// Add event listener to the controls in the form.
titleBox.addEventListener('change', () =>  userInput.titleValue = titleBox.value);
authorBox.addEventListener('change', () =>  userInput.authorValue = authorBox.value);
npBox.addEventListener('change', () =>  userInput.pageValue = npBox.value);
readSelect.addEventListener('change', () => {
    if (readSelect.value === 'Yes') {
    userInput.readValue = true;
    } else {
        userInput.readValue = false;
    }
});

confirmBtn.addEventListener('click', (e) => {

    let newBook = new Book(userInput.titleValue, userInput.authorValue,
        userInput.pageValue, userInput.readValue);

    addBookToLibrary(newBook);

    let Idx = myLibrary.length-1;
    displayCard(Idx);


    // DOM manipulation for the remove button
    const removeBtn = document.querySelector(`.removeBtn[data-index = '${Idx}']`);
    removeBtn.addEventListener('click', () => {
        
        let cIdx = removeBtn.getAttribute('data-index');
        console.log(cIdx);
        let card_to_remove = document.querySelector(`.card[data-index = '${cIdx}']`); 

        contentArea.removeChild(card_to_remove);
        myLibrary.splice(cIdx, 1);

        // update index for the "card" in DOM
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            let I = card.getAttribute('data-index')
            if (I > cIdx) {
                card.setAttribute('data-index', `${I - 1}`);
                const rmvB = card.querySelector('.removeBtn');
                rmvB.setAttribute('data-index', `${I - 1}`);

            }
        });
     });


     // DOM manipulation for the read button

     const readBtn = document.querySelector(`.removeBtn[data-index = '${Idx}'] + .readBtn`);
     readBtn.addEventListener('click', () => {
        console.log('clicked');
        let cIdx = removeBtn.getAttribute('data-index');
        let isRead = myLibrary[cIdx].isRead;
        isRead = !isRead;
        myLibrary[cIdx].isRead = isRead;

        if (isRead === false) {
            readBtn.style.backgroundColor = '#0ea5e9';
            readBtn.textContent = 'Not Read';
    
        } else {
            readBtn.style.backgroundColor = '#22c55e';
            readBtn.textContent = 'Read';
        }

     })

    e.preventDefault();
    addDialog.close();


})


function Book(title, author, npage, isRead) {
    this.title = title;
    this.author = author;
    this.npage = npage
    this.isRead = isRead;
    this.info = function() {
        return `'${this.title}' by '${this.author}', '${this.npage}' pages`
    };
}

// Every book in the library will be display as a card

function createCard(idx) {
    // create DOM for cards.
    const card = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const page = document.createElement('div');
    const btnContainer = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(page);

    // CSS styling for the card elements just created

    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '30px';
    card.appendChild(btnContainer);


    // CSS for remove button and read button

    removeBtn.style.flex = '1';
    removeBtn.style.height = '40px';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '20px';
    removeBtn.style.backgroundColor = '#ef4444';
    removeBtn.style.color = 'white';
    removeBtn.textContent = 'Remove'
    removeBtn.style.fontSize = '20px';
    removeBtn.classList.add('removeBtn');
    removeBtn.setAttribute('data-index', `${idx}`);

    readBtn.style.flex = '1';
    readBtn.style.height = '40px';
    readBtn.style.border = 'none';
    readBtn.style.borderRadius = '20px';
    readBtn.style.color = 'white';
    readBtn.textContent = 'Read';
    readBtn.style.fontSize = '20px';
    readBtn.classList.add('readBtn');

    if (myLibrary[idx].isRead === false) {
        readBtn.style.backgroundColor = '#0ea5e9';
        readBtn.textContent = 'Not Read';

    } else {
        readBtn.style.backgroundColor = '#22c55e';
        readBtn.textContent = 'Read';
    }
    



    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readBtn);

    card.classList.add('card');
    card.setAttribute('data-index', `${idx}`);

    const myNewBook = myLibrary[idx];
    title.textContent = myNewBook.title;
    author.textContent = myNewBook.author;
    page.textContent = `${myNewBook.npage} pages`;


    // Style for the "author" and "number of page" text
    author.style.fontSize = '20px';
    page.style.fontSize = '20px'

    // CSS for .card elements

    card.style.height = '250px';
    card.style.padding = '20px';
    card.style['font-size'] = '25px';
    card.style['text-align'] = 'center'
    card.style.backgroundColor = 'white';
    card.style.display = 'grid';
    card.style.gap = '30px';
    card.style['grid-templete-row'] = 'repeat(4, 1fr)';
    card.style['boxShadow'] = '4px 4px 2px -2px rgba(0, 0, 0, 0.1)';
    card.style.borderRadius = '10px';


    return card;
}

function displayCard(idx) {
    let newCard = createCard(idx);
    contentArea.appendChild(newCard);

}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}




