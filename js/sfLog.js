"use strict";

let editedRow = null;

// runs store input function when form is submitted then clears and hides the form
document.getElementById("activityForm").addEventListener("submit", function(event){
    event.preventDefault();
    if(validateFormInputs()){
        storeInput();
        this.reset();
        showHideForm(0);
    }    
});

document.getElementById("searchKey").addEventListener("input", searchAndFilterData);
document.getElementById("filterKey").addEventListener("change", searchAndFilterData);



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
    activity.id = Date.now();

    // Create an array to store activity objects in
    let activityLog = JSON.parse(localStorage.getItem("activity")) || [];

    //Check if an input is being edited and modify corresponding row instead adding new row
    if(editedRow !== null){
        activityLog[editedRow] = activity;
        editedRow = null;
        alert("Activity edited successfully!")
    }

    else{
        activityLog.unshift(activity);
        alert("Activity logged successfully!");
    }

    // Stores array with unique key in localStorage then calls display function to show input in table
    localStorage.setItem("activity", JSON.stringify(activityLog));

    displayInput();
}

// Display function
function displayInput(data = null) {
    const tableBody = document.getElementById("activityLog");
    tableBody.innerHTML = "";

    let activityLog = data || JSON.parse(localStorage.getItem("activity")) || [];

    // Retrieves values from localStorage
    activityLog.forEach((activity, index) => {
        // Creates rows with values taken from localStorage and appends to table
        const row = document.createElement("tr");
        row.innerHTML = `<td>${activity.actType}</td>
                        <td>${activity.actName}</td>
                        <td>${activity.actDuration}</td>
                        <td>${activity.actDate}</td>
                        <td>${activity.actNotes}</td>
                        <td><button onclick="deleteData('${activity.id}')">Delete</button>
                        <button onclick="editData('${activity.id}')">Edit</button></td>`;
    tableBody.appendChild(row);    
        
    });
    console.log(Array.isArray(activityLog));
}

// Delete a row from the table
function deleteData(id){
    if(confirm("Are you sure you want to delete this entry?") == true){
        let storedData = JSON.parse(localStorage.getItem("activity")) || [];
        
        let index = storedData.findIndex(activity => activity.id === id);
        storedData.splice(index, 1);

        localStorage.setItem("activity", JSON.stringify(storedData));
        displayInput();
    }
}

function editData(id){
    let storedData = JSON.parse(localStorage.getItem("activity")) || [];

    let index = storedData.findIndex(activty => activity.id === id);
    let activity = storedData[index];

    document.getElementById("actType").value = activity.actType;
    document.getElementById("actName").value = activity.actName;
    document.getElementById("amnt").value = activity.actDuration;
    document.getElementById("Date").value = activity.actDate;
    document.getElementById("extraNotes").value = activity.actNotes;

    editedRow = index;
    showHideForm(1);
}

function searchAndFilterData(){
    let storedData = JSON.parse(localStorage.getItem("activity")) || [];
    let searchKey = document.getElementById("searchKey").value.toLowerCase();
    let filterType = document.getElementById("filterKey").value;

    let filteredLog = storedData.filter(activity => {
        let matchesSearch = searchKey === "" || activity.actName.toLowerCase().includes(searchKey)
        let matchesFilter = filterType === "" || filterType === "All" || activity.actType === filterType;
        
        return matchesSearch && matchesFilter;    
    });

    displayInput(filteredLog);
    console.log(Array.isArray(filteredLog));
}

window.onload = searchAndFilterData;