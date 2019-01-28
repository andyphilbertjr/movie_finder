;(()=> {
  const Api_Key = 'cd37cf2f'
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${Api_Key}`
  'use strict';
  const form = document.querySelector('form')
  form.addEventListener('submit', (e)=> {
    e.preventDefault()
  
    fetch( url + form., {
      method: 'get',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
  });

  document.querySelector('.results').innerHTML = '<h1>it works</h1>';

  form.reset();
  }); 
})();
