document.addEventListener("DOMContentLoaded" , () => {

  let select = document.querySelector(".data-type");
  let dataDeyvi = document.querySelector(".data");
  let userInput;
  let data;

  select.addEventListener("change" , (event) => {
    userInput = event.target.value;
    axios
      .get(`https://jsonplaceholder.typicode.com/${userInput}/`)
      .then(resp => {
        data = resp.data;

        let posts = "";
        data.forEach((el,i) => {
          let arrKeys = Object.keys(el);
           posts +=
          `<em>Post number</em> ${i+1}: <p class='title'><strong>${arrKeys[1]}:</strong> ${el[arrKeys[1]]}</p>
           <p><strong>${arrKeys[2]}:</strong> ${el[arrKeys[2]]}</p>`;
           console.log(posts);
        })
        dataDeyvi.innerHTML = posts;
      })
      .catch(err => {
        console.log(err)
      })
  })


});
