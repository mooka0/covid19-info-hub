var search = document.getElementById("search");
var stateNewDeaths = document.querySelector("#stateDeaths")
var stateNewCases = document.querySelector("#new-cases")
var stateTotalCases = document.querySelector("#total-state-cases")
var stateTotalDeaths = document.querySelector("#total-state-deaths")

var searchCovid = function (){
    var searchInput = document.querySelector('#search').value;
    fetch (
        'https://api.covidtracking.com/v1/states/current.json'
        // add + searchInput + "states/current.json"
    )
    .then (function(response){
        return response.json();
    })
    .then (function(response){
        console.log(response);
        var todaysDeaths = response[5].deathIncrease;
        stateNewDeaths.append(todaysDeaths);
        var todaysNew = response[5].positiveIncrease;
        stateNewCases.append(todaysNew);
        var totalStateCases = response[5].positive;
        stateTotalCases.append(totalStateCases);
        var totalStateDeaths = response[5].deathConfirmed; 
        stateTotalDeaths.append(totalStateDeaths);
    })

}
searchCovid();
