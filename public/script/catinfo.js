console.log("retrieving cat info");

// get fed info
var fedInfo = function() {
  var response = JSON.parse( this.responseText );
  var fedInfo = document.getElementById('cat-info');
  // clear display for info
  fedInfo.innerHTML = "";
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(fed => {
    //.create fed info list
    var li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerHTML = "Fed on " + fed.to_char + " by ";
    // create link to feeder
    var feeder = document.createElement('a');
    feeder.href = "/user/" + fed.id;
    feeder.innerText = fed.name;
    li.appendChild(feeder);
    display.appendChild(li);
  })
  fedInfo.appendChild(display);
};

// get follow info
var followInfo = function() {
  var response = JSON.parse( this.responseText );
  var followInfo = document.getElementById('cat-info');
  // clear display for info
  followInfo.innerHTML = "";
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(follow => {
    //.create follower info list
    var li = document.createElement('li');
    li.classList.add("list-group-item");
    // create link to follower
    var follower = document.createElement('a');
    follower.href = "/user/" + follow.user_id;
    follower.innerText = follow.name;
    li.appendChild(follower);
    display.appendChild(li);
  })
  followInfo.appendChild(display);
};

// get cat id
var getFed = function(event){
    console.log("fed info for cat");
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", fedInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/cat/" + cat_id + "/fed");
    // send the request
    request.send();
};

// get cat id
var getFollow = function(event){
    console.log("follow info for cat");
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", followInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/cat/" + cat_id + "/follow");
    // send the request
    request.send();
};

document.querySelector('#catfed').addEventListener('click', getFed);
document.querySelector('#catfollow').addEventListener('click', getFollow);