document.addEventListener("DOMContentLoaded", () => {
    let select = document.querySelector(".type");
    let div = document.querySelector(".data");

    select.addEventListener("change", (event) => {
        userChoice = event.target.value;
        url = `https://jsonplaceholder.typicode.com/${userChoice}`;
        getInfo(url)
    })

    function newOption() {
        let div = document.querySelector(".data");
        while(div.firstChild) {
            div.removeChild(div.firstChild)
        }
    }

    function getInfo(url) {
        newOption()
        axios
        .get(url)
        .then(res => {
            res.data.forEach((data) => {
                let h3 = document.createElement("h3")
                let p = document.createElement("p")
                h3.innerText = data.title;
                p.innerText = data.body;
                div.appendChild(h3)
                div.appendChild(p)        
            })
        })
    }








})