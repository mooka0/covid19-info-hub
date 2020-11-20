var search = document.getElementById("#search");
var stateNewDeaths = document.getElementById("#stateDeaths")

var searchCovid = function (){
    var searchInput = document.querySelector('#search').value;
    fetch (
        'https://api.covidtracking.com/v1/states/current.json'
    )
    .then (function(response){
        return response.json();
    })
    .then (function(response){
        // if (response.ok){
        //     addNewDeaths(response);
        // }
        console.log(response);
        var todaysDeaths= response[5].deathIncrease;
        console.log(todaysDeaths);
        stateNewDeaths.append(todaysDeaths);
    })

}
searchCovid();

// var addNewDeaths = function(response){
//     stateNewDeaths.append(todaysDeaths);
// }