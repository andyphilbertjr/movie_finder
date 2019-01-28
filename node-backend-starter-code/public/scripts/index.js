
  const Api_Key = 'cd37cf2f'
  let url = `http://www.omdbapi.com/?apikey=${Api_Key}&`
  const form = document.querySelector('form')
  let results = document.querySelector('.results')
  const movieContainer = document.createElement('div')

  


  form.addEventListener('submit' ,function(e){
    e.preventDefault()
    console.log(url + 's=' + form.querySelector('input').value)
    fetch(url + 's=' + form.querySelector('input').value)
    .then( response => response.json() )
    .then( data => {
      console.log(data)
      return data.Search.map( (movie, key) => {
        let container = results.appendChild(movieContainer)
        container.insertAdjacentHTML('afterbegin',
        `<h1>${movie.Title}</h1><img src=${movie.Poster} /><p>${movie.Year}, Imdb ID: ${movie.imdbID}</p>`)
      })
    })
  form.reset();
  }); 

