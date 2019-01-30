const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')
const movies = document.querySelectorAll('.movies')


function displayMovieDetails(key){
  return fetch(`${url}i=${key}`)
          .then(response => response.json())
          .then( data => {
            document.getElementById('details').insertAdjacentHTML('beforeend',
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
      movie = {
        name: `${movie.Title}`, 
        oid: `${movie.imdbID}`,
        year: `${movie.Year}`,
        poster: `${movie.Poster}`
      }
      key = movie.oid
      results.insertAdjacentHTML('afterbegin',
      `
        <div class='movies'>
          <div class='movieHeader'>
            <h1>${movie.name}</h1>
            <button id="favorite" value=${movie}> Fave</button>
            <img class='poster' src=${movie.poster}>
          </div>
          <div  id='details'>
            <button onclick='displayMovieDetails("${movie.oid}")'>
              Click here for more details.
            </button>
            <p>${movie.year}, Imdb ID: ${movie.oid}</p>
          <div>
        </div>
      `
      )
      addFave(movie)
    })
  })
})

function addFave(data = ``){
  document.getElementById('favorite').addEventListener('click', () => {
    return fetch('/favorites', {
            method: 'POST',
            body: JSON.stringify(data), 
            header: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json())
            .then( response => JSON.stringify(response))
        })        
}

