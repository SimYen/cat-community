console.log("homepage");

// get all cats info
let catInfo = function() {
  let response = JSON.parse( this.responseText );
  let info = document.getElementById('info');
  // clear display for info
  info.innerHTML = "";
  response.result.forEach(cat => {
    //.create cats info list
    let col = document.createElement('div');
    col.classList.add("col-md-3");
    let card = document.createElement('div');
    card.classList.add("card", "mb-3");

    let img = document.createElement('img');
    img.classList.add("card-img-top");
    if (cat.image === null) {
      img.src = "/image/loafingAround.jpg";
    } else {
        img.src = cat.image;
    };
    img.alt = cat.name;
    img.width = 100;
    card.appendChild(img);

    let body = document.createElement('div');
    body.classList.add("card-body");

    // create link to cat
    let title = document.createElement('h5');
    title.classList.add("card-title");
    let name = document.createElement('a');
    name.href = "/cat/" + cat.id;
    name.innerText = cat.name;
    title.appendChild(name);
    body.appendChild(title);

    // create link to user
    let text = document.createElement('p');
    text.classList.add("card-text");
    text.innerHTML = "added by ";
    let user = document.createElement('a');
    user.href = "/user/" + cat.user_id;
    user.innerText = cat.reg_by;
    text.appendChild(user);
    body.appendChild(text);

    card.appendChild(body);
    col.appendChild(card);
    info.appendChild(col);
  })
};

// get all users info
let userInfo = function() {
  let response = JSON.parse( this.responseText );
  console.log(response);
  let info = document.getElementById('info');
  // clear display for info
  info.innerHTML = "";
  response.result.forEach(user => {
    //.create cats info list
    let col = document.createElement('div');
    col.classList.add("col-md-3");
    let card = document.createElement('div');
    card.classList.add("card", "mb-3");

    let body = document.createElement('div');
    body.classList.add("card-body");

    // create link to user
    let title = document.createElement('h5');
    title.classList.add("card-title");
    let name = document.createElement('a');
    name.href = "/user/" + user.id;
    name.innerText = user.name;
    title.appendChild(name);
    body.appendChild(title);

    let text = document.createElement('p');
    text.classList.add("card-text");
    text.innerHTML = "joined on " + user.to_char;
    body.appendChild(text);

    card.appendChild(body);
    col.appendChild(card);
    info.appendChild(col);
  })
};

let getCats = function(event){
    console.log("all cats");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", catInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/cats");
    // send the request
    request.send();
};

let getUsers = function(event){
    console.log("all users");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", userInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/users");
    // send the request
    request.send();
};

document.querySelector('#cats').addEventListener('click', getCats);
document.querySelector('#users').addEventListener('click', getUsers);
// on load
getCats();