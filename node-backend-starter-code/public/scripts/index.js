const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')
const movies = document.querySelectorAll('.movies')

function displayMovieDetails(key){
  document.getElementById(key).addEventListener('click', function(){
    console.log(key)
    fetch(`${url}i=${key}` ).
    then(response => response.json()).
    then( data => {
      document.getElementById(key).insertAdjacentHTML('beforeend',
      `<div class='movieDetails'>${data.Plot}<div>`
     )
    }) 
  })
}

//wrap function in objects // make calls from the object making it private
form.addEventListener('submit' ,function(){
  results.innerHTML = ''
  fetch(url + 's=' + form.querySelector('input').value)
  .then( response => response.json() )
  .then( data => {
    return data.Search.map( (movie, key) => {
      key = movie.imdbID
      results.insertAdjacentHTML('afterbegin',
      `
        <div id=${key} onclick='displayMovieDetails("${key}")'class='movies'>
        <h1>${movie.Title}</h1>
        <img class='poster' src=${movie.Poster}>
        <p id=${key}>${movie.Year}, Imdb ID: ${key}</p>
        </div>
      `
      )
    })
  })
})
