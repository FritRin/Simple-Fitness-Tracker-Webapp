"use strict";

// Calculate statistics from activity log
function calculateStats(){
    let storedData = JSON.parse(localStorage.getItem("activity")) || [];

    let currentDate = new Date();

    // Get week range
    let weekStart = getStartOfWeek(currentDate);
    let weekEnd = getEndOfWeek(weekStart);

    // Get month range
    let monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    let totalLogged = storedData.length;
    //establish variables to count
    let weeklySessions = 0;
    let weeklyMinutes = 0;
    let weeklyKm = 0;
    let monthlySessions = 0;
    let monthlyMinutes = 0;
    let monthlyKm = 0;
    
    let weeklySessionsCount = 0;
    let weeklyKmCount = 0;
    let weeklyMinutesCount = 0;
    let monthlySessionsCount = 0;
    let monthlyKmCount = 0;
    let monthlyMinutesCount = 0;

    storedData.forEach(activity => {
        let activityDate = new Date(activity.actDate);
        let duration = Number(activity.actDuration) || 0;

        if(activityDate >= weekStart && activityDate <= weekEnd){
            if(activity.actUnit === "Sessions"){
                weeklySessions += duration;
                weeklySessionsCount++;
            }
            else if(activity.actUnit === "km"){
                weeklyKm += duration;
                weeklyKmCount++;
            }
            else{
                weeklyMinutes += duration;
                weeklyMinutesCount++;
            }
        }

        if(activityDate >= monthStart && activityDate <= monthEnd){
            if(activity.actUnit === "Sessions"){
                monthlySessions += duration;
                monthlySessionsCount++;
            }
            else if(activity.actUnit === "km"){
                monthlyKm += duration;
                monthlyKmCount++;
            }
            else{
                monthlyMinutes += duration;
                monthlyMinutesCount++;
            }
        }
    });
    // Get averages
    let weeklySessionAvrg = weeklySessionsCount > 0 ? (weeklySessions/weeklySessionsCount).toFixed(2) : 0;
    let weeklyKmAvrg = weeklyKmCount > 0 ? (weeklyKm/weeklyKmCount).toFixed(2) : 0;
    let weeklyMinuteAvrg = weeklyMinutesCount > 0 ? (weeklyMinutes/weeklyMinutesCount).toFixed(2) : 0;
    let monthlySessionAvrg = monthlySessionsCount > 0 ? (monthlySessions/monthlySessionsCount).toFixed(2) : 0;
    let monthlyKmAvrg = monthlyKmCount > 0 ? (monthlyKm/monthlyKmCount).toFixed(2) : 0;
    let monthlyMinutesAvrg = monthlyMinutesCount > 0 ? (monthlyMinutes/monthlyMinutesCount).toFixed(2) : 0;

    //Very likely could have been done in a much cleaner way, this is a lot
    return {
        totalLogged,
        weeklySessions,
        weeklyKm,
        weeklyMinutes,
        monthlySessions,
        monthlyKm,
        monthlyMinutes,
        weeklySessionAvrg,
        weeklyKmAvrg,
        weeklyMinuteAvrg,
        monthlySessionAvrg,
        monthlyKmAvrg,
        monthlyMinutesAvrg,
        weeklySessionsCount,
        weeklyKmCount,
        weeklyMinutesCount,
        monthlySessionsCount,
        monthlyKmCount,
        monthlyMinutesCount
    };
}

function displayStats(){
    let stats = calculateStats();

    //Again could've been done more cleanly probably, it's a lot, will try to not make it too overwhelming with CSS
    document.getElementById("activityStats").innerHTML =
    `<div id="statContainer">   
        <div id="statDisplay">Total Activities Logged: ${stats.totalLogged}</div>
        <div id="statDisplay">Sessions This Week: ${stats.weeklySessions}</div>
        <div id="statDisplay">Km Walked/Ran This Week: ${stats.weeklyKm}</div>
        <div id="statDisplay">Time Exerccising This Week: ${stats.weeklyMinutes}</div>
        <div id="statDisplay">Average Sessions Weekly: ${stats.weeklySessionAvrg}</div>
        <div id="statDisplay">Average km Walked/Ran Weekly: ${stats.weeklyKmAvrg}</div>
        <div id="statDisplay">Average Time Exercising This Week: ${stats.weeklyMinuteAvrg}</div>
        <div id="statDisplay"> Sessions This Month: ${stats.monthlySessions}</div>
        <div id="statDisplay">Km Walked/Ran This Month: ${stats.monthlyKm}</div>
        <div id="statDisplay">Time Exercising This Month: ${stats.monthlyMinutes}</div>
        <div id="statDisplay">Average Sessions Monthly: ${stats.monthlySessionAvrg}</div>
        <div id="statDisplay">Average km Walked/Ran Monthly: ${stats.monthlyKmAvrg}</div>
        <div id="statDisplay">Average Time Exercising This Month: ${stats.monthlyMinutesAvrg}</div>
    </div>`;

}

//Store goals from another form
function storeGoals(){
    let goal = {}
    goal.gType = document.getElementById("goalType").value;
    goal.gName = document.getElementById("goalName").value;
    goal.gAmnt = Number(document.getElementById("goalTarget").value);
    goal.gUnits = document.getElementById("goalUnit").value;
    goal.gPeriod = document.getElementById("goalPeriod").value;

    let userGoals = JSON.parse(localStorage.getItem("goals")) || [];
    userGoals.push(goal);

    localStorage.setItem("goals", JSON.stringify(userGoals));
    alert("New goal added successfully!")

    displayGoals();

}

//Calculates goal progress by checking for logged activities that match the criteria of the log
function calculateProgress(goal, activities){
    let currentDate = new Date();

    let startDate, endDate;

    if (goal.gPeriod === "A Week"){
        startDate = getStartOfWeek(currentDate);
        endDate = getEndOfWeek(startDate);
    }
    else {
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }

    let totalProgress = 0;

    activities.forEach(activity => {
        let activityDate = new Date(activity.actDate);
        
        if(activityDate >= startDate && activityDate <= endDate ){
            if(activity.actName === goal.gName){
                if(activity.actUnit === goal.gUnits){
                    totalProgress += Number(activity.actDuration) || 0;
                }       
            }
        }
    })
    return totalProgress;
}

//Display the stored goal and the progress calculated by the function above
function displayGoals(){
    let storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    let storedActivities = JSON.parse(localStorage.getItem("activity")) || [];

    let goalList = document.getElementById("goalList");
    goalList.innerHTML = "";

    storedGoals.forEach(goal => {
        let progress = calculateProgress(goal, storedActivities);
        let percentage = Math.min((progress/goal.gAmnt) * 100, 100);

        let div = document.createElement("div");

        div.innerHTML = `<p class="goalTitle">${goal.gName}: ${progress}/${goal.gAmnt} ${goal.gUnits} over ${goal.gPeriod}</p>
        <div class="progressContainer">
            <div class="progressBar">
                <div style="width:${percentage}%;" class="progressBarFill">${percentage}%</div>
            </div>
        </div>`
        goalList.appendChild(div);
    });
}

//Calculate streak by checking if there has been an activity today + prior consecutive days
function calculateStreak(activities){
    if(!activities.length) return 0;

    //Ensure that days are only counted once even if there's multiple activities
    let uniqueDates = new Set();

    activities.forEach(activity =>{
        uniqueDates.add(activity.actDate);
    });

    let dates = Array.from(uniqueDates).map(date => {
        let newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
});

    dates.sort((a, b) => b - a);

    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    let streak = 0;

    while(true){
        let foundActivity = dates.some(date => date.getTime() === todayDate.getTime());

        if (foundActivity){
            streak++;
            todayDate.setDate(todayDate.getDate() - 1);
        }
        else{
            break;
        }
    }
    return streak;

}

//Display user's current streak
function displayStreak(){
    let storedActivities = JSON.parse(localStorage.getItem("activity")) || [];
    let streak = calculateStreak(storedActivities);

    document.getElementById("userStreak").innerHTML = `<h2 class="userStreak">Current Streak: ${streak} day(s)</h2>`;
}