"use strict";

// Get and display current date
const currentDate = new Date();
var dateStr = currentDate.toLocaleDateString();
document.getElementById("todayDate").innerHTML = dateStr;

// Show form upon clicking button and hide upon submitting
function showHideForm(buttonPressed){
    if(buttonPressed===1)
        document.getElementById("activityForm").style.display="block";
    else
        document.getElementById("activityForm").style.display="none";
}

// Validate form input
function validateForm(){
    let typeInput = document.forms["activityForm"]["actName"];
    if (typeInput == ""){
        alert("Please select an activity type!")
        return false;
    }
}
