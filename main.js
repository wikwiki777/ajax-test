// Create new instance of the XMLHttpRequest object
var xhr = new XMLHttpRequest();

var data;

// Make request to api
xhr.open("GET", "https://swapi.co/api/");
// Send request
xhr.send();


xhr.onreadystatechange = function() {
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState 
    if( this.readyState == 4 && this.status == 200) {
        //see what happens
        //console.log(this.readyState);
        // check the type of the data received with
        // console.log(typeof(this.responseText));
        // console.log(typof(JSON.parse(this.responseText)));
        // console.log(JSON.parse(this.responseText));
        //document.getElementById("data").innerHTML = this.responseText;
        data = JSON.parse(this.responseText);
    }
};

//Set timeout function
//tell console.log to wait for 500 ms before executing
setTimeout(function(){
    console.log(data);
}, 500);