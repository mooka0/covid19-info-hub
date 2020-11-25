// selects dropdown and makes list shorter
$('#drop-down').dropdown();

var stateNewDeaths = $("#new-deaths");
var stateNewCases = $("#new-cases");
var stateTotalCases = $("#total-state-cases");
var stateTotalDeaths = $("#total-state-deaths");
var state = $("#state");
var date = $("#date");
var UsTotal = $("#totalUs");
var UsDeath = $("#usDeaths");
var newsTitle = document.getElementById(newsArticle);
var articleLink = document.getElementById(linkEl);




$(document).ready(function () {
    getUsTotals();
});
// listens for a change to the value of the dropdown, then sends value to api 
$("select")
    .change(function () {
        var str = "";
        $("select option:selected").each(function () {
            str += $(this).val();
            if (str) {
                stateSearch(str);
            }
        });
    })
    .change();
var stateSearch = function (state) {
    var apiUrl = 'https://api.covidtracking.com/v1/states/' + state + '/current.json';
    fetch(apiUrl)

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayStateData(data);
                })
            } else {
                alert("error: " + response.statusText);

            }

        })
        .catch(function (error) {
            alert("Unable to connect to covidAPI");
        });


}

var getUsTotals = function(){
    var usApi = 'https://api.covidtracking.com/v1/us/current.json';
    fetch(usApi)

        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                 displayUsData(data);
                })
            } else {
                alert("error: " + response.statusText);

            }

        })
        .catch(function (error) {
            alert("Unable to connect to covidAPI");
        });
}

var displayStateData = function (currentData) {
    // empties out state numbers before new search
    stateNewDeaths.empty();
    stateNewCases.empty();
    stateTotalCases.empty();
    stateTotalDeaths.empty();
    state.empty();
    date.empty();
    // selects dropdown menu and sets the states name to the header of the top middle card
    var stateName = "";
    $("select option:selected").each(function () {
        stateName += $(this).text();
        state.append(stateName)
    });
    // adds numbers to corresponding sub headers
    var todaysDeaths = currentData.deathIncrease.toLocaleString();
    stateNewDeaths.append(todaysDeaths);
    var todaysNew = currentData.positiveIncrease.toLocaleString();
    stateNewCases.append(todaysNew);
    var totalStateCases = currentData.positive.toLocaleString();
    stateTotalCases.append(totalStateCases);
    var totalStateDeaths = currentData.death.toLocaleString();
    stateTotalDeaths.append(totalStateDeaths);
    var cDate = new Date(currentData.dateModified).toLocaleDateString();
    date.append(cDate);

}

var displayUsData = function(UsData){
    var usTotal = UsData[0].positive.toLocaleString();
    UsTotal.append(usTotal);
    var usDeath = UsData[0].death.toLocaleString();
    UsDeath.append(usDeath);
}

var usNews = function(){
    fetch(
       'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&api-key=7V4py5nDHs5IQKqEAeirNycVjA5rAJtK'
    )
    .then (function (response){
        return response.json();
    })
    .then(function (response){
        console.log(response);
        var articleTitle = response.response.docs[1].headline.main;
        newsArticle.append(articleTitle);
        var newsURL = response.response.docs[1].web_url;
        console.log(newsURL);
        linkEl.append(newsURL);
    })
}
usNews();
