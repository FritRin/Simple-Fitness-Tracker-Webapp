"use strict";

// Building the table to display the activity log
var logHtml = "<table>";
logHtml += "<tr><th>Activity Type</th><th>Name</th><th>Duration/Quantity</th><th>Date</th><th>Notes</th></tr>"

// Using the array from the storeInput function to populate the table
for(var i = 0; i < activityType.length; i++){
    logHtml += "<tr>";
    logHtml += "<td>" + activityType[i] + "</td>";
    logHtml += "<td>" + activityName[i] + "</td>";
    logHtml += "<td>" + activityDuration[i] + "</td>";
    logHtml += "<td>" + activityDate[i] + "</td>";
    logHtml += "<td>" + activityNotes[i] + "</td>";
    logHtml += "</tr>";
}

logHtml += "</table>";

// Write the table to HTML
document.getElementById("activityLog").innerHTML = logHtml;