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
//let startIndex= 0;//
//let endIndex = 36;//
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
    option.value = id;
    option.innerText = name;
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
    option.value = id;
    option.innerText = name;
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


// SHOW MORE BUTTON.

//dataListButton = 'Show more' ( books.length - BOOKS_PER_PAGE);

dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// dataListButton.innerHTML = /* html */ [
//     `<span>Show more</span>`
//     `<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
// ]

dataListClose.addEventListener("click", () => { dataListActive.open = false });

dataListButton.addEventListener( "click", () => {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, [page + 1] * BOOKS_PER_PAGE))
    actions.list.updateRemaining()
    page = page + 1
});



// // search

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

dataSearchForm.addEventListener( "click", (event) => {
    event.preventDefault();
    dataListsItems.style.display = "none";
    dataListMessage.innerHTML = '';
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData) 
         const titleMatch = filters.title   //
         const authorMatch = filters.author 
         const genreMatch = filters.genre 
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
            dataListMessage.innerText = 'No resluts found. Your filters might be too narrow.';
            dataListButton.disabled = true;
        }
    }

//     dataListsItems.innerHTML = '';
//     const fragment1 = document.createDocumentFragment()
//     const extracted1 = books.slice(startIndex, endIndex)

//     for (const { author, image, title, id, description, published} of extracted1) {

//         const element1 = document.createElement('button')
//         element1.className = 'preview'
//         element1.setAttribute('data-preview', id, author, title, genres, image, description, published)

//         element1.innerHTML = /* html */ `

//             <img class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author"> by ${authors[author]}</div>
//             </div>
//         `

//         fragment1.appendChild(element1)
//     }
//     dataListsItems.appendChild(fragment1)
});
    

    // const initial = matches.length - [page * BOOKS_PER_PAGE]
    // const remaining = hasRemaining ? initial : 0
    // dataListButton.disabled = initial > 0

    // dataListButton.innerHTML = /* html */ `
    //     <span>Show more</span>
    //     <span class="list__remaining"> (${remaining})</span>
    // `

    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // dataSearchOverlay.open = false

// dataSettingsOverlay.addEventListener ("submit", () => {
//    // preventDefault()
//     const formData = new FormData(dataSettingsOverlay.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', night.dark);
//     document.documentElement.style.setProperty('--color-light', day.light);
//     dataSettingsOverlay.open = false
// });

// dataListsItems.addEventListener ( "click", (active) => {
//     const pathArray = Array.from(dataListDescription.path || dataListDescription.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if (active) {
//             break
//         const previewId = node?.dataset?.preview
//         }
//         for (const singleBook of books) {
//             if (singleBook.id === previewId) active = singleBook
//         } 
//     }
    
//     if (!active){
//     dataListActive.open = true
//     dataListBlur + dataListImage === active.image
//     dataListTitle = dataListActive.title
    
//     dataListSubtitle = `${authors[active.author]} (${new Date(dataListActive.published).year})`
//     dataListDescription === active.description
//     }
    
// });
