document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".select");
  let selectValue, url, h3Text, pText;

  select.addEventListener("change", event => {
    selectValue = event.target.value;
    url = "https://jsonplaceholder.typicode.com/" + selectValue;
    doStuff();
  });

  const doStuff = () => {
    axios
      .get(url)
      .then(response => {
        console.log(h3Text, pText, url);
        let dataDiv = document.querySelector(".data");
        const newDataDiv = document.createElement("div");
        newDataDiv.className = "data"; //newDataDiv.classList.add("data")
        document.body.appendChild(newDataDiv);
        for (let i = 0; i < response.data.length; i++) {
          let newH3 = document.createElement("h3");
          let newP = document.createElement("p");
          if (selectValue === "posts") {
            newH3.innerText = response.data[i].title;
            newP.innerText = response.data[i].body;
          } else if (selectValue === "comments") {
            newH3.innerText = response.data[i].name;
            newP.innerText = response.data[i].body;
          } else if (selectValue === "albums") {
            newH3.innerText = response.data[i].userId;
            newP.innerText = response.data[i].title;
          } else if (selectValue === "photos") {
            newH3.innerText = response.data[i].title;
            newP.innerText = response.data[i].url;
          } else if (selectValue === "users") {
            newH3.innerText = response.data[i].name;
            newP.innerText = response.data[i].username;
          } else if (selectValue === "todos") {
            newH3.innerText = response.data[i].title;
            newP.innerText = response.data[i].completed;
          }
          newDataDiv.appendChild(newH3);
          newDataDiv.appendChild(newP);
        }
        document.body.replaceChild(newDataDiv, dataDiv);
      })
      .catch(err => {
        console.log(err);
      });
  };
});
