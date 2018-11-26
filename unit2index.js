document.addEventListener('DOMContentLoaded', () => {
  let url;
  let select = document.querySelector('select');
  let body = document.querySelector('body');
  let div = document.querySelector('.data');


  function getUrl(route) {
    url = `https://jsonplaceholder.typicode.com/${route}`;
    apiCall();
  }

  function apiCall() {
    axios
      .get(url)
      .then(response => {
        infoRendering(response.data);
      })
      .catch(err => {
        console.log('error: ', err);
      })
  }


  function infoRendering(arrObj) {
    /*using replaceChild and having lines 28-30 outside of this func call didn't
    wasn't replacing items so added another event listener.*/
    let newDiv = document.createElement('div');
    newDiv.classList.add('data');
    body.appendChild(newDiv);

    arrObj.forEach(el => {
      let h3 = document.createElement('h3');
      let p = document.createElement('p');
      newDiv.appendChild(h3);
      newDiv.appendChild(p);
      h3.innerText = el.id;
      if (el.title) {
        p.innerText = el.title;
      } else {
        p.innerText =el.name;
      }
    })

    select.addEventListener('change', () => {
      newDiv.remove();

    })
    // body.replaceChild(newDiv, div);

  }

  select.addEventListener('change', (event) => {
    getUrl(event.target.value)

  })

});
