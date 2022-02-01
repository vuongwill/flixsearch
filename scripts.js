const API_URL =  'https://api.themoviedb.org/3/discover/movie?api_key=64aabaf8eba0822d3c2d155326f48363&language=en-US&sort_by=popularity.desc'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=64aabaf8eba0822d3c2d155326f48363&query='

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
document.querySelector('input').value=''

getMovies(API_URL)
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    displayMovies(data.results)
    console.log(data.results)
}

function displayMovies(movies){
    main.innerHTML=''
    movies.forEach(element => {
        const {title,poster_path,vote_average,overview,release_date}=element
        const movieElement= document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML=`
        <img src="${moviePoster()}" alt="${title}" />
        <div class="title">
        <h2>${title}</h2>
        </div>
        <div class="movieInfo">
        </div>
        <div class="summary">
        <span class ="date">Released: ${release_date}</span>
        <br>
        <span>${overview}</span>
        </div>
        `
        function moviePoster(){
            if (poster_path === null) {
                return "default.png"
            } else {
                return `${IMG_PATH}${poster_path}`
            }
        }
    main.appendChild(movieElement)
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchValue = search.value
    if (searchValue && searchValue !==''){
        getMovies(SEARCH_URL+searchValue)
        searchValue=''
    } else {
        window.location.reload()
    }
})
