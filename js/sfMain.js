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

    if(buttonPressed===2){
        document.getElementById("goalForm").style.display="block";
    }
    else
        document.getElementById("goalForm").style.display="none";
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

//KILL ALL THE DATA - very simple just clears everything from localStorage with remove item
function deleteAllData(){
    if(confirm("Are you sure you want to clear all data? (removes all your activities and goals)")){
        localStorage.removeItem("activity");
        localStorage.removeItem("goals")

        //Redisplays everything so user can see it's all gone
        displayInput();
        displayGoals();
        displayStats();
        displayStreak();

        alert("All data cleared successfully!")
    }
}

//Display all user data on window load
window.addEventListener("load", () => {
    searchAndFilterData();
    displayStats();
    displayGoals();
    displayStreak();
});



