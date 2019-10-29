console.log("retrieving user info");

// get add info
let addInfo = function() {
  let response = JSON.parse( this.responseText );
  let followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have record";
    display.appendChild(li);
  } else {
      response.result.forEach(add => {
        //.create follower info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        // create link to follower
        let cat = document.createElement('a');
        cat.href = "/cat/" + add.id;
        cat.innerText = add.name;
        li.appendChild(cat);
        display.appendChild(li);
      })
    }
  followInfo.appendChild(display);
};

// get fed info
let fedInfo = function() {
  let response = JSON.parse( this.responseText );
  let fedInfo = document.getElementById('user-info');
  // clear display for info
  fedInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have record";
    display.appendChild(li);
  } else {
      response.result.forEach(fed => {
        //.create fed info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        li.innerHTML = "Fed on " + fed.to_char + ", ";
        // create link to feeder
        let cat = document.createElement('a');
        cat.href = "/cat/" + fed.cat_id;
        cat.innerText = fed.name;
        li.appendChild(cat);
        display.appendChild(li);
      })
    }
  fedInfo.appendChild(display);
};

// get following cat info
let catInfo = function() {
  let response = JSON.parse( this.responseText );
  let followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have record";
    display.appendChild(li);
  } else {
      response.result.forEach(follow => {
        //.create follower info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        // create link to follower
        let cat = document.createElement('a');
        cat.href = "/cat/" + follow.cat_id;
        cat.innerText = follow.name;
        li.appendChild(cat);
        display.appendChild(li);
      })
    }
  followInfo.appendChild(display);
};

// get follow info
let followInfo = function() {
  let response = JSON.parse( this.responseText );
  let followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have record";
    display.appendChild(li);
  } else {
      response.result.forEach(follow => {
        //.create follower info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        // create link to follower
        let user = document.createElement('a');
        user.href = "/user/" + follow.user_id;
        user.innerText = follow.name;
        li.appendChild(user);
        display.appendChild(li);
      })
    }
  followInfo.appendChild(display);
};

// get follower info
let followerInfo = function() {
  let response = JSON.parse( this.responseText );
  let followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have record";
    display.appendChild(li);
  } else {
      response.result.forEach(follow => {
        //.create follower info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        // create link to follower
        let user = document.createElement('a');
        user.href = "/user/" + follow.follower_id;
        user.innerText = follow.name;
        li.appendChild(user);
        display.appendChild(li);
      })
    }
  followInfo.appendChild(display);
};

let getAdd = function(event){
    console.log("cats added by user");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", addInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/add");
    // send the request
    request.send();
};

let getFed = function(event){
    console.log("cats fed by user");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", fedInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/fed");
    // send the request
    request.send();
};

let getCat = function(event){
    console.log("cats followed by user");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", catInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/cat");
    // send the request
    request.send();
};

let getFollows = function(event){
    console.log("get user following");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", followInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/follow");
    // send the request
    request.send();
};

let getFollower = function(event){
    console.log("get user followed by");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", followerInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/following");
    // send the request
    request.send();
}

document.querySelector('#catadd').addEventListener('click', getAdd);
document.querySelector('#catfed').addEventListener('click', getFed);
document.querySelector('#catfollow').addEventListener('click', getCat);
document.querySelector('#following').addEventListener('click', getFollows);
document.querySelector('#followers').addEventListener('click', getFollower);