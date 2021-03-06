const BASE_URL = 'https://restcountries.eu/rest/v2'

function fetchCountry(country){
    const url = `${BASE_URL}/name/${country}`
    return fetch(url)
    .then(response => {
       return response.json();         
    })
}

export default {fetchCountry};