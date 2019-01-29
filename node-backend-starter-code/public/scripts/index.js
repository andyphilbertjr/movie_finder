const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')
const movies = document.querySelectorAll('.movies')


function displayMovieDetails(key){
  document.getElementById(key).addEventListener('click', function(){
    fetch(`${url}i=${key}` ).
    then(response => response.json()).
    then( data => {
      document.getElementById(key).insertAdjacentHTML('beforeend',
      `<div class='movieDetails'>${data.Plot}<div>`
     )
     addFave(data)
    }) 
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
        'name': `${movie.Title}`, 
        'oid': `${movie.imdbID}`,
        'year': `${movie.Year}`,
        'poster': `${movie.Poster}`
      }
      key = movie.oid
      results.insertAdjacentHTML('afterbegin',
      `
        <div id=${movie.oid} onclick='displayMovieDetails("${movie.oid}")'class='movies'>
        <h1>${movie.name}</h1>
        <button class="favorite" id=${key}'>Fave<button>
        <img class='poster' src=${movie.poster}>
        <p>${movie.year}, Imdb ID: ${movie.oid}</p>
        </div>
      `
      )
    })
  })
})

function addFave(data){
  document.querySelectorAll('.favorite')[0]
  .addEventListener('click', function(){
    fetch('/favorites', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    })
}

