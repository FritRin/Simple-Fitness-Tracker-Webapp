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

// Form validation 2 electric boogaloo
function validateFormInputs(){
    let typeInput = document.getElementById("actType").value;
    let dateInput = document.getElementById("Date").value;
    let parsedDate = new Date(dateInput);

    if(typeInput !== "Workout" && typeInput !== "Habit"){
        alert("Please input a valid activity type!");
        return false;
    }

    if(isNaN(parsedDate.getTime())){
        alert("Please input a valid date!")
        return false;
    }
    return true;
}
