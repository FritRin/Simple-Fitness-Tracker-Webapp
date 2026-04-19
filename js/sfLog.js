"use strict";

document.getElementById("activityForm").addEventListener("submit", function(event){storeInput();});

function storeInput(){

    var typeInput = document.getElementById("actType").value;
    var nameInput = document.getElementById("actName").value;
    var amntInput = document.getElementById("amnt").value;
    var dateInput = document.getElementById("Date").value;
    var notesInput = document.getElementById("extraNotes").value;
    if (notesInput === ""){
        notesInput = "None"
    }

    var activityArray = `${typeInput}#${nameInput}#${amntInput}#${dateInput}#${notesInput}`;
    console.log(activityArray);

    const timeStamp = Date.now();

    localStorage.setItem("log_" + timeStamp, activityArray);

    console.log(activityArray);
    }

function displayInput() {
    var tableBody = document.getElementById("activityLog");
    tableBody.innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key && key.startsWith("log_")){
            var value = localStorage.getItem(key);
            var tableValues = value.split("#");
            
            var row = document.createElement("tr");
            row.innerHTML = `<td>${tableValues[0]}</td>
                            <td>${tableValues[1]}</td>
                            <td>${tableValues[2]}</td>
                            <td>${tableValues[3]}</td>
                            <td>${tableValues[4]}</td>
            `;
            tableBody.appendChild(row);
        }

    }
}

window.onload = displayInput;