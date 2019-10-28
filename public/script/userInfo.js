console.log("retrieving user info");

// get add info
var addInfo = function() {
  var response = JSON.parse( this.responseText );
  var followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(add => {
    //.create follower info list
    var li = document.createElement('li');
    li.classList.add("list-group-item");
    // create link to follower
    var cat = document.createElement('a');
    cat.href = "/cat/" + add.id;
    cat.innerText = add.name;
    li.appendChild(cat);
    display.appendChild(li);
  })
  followInfo.appendChild(display);
};

// get fed info
var fedInfo = function() {
  var response = JSON.parse( this.responseText );
  var fedInfo = document.getElementById('user-info');
  // clear display for info
  fedInfo.innerHTML = "";
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(fed => {
    //.create fed info list
    var li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerHTML = "Fed on " + fed.to_char + ", ";
    // create link to feeder
    var cat = document.createElement('a');
    cat.href = "/cat/" + fed.cat_id;
    cat.innerText = fed.name;
    li.appendChild(cat);
    display.appendChild(li);
  })
  fedInfo.appendChild(display);
};

// get following cat info
var catInfo = function() {
  var response = JSON.parse( this.responseText );
  var followInfo = document.getElementById('user-info');
  // clear display for info
  followInfo.innerHTML = "";
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(follow => {
    //.create follower info list
    var li = document.createElement('li');
    li.classList.add("list-group-item");
    // create link to follower
    var cat = document.createElement('a');
    cat.href = "/cat/" + follow.cat_id;
    cat.innerText = follow.name;
    li.appendChild(cat);
    display.appendChild(li);
  })
  followInfo.appendChild(display);
};

// get cat id
var getAdd = function(event){
    console.log("cats added by user");
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", addInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/add");
    // send the request
    request.send();
};

// get cat id
var getFed = function(event){
    console.log("cats fed by user");
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", fedInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/fed");
    // send the request
    request.send();
};

// get cat id
var getCat = function(event){
    console.log("cats followed by user");
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", catInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/cat");
    // send the request
    request.send();
};

document.querySelector('#catadd').addEventListener('click', getAdd);
document.querySelector('#catfed').addEventListener('click', getFed);
document.querySelector('#catfollow').addEventListener('click', getCat);