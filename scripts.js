import { authors, books, genres } from "./data.js";//

const BOOKS_PER_PAGE = 36;

//querySelectors.
const dataSearchTitle = document.querySelector('[data-search-title]');
const dataListsItems = document.querySelector('[data-list-items]');
const dataSearchGenres = document.querySelector('[data-search-genres]');
const dataSearchAuthors = document.querySelector('[data-search-authors]');
const dataListButton = document.querySelector('[data-list-button]');
const dataListMessage = document.querySelector('[data-list-message]');
const dataSearchOverlay = document.querySelector('[data-search-overlay]');
const dataSearchCancel = document.querySelector('[data-search-cancel]');
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]');
const dataSettingsCancel = document.querySelector('[data-settings-cancel]');
const dataSettingsForm = document.querySelector('[data-settings-form]');
const dataSettingsTheme = document.querySelector('[data-settings-theme]');
const dataHeaderSearch = document.querySelector('[data-header-search]');
const dataHeaderToggle = document.querySelector('[data-header-toggle]');
const dataHeaderSettings = document.querySelector('[data-header-settings]');
const dataHeaderTitle = document.querySelector('[data-header-title]');
const dataListActive = document.querySelector('[data-list-active]');
const dataListBlur = document.querySelector('[data-list-blur]');
const dataListImage = document.querySelector('[data-list-image]');
const dataListTitle = document.querySelector('[data-list-title]');
const dataListDescription = document.querySelector('[data-list-description');
const dataListSubtitle = document.querySelector('[data-list-subtitle]');
const dataListClose = document.querySelector('[data-list-close]');
const dataSearchForm = document.querySelector('[data-search-form]');

const matches = books//
let page = 1;//

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')


const day = {//
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {//
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

const createPreview = ({ author, id, image, title }) => { //
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = /* html */ `
    <div>
    <image class='preview__image' src = "${image}" alt="book pic"}</image>
    </div>
    <div class ='preview__info'>
    <dt class = "preview__title">${title}</dt>
    <dt class = "preview__author"> by ${authors[author]}</dt>
    `;
  return element;
};

const createPreviewsFragment = (books, startIndex, endIndex) => {
const fragment = document.createDocumentFragment()//

const extracted = books.slice(startIndex, endIndex)//

for (let i = 0; i < extracted.length; i++) {
  const { author, id, image, title} = extracted[i];
  const preview = createPreview({ author, id, image, title});

    fragment.appendChild(preview);
}
return fragment;
};

dataListsItems.appendChild(createPreviewsFragment(matches, 0, BOOKS_PER_PAGE));
dataListsItems.style.display = "grid";

const genresFragment = document.createDocumentFragment();
const genresOptionAll = document.createElement('option');
genresOptionAll.value = 'any';
genresOptionAll.innerText = 'All Genres';
genresFragment.appendChild(genresOptionAll);
for (const [id, name] of Object.entries(genres)) {
    const option = document.createElement('option');
    const value = id;
    const text = name;
    option.value = value;
    option.innerText = text;
    genresFragment.appendChild(option);
}
dataSearchGenres.appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();
const authorsOptionsAll = document.createElement('option');
authorsOptionsAll.value = 'any';
authorsOptionsAll.innerText = 'All Authors';
authorsFragment.appendChild(authorsOptionsAll);
for (const [id, name] of Object.entries(authors)) {
   const option = document.createElement('option');
   const value = id;
   const text = name;
    option.value = value;
    option.innerText = text;
    authorsFragment.appendChild(option);
}
dataSearchAuthors.appendChild(authorsFragment);

//THEME SETTINGS

dataHeaderSettings.addEventListener('click', () => {
    dataSettingsOverlay.style.display = "block";
});

const save = document.querySelector('[form="settings"]')
save.addEventListener('click', (event) => {
      event.preventDefault()
if (dataSettingsTheme.value === 'day' ){
    document.querySelector('body').style.setProperty('--color-dark', day.dark);
    document.querySelector('body').style.setProperty('--color-light', day.light);
    dataSettingsOverlay.style.display = "none";
}
if (dataSettingsTheme.value === 'night'){
    document.querySelector('body').style.setProperty('--color-dark', night.dark);
    document.querySelector('body').style.setProperty('--color-light', night.light);
    dataSettingsOverlay.style.display = "none";
} 

});

dataSettingsCancel.addEventListener("click" , () => {
    dataSettingsOverlay.style.display = "none";
});

dataSettingsForm.addEventListener("submit", () => { dataSettingsForm.submit });


//SEARCH BUTTON

dataHeaderSearch.addEventListener( "click", () => {
    if ((dataSearchOverlay.open = true))  {
    dataSearchTitle.focus();
    }
    //dataSearchOverlay.style.display = "block";
});

dataSearchCancel.addEventListener("click", () => {
    if ((dataSearchOverlay.open = true)) {
        dataSearchOverlay.close();
    }
    //dataSearchOverlay.style.display = "none";
});

dataSearchForm.addEventListener( 'submit', (event) => {
    event.preventDefault();
    dataListsItems.style.display = "none";
    dataListMessage.innerHTML = '';
    const formData = new FormData(event.target)
         const titleMatch = formData.get('title')   //
         const authorMatch = formData.get('author') 
         const genreMatch = formData.get('genre') 
    const result = []

    for (let i = 0; i < books.length; i++) {
     const book = books[i];
      
        if(genreMatch === 'any' && authorMatch === 'any') {
                if(book.title.toLowerCase().includes(titleMatch.toLowerCase())){
                    result.push(book);
                }
        }
         
        if (genreMatch === 'any') {
            if (book.title.toLowerCase().includes(titleMatch.toLowerCase()) && book.author === authorMatch) {
                result.push(book);
            }
        }
        if (titleMatch === '') { 
            if (book.author === authorMatch && book.genres.includes(genreMatch)) {
                result.push(book);
            }
        }

        if (titleMatch === ''&& authorMatch === 'any') {
            if (book.genres.includes(genreMatch)){
                result.push(books);
            }
        }


        if (result.length > 0){ 
            dataListMessage.innerHTML = '';
            dataListButton.disabled = true;
            dataListMessage.style.marginTop = '-125px';
        } else {
            dataListMessage.innerText = 'No results found. Your filters might be too narrow.';
            dataListButton.disabled = true;
        }
    }

document.querySelector('[class="list__message"]').style.display = 'block'


    const fragment1 = document.createDocumentFragment()

    for (const { author, image, title, id, description, published} of result) {

        const element1 = document.createElement('button')
        element1.className = 'preview'
        element1.dataset.id = id
        element1.dataset.title = title
        element1.dataset.image = image
        element1.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear})`
        element1.dataset.genre = genres
        element1.dataset.description = description

        element1.innerHTML = /* html */ `
        <div>
            <image class='preview__image' src="${image}" alt="book pic"></image>
            <div>
            <div class="preview__info">
                <dt class="preview__title">${title}</dt>
                <dt class="preview__author"> by ${authors[author]}</dt>
            </div>
        `
        fragment1.appendChild(element1)
    }
    const booklist = document.querySelector('[class="list__message"]')
    booklist.appendChild(fragment1)
    dataSearchForm.reset()
    dataSearchOverlay.style.display = "none";
})
    
// SHOW MORE BUTTON.

let startIndex= 0;//
let endIndex = 36;//

const showMoreButton = document.querySelector('[data-list-button]')
let numOfBooks = books.length -36
showMoreButton.innerHTML =  `Show more (${numOfBooks})`
if(showMoreButton.innerHTML === `Show more (${-12})`){
showMoreButton.innerHTML =  `Show more (${0})`
showMoreButton.disabled = true
}
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    numOfBooks -= 36;
    let numOfBooks1 = numOfBooks
    showMoreButton.innerHTML =  `Show more (${numOfBooks1})`

    
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    const extracted = books.slice(startIndex1, endIndex1)
for (const {author ,image, title, id , description, published} of extracted) {
     const preview = document.createElement('button')
     preview.className = 'preview'
     preview.dataset.id = id
     preview.dataset.title = title
     preview.dataset.image = image
     preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
     preview.dataset.description = description
     preview.dataset.genre = genres
     preview.innerHTML= /*html*/`
     <div class="child" >
     <image class='preview__image' src="${image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${title}<dt>
     <dt class='preview__author'> By ${authors[author]}</dt>
     </div>`
     fragment.appendChild(preview)
     }
 const booklist1 = document.querySelector('[data-list-items]')
 booklist1.appendChild(fragment)
    });

// when click on each book display details
const detailsToggle = (event) => {
    event.target.dataset.id ? dataListActive.style.display = "block" : undefined;
    event.target.dataset.description ? dataListDescription.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? dataListSubtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? dataListTitle.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? dataListImage.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? dataListBlur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = dataListClose
detailsClose.addEventListener('click', () => {
dataListActive.style.display = "none";
})
const bookclick = dataListsItems
bookclick.addEventListener('click', detailsToggle)