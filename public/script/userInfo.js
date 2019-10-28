console.log("retrieving user info");

// get follow info
var addInfo = function() {
  var response = JSON.parse( this.responseText );
  console.log(response);
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

// get cat id
var getAdd = function(event){
    console.log("Cats added by user_id: " + user_id);
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", addInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/user/" + user_id + "/add");
    // send the request
    request.send();
};

document.querySelector('#catadd').addEventListener('click', getAdd);