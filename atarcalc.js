const subj1 = document.querySelector(".subject1");
const subj2 = document.querySelector(".subject2");
const subj3 = document.querySelector(".subject3");
const subj4 = document.querySelector(".subject4");
const subj5 = document.querySelector(".subject5");
const subj6 = document.querySelector(".subject6");

const aligned1 = document.getElementsByClassName("aligned 1");
const aligned2 = document.getElementsByClassName("aligned 2");
const aligned3 = document.getElementsByClassName("aligned 3");
const aligned4 = document.getElementsByClassName("aligned 4");
const aligned5 = document.getElementsByClassName("aligned 5");
const aligned6 = document.getElementsByClassName("aligned 6");


const subj1Name = document.querySelector(".subject1 select").value;
const subj2Name = document.querySelector(".subject2 select").value;
const subj3Name = document.querySelector(".subject3 select").value;
const subj4Name = document.querySelector(".subject4 select").value;
const subj5Name = document.querySelector(".subject5 select").value;
const subj6Name = document.querySelector(".subject6 select").value;

const subNames = document.querySelectorAll("select");
const rawInputs = document.querySelectorAll("input #raw");
const weightInputs = document.querySelectorAll("#weight");
const userInputs = document.querySelectorAll("input");
const displayWAM = document.querySelectorAll(".wam")

let firstNum = 0;
let secondNum = 0;

let storedSubjects = {
    "sub1": "",
    "sub2": "",
    "sub3": "",
    "sub4": "",
    "sub5": "",
    "sub6": "",
}

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

let aligned = {
}

const invalidChars = ["e", "+", "-", "Tab"];
const subjectDivs = [subj1, subj2, subj3, subj4, subj5, subj6];
const subjectNames = [subj1Name, subj2Name, subj3Name, subj4Name, subj5Name, subj6Name];
const alignedValues = [aligned1, aligned2, aligned3, aligned4, aligned5, aligned6];


// TO DOOOO

// move select to js with document.createElement
// make an object with all subject names and ids 
// remove if alr chosen
// 4u and 3u linked.
// add/remove subjects
// on change subject, clear inputs/wam
// nicer CSS
// add/remove assessments (per sub or everything?)



window.onload = function populateInputs() {

    if (localStorage.getItem("storedSubjects") == null) localStorage.setItem("storedSubjects", JSON.stringify(storedSubjects));
    if (localStorage.getItem("storedWAM") == null) ;
    if ((localStorage.getItem("storedRawMarks")) == null) ;
    if ((localStorage.getItem("storedWeighting")) == null) ;
    else {
        storedSubjects = JSON.parse(localStorage.getItem("storedSubjects"));
        WAM = JSON.parse(localStorage.getItem("storedWAM"));
        rawMarks = JSON.parse(localStorage.getItem("storedRawMarks"));
        weighting = JSON.parse(localStorage.getItem("storedWeighting"));
        let subjects = JSON.parse(localStorage.getItem("storedSubjects"));

        for (let subNum=1; subNum <= 6; subNum++) {
            document.querySelector(`.subject${subNum} select`).value = subjects[`sub${subNum}`];

            displayWAMValue(subNum);
            rawToAligned(subNum);
            for (let assNum=1; assNum <= 4; assNum++) {
                if (rawMarks[`sub${subNum}`] && rawMarks[`sub${subNum}`]["assessments"] && rawMarks[`sub${subNum}`]["assessments"][`ass${assNum}`]) {
                document.getElementById(`subject${subNum} raw ass${assNum}`).value = rawMarks["sub" + subNum]["assessments"]["ass" + assNum];
                }
                if (weighting[`sub${subNum}`] && weighting[`sub${subNum}`]["assessments"] && weighting[`sub${subNum}`]["assessments"][`ass${assNum}`]) {
                document.getElementById(`subject${subNum} weight ass${assNum}`).value = weighting["sub" + subNum]["assessments"]["ass" + assNum];
                }
            }
        }
    }
}

function setInputsinLocalStorage() {
    localStorage.setItem("storedRawMarks", JSON.stringify(rawMarks));
    localStorage.setItem("storedWeighting", JSON.stringify(weighting));
}

function setWAMinLocalStorage() {
    localStorage.setItem("storedWAM", JSON.stringify(WAM));
    storedWAM = localStorage.getItem("storedWAM")
}

function nanRemover(i) {
    if (displayWAM[i-1].innerHTML.includes(NaN)) {
        displayWAM[i-1].innerHTML = "WAM: 0"
    } else if (alignedValues[i-1][0].innerHTML.includes(NaN)) {
        alignedValues[i-1][0].innerHTML = "Aligned: 0"
    }
    

}

function roundDisplay() {
    for (sub in WAM) {
        WAM[sub] = Math.round(WAM[sub] * 100) / 100
    }
}

function displayWAMValue(subject) {
    if (displayWAM[subject-1].parentNode.classList.contains(`subject${subject}`) ||
        displayWAM[subject-1].parentNode.parentNode.classList.contains(`subject${subject}`) ) {
        roundDisplay();
        displayWAM[subject-1].innerHTML = "WAM: " + WAM[`sub${subject}`];
    }
}

function getWeightedAverage(i){
    WAM[`sub${i}`] = 
    (parseInt(
        rawMarks[`sub${i}`]["assessments"]["ass1"]*weighting[`sub${i}`]["assessments"]["ass1"]
        + rawMarks[`sub${i}`]["assessments"]["ass2"]*weighting[`sub${i}`]["assessments"]["ass2"]
        + rawMarks[`sub${i}`]["assessments"]["ass3"]*weighting[`sub${i}`]["assessments"]["ass3"]
        + rawMarks[`sub${i}`]["assessments"]["ass4"]*weighting[`sub${i}`]["assessments"]["ass4"])
        / parseInt(weighting[`sub${i}`]["assessments"]["ass1"] + weighting[`sub${i}`]["assessments"]["ass2"] 
        + weighting[`sub${i}`]["assessments"]["ass3"] + weighting[`sub${i}`]["assessments"]["ass4"]));
    displayWAMValue(i);
    setWAMinLocalStorage();
    setInputsinLocalStorage();
    rawToAligned(i);
}

function storeInput(userInput) {

    userInputId = userInput.target.getAttribute("id");
    userInputValue = parseInt(userInput.srcElement.value);

    if (userInput.srcElement.value == "") userInputValue = 0;
    if (userInputId.includes("raw")) {
        for (let i=1; i <= 6; i++) {
                for (let j=1; j <= 4; j++) {
                    if (userInputId.includes(`ass${j}`)) {
                        if (userInput.srcElement.parentNode.parentNode.classList.contains(`subject${i}`)) {
                            if (userInputValue < 0 || userInputValue > 100) alert("please input a number from 0 to 100");
                            else {
                                rawMarks[`sub${i}`]["assessments"][`ass${j}`] = userInputValue;
                                getWeightedAverage(i);
                                nanRemover(i);
                            }
                        }
                    }
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
                            getWeightedAverage(i);
                            nanRemover(i);
                            }
                        }
    
                    }
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

function addSelectListener() {
    for (let i=0; i < subjectNames.length; i++) {
        subNames[i].addEventListener("change", (e) => {
            setSubjectNames(e);
        })
    }
}

function setSubjectNames(subject) {
    subNum = subject.target.id[3];
    subName = subject.target.value
    
    storedSubjects[`sub${subNum}`] = subName
    localStorage.setItem(`storedSubjects`, JSON.stringify(storedSubjects));
}

function rawToAligned(subNum) {
    subName = document.getElementById(`sub${subNum}`).value;
    storedWAM = JSON.parse(localStorage.getItem("storedWAM"));
    subWAM = storedWAM[`sub${subNum}`];

    if (subName == "mathstd") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "mathsadv") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "mathsext1") {
        //2023 data
        if (subWAM >= 64.29) {
            aligned[subName] = 0.254615*subWAM + 73.6308;
        } else if (subWAM >= 45.71) {
            aligned[subName] = 1.04987*subWAM + 22.0105;
        } else if (subWAM >= 20) {
            aligned[subName] = 0.79328*subWAM + 33.8656;
        } else {
            aligned[subName] = 2.45184*subWAM + 0.469352;
              }
    } else if (subName == "mathsext2") {
        //2023 data
        if (subWAM >= 66) {
            aligned[subName] = 5*subWAM/17 + 1200/17;
        } else if (subWAM >= 42) {
            aligned[subName] = 10*subWAM/11 + 351/11;
        } else if (subWAM >= 20) {
            aligned[subName] = 9*subWAM/10 + 161/5;
        } else {
            aligned[subName] = 5*subWAM/2;
              }
    } else if (subName == "biology") {
            //2022 data
        if (subWAM >= 78) {
            aligned[subName] = subWAM/2 + 51;
        } else if (subWAM >= 65) {
            aligned[subName] = 3*subWAM/4 + 125/4;
        } else if (subWAM >= 52) {
            aligned[subName] = 3*subWAM/4 + 125/4;
        } else if (subWAM >= 38) {
            aligned[subName] = 5*subWAM/7 + 230/7;
        } else {
            aligned[subName] = 30*subWAM/19;
              }
    } else if (subName == "chemistry") {
        //2023 data
        if (subWAM >= 85) {
            aligned[subName] = subWAM/2 + 95/2;
        } else if (subWAM >= 72) {
            aligned[subName] = 5*subWAM/7 + 200/7;
        } else if (subWAM >= 55) {
            aligned[subName] = 3*subWAM/5 + 37;
        } else {
            aligned[subName] = 14*subWAM/11;
              }
    } else if (subName == "physics") {
        //2022 data
        if (subWAM >= 89) {
            aligned[subName] = 7*subWAM/8 + 97/8;
        } else if (subWAM >= 74) {
            aligned[subName] = 2*subWAM/3 + 92/3;
        } else if (subWAM >= 54) {
            aligned[subName] = subWAM/2 + 43;
        } else {
            aligned[subName] = 35*subWAM/27;
              }
    } else if (subName == "englishstd") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "englishadv") {
        //2023 data
        if (subWAM >= 85) {
            aligned[subName] = 0.615385*subWAM + 37.7692;
        } else if (subWAM >= 67) {
            aligned[subName] = 0.580645*subWAM + 41.0968;
        } else {
            aligned[subName] = 80*subWAM/67;
              }
    } else if (subName == "englishext1") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "englishext2") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "economics") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "business") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "legal") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "modernhis") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "ancienthis") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "sdd") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    } else if (subName == "engineering") {
        if (subWAM >= 90) {

        } else if (subWAM >= 80) {

        } else if (subWAM >= 70) {
    
        } else if (subWAM >= 60) {

        } else if (subWAM >= 50) {

        } else {

              }
    }

    nanRemover(subNum);
    displayAligned(subNum, subName);
    displayBand(subWAM);

    //TO DO: MAKE IT SHOW UP ON SCREEN (WITHIN THE SAME THINGS AS BEFORE??)
}


function displayAligned(subNum, subName) {
    subjectHTML = document.getElementsByClassName("aligned " + subNum);
    subjectHTML[0].innerHTML = "Aligned: " + Math.round(aligned[subName]);
}

function displayBand() {

}



addKeyListener();
addSelectListener();