console.log("retrieving cat info");

// get fed info
let fedInfo = function() {
  let response = JSON.parse( this.responseText );
  let fedInfo = document.getElementById('cat-info');
  // clear display for info
  fedInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  response.result.forEach(fed => {
    //.create fed info list
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerHTML = "Fed on " + fed.to_char + " by ";
    // create link to feeder
    let feeder = document.createElement('a');
    feeder.href = "/user/" + fed.id;
    feeder.innerText = fed.name;
    li.appendChild(feeder);
    display.appendChild(li);
  })
  fedInfo.appendChild(display);
};

// get follow info
let followInfo = function() {
  let response = JSON.parse( this.responseText );
  console.log(response);
  let followInfo = document.getElementById('cat-info');
  // clear display for info
  followInfo.innerHTML = "";
  let display = document.createElement('ul');
  display.classList.add("list-group", "list-group-flush");
  if (response.result === null) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    li.innerText = "Yet to have followers";
    display.appendChild(li);
  } else {
      response.result.forEach(follow => {
        //.create follower info list
        let li = document.createElement('li');
        li.classList.add("list-group-item");
        // create link to follower
        let follower = document.createElement('a');
        follower.href = "/user/" + follow.user_id;
        follower.innerText = follow.name;
        li.appendChild(follower);
        display.appendChild(li);
      })
    }
  followInfo.appendChild(display);
};

// get cat id
let getFed = function(event){
    console.log("fed info for cat");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", fedInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/cat/" + cat_id + "/fed");
    // send the request
    request.send();
};

// get cat id
let getFollow = function(event){
    console.log("follow info for cat");
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", followInfo);
    // ready the system by calling open, and specifying the url
    request.open("GET", "/cat/" + cat_id + "/follow");
    // send the request
    request.send();
};

document.querySelector('#catfed').addEventListener('click', getFed);
document.querySelector('#catfollow').addEventListener('click', getFollow);