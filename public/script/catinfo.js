console.log("retrieving cat info");

// what to do when we recieve the request
var responseHandler = function() {
  console.log("getting info for cat_id: " + cat_id);
  var response = JSON.parse( this.responseText );
  console.log( response );

  var fedInfo = document.getElementById('cat-info');
  var display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  // display.innerText = "Owner: " + response.result[0].owner;
  response.result.forEach(fed => {
    console.log(fed);
    if (fed.cat_id === parseInt(cat_id)) {
      var feeder = document.createElement('a');
      feeder.href = "/user/" + fed.id;
      feeder.innerText = fed.name;
      var li = document.createElement('li');
      li.classList.add("list-group-item");
      li.innerHTML = "Fed on " + fed.to_char + " by ";
      li.appendChild(feeder);
      display.appendChild(li);
    };
  })
  fedInfo.appendChild(display);
};

// make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "/cat");

// send the request
request.send();