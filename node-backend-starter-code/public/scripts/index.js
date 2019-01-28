const Api_Key = 'cd37cf2f'
let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
const form = document.querySelector('form')
const results = document.querySelector('.results')

  

form.addEventListener('submit' ,function(e){
  e.preventDefault()
  console.log(url + 's=' + form.querySelector('input').value)
  fetch(url + 's=' + form.querySelector('input').value)
  .then( response => response.json() )
  .then( data => {
    console.log(data)
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

  form.reset();
  }); 

