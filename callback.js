const baseUrl = "https://swapi.co/api/";

function getData(type, cb) {
    // Create new instance of the XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Make request to api
    xhr.open("GET", baseUrl + type + "/");
    // Send request
    xhr.send();


    xhr.onreadystatechange = function() {
        // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState 
        if (this.readyState == 4 && this.status == 200) {
            //see what happens
            //console.log(this.readyState);
            // check the type of the data received with
            // console.log(typeof(this.responseText));
            // console.log(typof(JSON.parse(this.responseText)));
            // console.log(JSON.parse(this.responseText));
            //document.getElementById("data").innerHTML = this.responseText;
            cb(JSON.parse(this.responseText));
        }
    };
}

/*
getData(function(data){
    console.log(data);
})
*/

function getTableHeaders(obj){
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`);
    })
    
    return `<tr>${tableHeaders}</tr>`;
}


// render data to document
function writeToDocument(type) {
    // body...
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    
    getData(type, function(data){
        //browse trough object and see format
        //console.dir(data);
        
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item){
            //iterate over keys
            // Object.keys(item).forEach(function(key){
            //     console.log(key);
            // })
           //  el.innerHTML +=  "<p>" + item.name + "</p>";
           var dataRow = [];
           
           Object.keys(item).forEach(function(key){
               var rowData = item[key].toString();
               var truncatedData = rowData.substring(0, 15);
               dataRow.push(`<td>${truncatedData}</td>`);
           });
           tableRows.push(`<tr>${dataRow}</tr>`);
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
        
    });
}
