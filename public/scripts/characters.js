console.log(characters);

// source: https://stackoverflow.com/a/901144/4409162
// takes out the weird ?filter= thingy from the query params in window.location.search
const urlParams = new URLSearchParams(window.location.search);
const filterParameter = urlParams.get("filter");

const $filterInput = document.getElementById("characters__filter");
$filterInput.value = params.filter;
