"use strict";

// runs store input function when form is submitted
document.getElementById("activityForm").addEventListener("submit", function(event){
    event.preventDefault();
    if(validateFormInputs()){
        storeInput();
        this.reset();
        showHideForm(0);
    }    
});



// Function to store form input in an array -> localStorage
function storeInput(){
    // create an activity object
    const activity = {};

    // Stores form inputs in activity object
    activity.actType = document.getElementById("actType").value;
    activity.actName = document.getElementById("actName").value;
    activity.actDuration = document.getElementById("amnt").value;
    activity.actDate = document.getElementById("Date").value;
    activity.actNotes = document.getElementById("extraNotes").value || "None";

    // Create an array to store activity objects in
    let activities = JSON.parse(localStorage.getItem("activity")) || [];

    activities.unshift(activity);

    // Stores array with unique key in localStorage then calls display function to show input in table
    localStorage.setItem("activity", JSON.stringify(activities));
    alert("Activity logged successfully!");
    displayInput();
}

// Display function
function displayInput() {
    const tableBody = document.getElementById("activityLog");
    tableBody.innerHTML = "";

    let activities = JSON.parse(localStorage.getItem("activity")) || [];

    // Retrieves values from localStorage
    activities.forEach((activity, index) => {
        // Creates rows with values taken from localStorage and appends to table
        const row = document.createElement("tr");
        row.innerHTML = `<td>${activity.actType}</td>
                        <td>${activity.actName}</td>
                        <td>${activity.actDuration}</td>
                        <td>${activity.actDate}</td>
                        <td>${activity.actNotes}</td>
                        <td><button onclick="deleteData('${index}')">Delete</button>
                        <button>Edit</button></td>`;
    tableBody.appendChild(row);    
        
    });
}

// Delete a row from the table
function deleteData(index){
    if(confirm("Are you sure you want to delete this entry?") == true){
        let activities = JSON.parse(localStorage.getItem("activity")) || [];
        activities.splice(index, 1);
        localStorage.setItem("activity", JSON.stringify(activities));
        displayInput();
    }
}

window.onload = displayInput;

