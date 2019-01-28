const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')
//

// function dipslayMovieDetails(){
  
//   document.querySelectorAll('.movies').addEventListener('click', function(e){
//     console.log(e.target.value.imdbID.value)
//     e.preventDefault()
//     fetch(`${url}i=${e.target.imdbID.value}` ).
//     then(response => response.json()).
//     then( data => {
//       movies.insertAdjacentHTML('beforeend'
//       `<div class='movieDetails'>${data.Plot}<div>`
//      )
//     }) 
//   })
// }

//wrap function in objects // make calls from the object making it privat
form.addEventListener('submit' ,function(e){
  e.preventDefault()

  results.innerHTML = ''
  fetch(url + 's=' + form.querySelector('input').value)
  .then( response => response.json() )
  .then( data => {
    return data.Search.map( (movie, key) => {
      results.insertAdjacentHTML('afterbegin',
      `
        <div class='movies'>
        <h1>${movie.Title}</h1>
        <img class='poster' src=${movie.Poster} />
        <p>${movie.Year}, Imdb ID: ${movie.imdbID}</p>
        </div>
      `
      )
    })
  })
})
  // movies.addEventListener('onload')
