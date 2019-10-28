console.log("retrieving cat info");

// what to do when we recieve the request
var responseHandler = function() {
  console.log("getting info for cat_id: " + cat_id);
  var response = JSON.parse( this.responseText );
  console.log( response );

  var fed = document.getElementById('cat-info');
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  // display.innerText = "Owner: " + response.result[0].owner;
  response.result.forEach(cat => {
    console.log(cat);
    if (cat.cat_id === parseInt(cat_id)) {
      var li = document.createElement('li');
      li.classList.add("list-group-item");
      li.innerText = "Fed on: "+ cat.to_char +", by: "+ cat.name;
      display.appendChild(li);
    };
  })
  fed.appendChild(display);
};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "/cat");

// send the request
request.send();