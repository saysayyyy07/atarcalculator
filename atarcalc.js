const subj1 = document.querySelector(".subject1");
const subj2 = document.querySelector(".subject2");
const subj3 = document.querySelector(".subject3");
const subj4 = document.querySelector(".subject4");
const subj5 = document.querySelector(".subject5");
const subj6 = document.querySelector(".subject6");

const subj1Name = document.querySelector(".subject1 .subjectName");
const subj2Name = document.querySelector(".subject2 .subjectName");
const subj3Name = document.querySelector(".subject3 .subjectName");
const subj4Name = document.querySelector(".subject4 .subjectName");
const subj5Name = document.querySelector(".subject5 .subjectName");
const subj6Name = document.querySelector(".subject6 .subjectName");

const firstNumInput = document.querySelector("#firstNum");
const secondNumInput = document.querySelector("#secondNum");
const rawInputs = document.querySelectorAll("input #raw");
const weightInputs = document.querySelectorAll("#weight");
const userInputs = document.querySelectorAll("input");
const displayWAM = document.querySelectorAll(".wam")

let firstNum = 0;
let secondNum = 0;


let rawMarks = {
    "sub1": {
        "assessments": { 
        "ass1": 0,
        "ass2": 0,
        "ass3": 0,
        "ass4": 0
    }, "total": 0
    }, "sub2": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub3": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub4": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub5": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub6": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    },
}

let weighting = {
    "sub1": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub2": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub3": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub4": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub5": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    }, "sub6": {
        "assessments": { 
            "ass1": 0,
            "ass2": 0,
            "ass3": 0,
            "ass4": 0
        }, "total": 0
    },
}

let WAM = {
    "sub1": 0,
    "sub2": 0,
    "sub3": 0,
    "sub4": 0,
    "sub5": 0,
    "sub6": 0,
}

const invalidChars = ["e", "+", "-", "Tab"];
const subjectDivs = [subj1, subj2, subj3, subj4, subj5, subj6];
const subjectNames = [subj1Name, subj2Name, subj3Name, subj4Name, subj5Name, subj6Name];
const subjects = [
"Mathematics Extension 1", 
"Mathematics Extension 2", 
"Biology", 
"Physics", 
"English Advanced", 
""
] 



console.log(localStorage);

window.onload = function populateInputs() {
    WAM = JSON.parse(localStorage.getItem("storedWAM"))
    let raw = JSON.parse(localStorage.getItem("storedRawMarks"));
    rawMarks = raw;
    let weight = JSON.parse(localStorage.getItem("storedWeighting"));
    weighting = weight;
    for (let subNum=1; subNum <= 6; subNum++) {
        displayWAMValue(subNum);
        for (let assNum=1; assNum <= 4; assNum++) {
            if (raw[`sub${subNum}`] && raw[`sub${subNum}`]["assessments"] && raw[`sub${subNum}`]["assessments"][`ass${assNum}`]) {
            document.getElementById(`subject${subNum} raw ass${assNum}`).value = raw["sub" + subNum]["assessments"]["ass" + assNum];
            }
            if (weight[`sub${subNum}`] && weight[`sub${subNum}`]["assessments"] && weight[`sub${subNum}`]["assessments"][`ass${assNum}`]) {
            document.getElementById(`subject${subNum} weight ass${assNum}`).value = weight["sub" + subNum]["assessments"]["ass" + assNum];
            }
        }
    }
}


function setInputsinLocalStorage(subNum, assNum) {
    localStorage.setItem("storedRawMarks", JSON.stringify(rawMarks));
    localStorage.setItem("storedWeighting", JSON.stringify(weighting));
}


function setWAMinLocalStorage() {
    localStorage.setItem("storedWAM", JSON.stringify(WAM));
    storedWAM = localStorage.getItem("storedWAM")
}

function nanRemover() {
    for (let i=0; i < 6; i++) {
        if (displayWAM[i].innerHTML == "WAM: " + NaN) {
            displayWAM[i].innerHTML = "WAM: 0"
        }
    }
}

function roundDisplay() {
    for (sub in WAM) {
        WAM[sub] = Math.round(WAM[sub] * 100) / 100
    }
}

function displayWAMValue(subject) {
    if (displayWAM[subject-1].parentNode.classList.contains(`subject${subject}`)) {
        roundDisplay();
        displayWAM[subject-1].innerHTML = "WAM: " + WAM[`sub${subject}`];
    }
}

function getWeightedAverage(){
    for (let i=1; i <=6; i++) {
        WAM[`sub${i}`] = 
          (rawMarks[`sub${i}`]["assessments"]["ass1"]*weighting[`sub${i}`]["assessments"]["ass1"]
        + rawMarks[`sub${i}`]["assessments"]["ass2"]*weighting[`sub${i}`]["assessments"]["ass2"]
        + rawMarks[`sub${i}`]["assessments"]["ass3"]*weighting[`sub${i}`]["assessments"]["ass3"]
        + rawMarks[`sub${i}`]["assessments"]["ass4"]*weighting[`sub${i}`]["assessments"]["ass4"]) 
        / (weighting[`sub${i}`]["assessments"]["ass1"] + weighting[`sub${i}`]["assessments"]["ass2"] 
        + weighting[`sub${i}`]["assessments"]["ass3"] + weighting[`sub${i}`]["assessments"]["ass4"]);
        displayWAMValue(i);
    }
    setWAMinLocalStorage();
    setInputsinLocalStorage();
}

function storeInput(userInput) {
    userInputId = userInput.target.getAttribute("id");
    userInputValue = parseInt(userInput.srcElement.value);
    console.log("userinput for this box " + userInputId)
    if (userInputId.includes("raw")) {
        for (let i=1; i <= 6; i++) {
                for (let j=1; j <= 4; j++) {
                    if (userInputId.includes(`ass${j}`)) {
                        if (userInput.srcElement.parentNode.parentNode.classList.contains(`subject${i}`)) {
                            if (userInputValue < 0 || userInputValue > 100) alert("please input a number from 0 to 100");
                            else {
                                rawMarks[`sub${i}`]["assessments"][`ass${j}`] = userInputValue;
                            }
                        }
                    }
                getWeightedAverage(i, j);
                nanRemover();
                }
            }   
    
        } else if (userInputId.includes("weight")) {
            for (let i=1; i <= 6; i++) {
                for (let j=1; j <= 4; j++) {
                    if (userInputId.includes(`ass${j}`)) {
                        if (userInput.srcElement.parentNode.parentNode.classList.contains(`subject${i}`)) {
                            if (userInputValue < 0 || userInputValue > 100) alert("please input a number from 0 to 100");
                            else {
                            weighting[`sub${i}`]["assessments"][`ass${j}`] = userInputValue;
                            }
                        }
    
                    }
                getWeightedAverage(i, j);
                nanRemover();
                }
            }
        }
        else console.log("ERROR, not raw or weight");
    }

function addKeyListener() {
    for (i = 0; i < userInputs.length; i++) {
        userInputs[i].addEventListener("keyup", (e) => {
            if (invalidChars.includes(e.key)) e.preventDefault;
            else storeInput(e);
        })
    }
}

function setSubjectNames() {
    for (let i=0; i <= 5; i++) {
        if (subjects[i] === "") subjectDivs[i].style.display = "none";
        else subjectNames[i].textContent = subjects[i];
    }
}





addKeyListener();
setSubjectNames();