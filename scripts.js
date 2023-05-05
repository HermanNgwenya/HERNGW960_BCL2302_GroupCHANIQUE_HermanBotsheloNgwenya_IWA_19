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
const dataHeaderTitle = document.querySelector('[data-header-title]')

const matches = books//
let page = 1;//

// if (!books && !Array.isArray(books)) throw new Error('Source required') 
// if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')


const day = {//
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {//
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const createPreview = ({ author, id, image, title }) => {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = /* html */ `
    <img src = "${image}" alt="${title} cover image">
    <h3 class = "preview__title">${title}</h3>
    <p class = "preview__author">${authors[author]}</p>
    `;
  return element;
}

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
}

dataListsItems.appendChild(createPreviewsFragment(matches, 0, BOOKS_PER_PAGE));

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

dataSettingsTheme.addEventListener('click', () => {
    document.documentElement.classList.theme('--color-dark' || '--color-light');
    const isDarkMode = document.documentElement.classList.contains('--color-dark');
    const isLightMode = document.documentElement.classList.contains('--color-light');
    const css = isDarkMode ? night : day || isLightMode ? night : day;
});
   
// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

dataListButton = "Show more (books.length - BOOKS_PER_PAGE)";

dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

dataListButton.innerHTML = /* html */ [
    `<span>Show more</span>`,
    `<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

dataSearchCancel.addEventListener("click", () => {
    if ((dataSearchOverlay.open = true)) {
        dataSearchOverlay.close();
    }
});

dataSettingsCancel.addEventListener("click" , () => {
    if ((dataSettingsOverlay.open = false )) {
        dataSettingsOverlay.close();
    }
});

dataSettingsForm.addEventListener("submit", () => { actions.settings.submit });4

dataListClose.addEventListener("click", () => { data-list-active.open === false });

dataListButton.addEventListener( "click", () => {
    document.querySelector([dataListsItems]).appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, [page + 1] * BOOKS_PER_PAGE))
    actions.list.updateRemaining()
    page = page + 1
});

dataHeaderSearch.addEventListener( "click", () => {
    if ((dataSearchOverlay.open = true))  {;
    dataSearchTitle.focus();
    }
});

dataSearchForm.addEventListener( "click", (filters) => {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    });

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// dataSettingsOverlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay.open === false
// }

// dataListItems.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
