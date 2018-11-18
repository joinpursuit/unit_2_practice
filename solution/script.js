document.addEventListener("DOMContentLoaded", () => {
  // Here, we are defining our top-level nodes that we're going to need in the future.

  let topLevel = document.querySelector("body");
  let select = document.querySelector(".data-type");

  // We use the "change" event on "select" so that whenever the user changes their mind and selects a different option, this event will fire.

  select.addEventListener("change", event => {
    let selected = event.target.value;

    // This 'if' statement prevents our fetch call from running if the user chooses the placeholder select item ("").

    if (selected) {
      // Using string interpolation here to query the API with the user's selection.

      fetch(`https://jsonplaceholder.typicode.com/${selected}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Network Problem");
          }
        })
        .then(data => {
          let title;
          let body;

          // OK. So here, we are specifying the two points of data we want from each API response. For example, for comments, we want the name of the user who commented and the body.

          // You may ask: Why are we doing this? Fundamentally, it's so that we can key into each of these different objects using just one loop.

          if (selected === "posts") {
            title = "title";
            body = "body";
          } else if (selected === "comments") {
            title = "name";
            body = "body";
          } else if (selected === "albums") {
            title = "id";
            body = "title";
          } else if (selected === "photos") {
            title = "title";
            body = "url";
          } else if (selected === "users") {
            title = "name";
            body = "email";
          } else {
            title = "title";
            body = "completed";
          }

          // Effectively, what we're doing here is populating a new "data" div to replace any old div that might exist there. When our user selects one item and THEN another, we want our information to update, and to do that, we have to assemble and replace our old div.

          let newData = document.createElement("div");
          newData.classList.add("data");

          // In the loop below, we are creating a div element for each individual data item from our API response. We are putting two items of data inside it, one in an h3 tag and one in a p tag. Then, we're appending the entire little container to our larger div that we defined above.

          data.forEach(el => {
            container = document.createElement("div");
            let titleNode = document.createElement("h3");
            let bodyNode = document.createElement("p");

            titleNode.innerText = el[title];
            bodyNode.innerText = el[body];

            container.appendChild(titleNode);
            container.appendChild(bodyNode);

            newData.appendChild(container);
          });

          // Now, we are replacing our old 'data' node with our new node that we assembled above!

          let dataArea = document.querySelector(".data");
          topLevel.replaceChild(newData, dataArea);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});
