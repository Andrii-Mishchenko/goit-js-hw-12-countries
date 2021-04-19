import './styles.css';

import countryCardTpl from './templates/countries.hbs';
import countryList from './templates/listOfCountries.hbs'

import API from './fetchCountries';

import "@pnotify/core/dist/BrightTheme.css";
import {error} from '@pnotify/core';

const debounce = require('lodash.debounce');


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.form-input')
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));


function onSearch(event) {
    event.preventDefault();

    cleanSearchResults()

    const form = event.target
    const searchQuery = form.value;
    
    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => {
            notification("Country name is not corrected!");
        })
}

function renderCountryCard(country) {
    if(country.length>10){
        notification('too many matches found. Please enter a more specific query!');
    } else if (country.length===1){
        const countryMarkup = countryCardTpl(...country);
        refs.cardContainer.insertAdjacentHTML('beforeend', countryMarkup);
    } else {
        const countryListMarkup = countryList(country);
        refs.cardContainer.insertAdjacentHTML('beforeend', countryListMarkup);
    }
}


function notification(textErr) {
    error({
        type: 'error',
        text: textErr,
        hide: true,
        delay: '1000',
        closer: false,
        sticker: false
    });
}

function cleanSearchResults() {
    if (refs.cardContainer.firstChild) {
        refs.cardContainer.removeChild(refs.cardContainer.lastChild);
    }
}