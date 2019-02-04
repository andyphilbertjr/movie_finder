const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')


function displayMovieDetails(key){
  return fetch(`${url}i=${key}&plot=full`)
          .then(response => response.json())
          .then( data => {
            document.getElementById(key).insertAdjacentHTML('beforeend',
            `<div class='movieDetails'>${data.Plot}<div>`
            )
          })
}

//wrap function in objects // make calls from the object making it private
form.addEventListener('submit' ,function(e){
  e.preventDefault()
  results.innerHTML = ''
  fetch(url + 's=' + form.querySelector('input').value)
  .then( response => response.json() )
  .then( data => {
    return data.Search.map( (movie, key) => {
      key = movie.oid
      results.insertAdjacentHTML('afterbegin',
        displayResults(movie.Title, movie.Poster, movie.imdbID, movie.Year)
      )
      addFave(movie)
    })
  })
})

function addFave(data = ``){
  document.getElementById('favorite').addEventListener('click', () => {
    return fetch('/favorites', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(data)
          })
        })    
}

function displayResults(title, poster, id, year){
 return (`
        <div class='movies'>
          <div class='movieHeader'>
            <h1 class='movieTitles'>${title}</h1>
            <button id="favorite">Fave</button>
          </div>
          <div>
            <img class='poster' src=${poster}>
          </div>
          <div  id=${id}>
            <button onclick='displayMovieDetails("${id}")'>
              Click here for more details.
            </button>
            <p>${year}, Imdb ID: ${id}</p>
          <div>
        </div>
      `)
}