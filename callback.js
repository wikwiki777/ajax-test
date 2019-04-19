function getData(url, cb) {
    // Create new instance of the XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Make request to api
    xhr.open("GET", url);
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

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// render data to document
function writeToDocument(url) {
    // body...
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    
    getData(url, function(data){
        //browse trough object and see format
        //console.dir(data);
        var pagination;
        if (data.next || data.previous ){
            pagination = generatePaginationButtons(data.next, data.previous)
        }
        
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
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
        
    });
}
