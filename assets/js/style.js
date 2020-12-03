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
var newsTitle = $("#newsArticle");
var historyContainer = $("#history-container");
var usRecovered = document.getElementById("usRecovered");
var recoveredState = $("#total-state-recovered");

// if nothing in local storage, sets search history to empty array
var searchHistory = JSON.parse(localStorage.getItem("state")) || [];
$(document).ready(function () {
    getUsTotals();
    usNews();
    // gets each value from array and sends it to display history function 
    for (i = 0; i < searchHistory.length; i++) {
        var history = searchHistory[i];
        displayHistory(history);
    }
});
var displayHistory = function (history) {
    // creates list of search history
    var hisBtn = $("<p>").addClass("circular ui icon label").text(history);
    historyContainer.prepend(hisBtn);
};
// listens for a change to the value of the dropdown, then sends value to api 
$("select")
    .change(function () {
        var str = "";
        $("select option:selected").each(function () {
            str += $(this).val();
            if (str) {
                stateSearch(str);
                searchHistory.push(str);
                localStorage.setItem("state", JSON.stringify(searchHistory));
            }
        });
    })
    .change();

// fetches state data
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
// fetches covid api
var getUsTotals = function () {
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
// fetches news api
var usNews = function () {
    fetch(
        'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&api-key=7V4py5nDHs5IQKqEAeirNycVjA5rAJtK'
    )
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayNews(data);
                })
            } else {
                alert("error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to newsAPI");
        });
}
// display's state current data
var displayStateData = function (currentData) {
    // empties out state numbers before new search
    stateNewDeaths.empty();
    stateNewCases.empty();
    stateTotalCases.empty();
    stateTotalDeaths.empty();
    state.empty();
    date.empty();
    recoveredState.empty();
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
    var stateRecovered = currentData.recovered.toLocaleString();
    console.log(stateRecovered);
    recoveredState.append(stateRecovered);
}
// displays US data
var displayUsData = function (UsData) {
    var usTotal = UsData[0].positive.toLocaleString();
    UsTotal.append(usTotal);
    var usDeath = UsData[0].death.toLocaleString();
    UsDeath.append(usDeath);
    var recoveredUS = UsData[0].recovered.toLocaleString();
    usRecovered.append(recoveredUS);

}
// displays news link
var displayNews = function (news) {
    var articleTitle = $("<a>").attr("href", news.response.docs[1].web_url).attr("target", "_blank").text(news.response.docs[1].headline.main);
    newsTitle.append(articleTitle);
}

