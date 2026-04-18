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
    let typeInput = document.forms;
    if (typeInput == ""){
        alert("Please select an activity type!")
        return false;
    }
}

// Building the table to display the activity log
var logHtml = "<table>";
logHtml += "<tr><th>Activity Type</th><th>Name</th><th>Duration/Quantity</th><th>Date</th><th>Notes</th></tr>"

// Storing form input in an array
function storeInput(){

    var typeInput = document.getElementById("actType");
    var nameInput = document.getElementById("actName");
    var amntInput = document.getElementById("amnt");
    var dateInput = document.getElementById("Date");
    var notesInput = document.getElementById("extraNotes");

    var typeValue = typeInput.value;
    var nameValue = nameInput.value;
    var amntValue = amntInput.value;
    var dateValue = dateInput.value;
    var notesValue = notesInput.value;
    
    var activityType = [typeValue];
    var activityName = [nameValue];
    var activityDuration = [amntValue];
    var activityDate = [dateValue];
    var activityNotes = [notesValue];

    console.log(activityType, activityName, activityDuration, activityDate, activityNotes);
    for(var i = 0; i < activityType.length; i++){
        logHtml += "<tr>";
        logHtml += "<td>" + activityType[i] + "</td>";
        logHtml += "<td>" + activityName[i] + "</td>";
        logHtml += "<td>" + activityDuration[i] + "</td>";
        logHtml += "<td>" + activityDate[i] + "</td>";
        logHtml += "<td>" + activityNotes[i] + "</td>";
        logHtml += "</tr>";
    }
}

logHtml += "</table>";

// Write the table to HTML
document.getElementById("activityLog").innerHTML = logHtml;
