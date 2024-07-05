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

const band1 = document.getElementsByClassName("band 1");
const band2 = document.getElementsByClassName("band 2");
const band3 = document.getElementsByClassName("band 3");
const band4 = document.getElementsByClassName("band 4");
const band5 = document.getElementsByClassName("band 5");
const band6 = document.getElementsByClassName("band 6");


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
const displayWAM = document.querySelectorAll(".wam");
const alignedDisplay = document.querySelectorAll(".aligned");
const bandDisplay = document.querySelectorAll(".band");
const scaledDisplay = document.querySelectorAll(".scaled");
const atarEquivDisplay = document.querySelectorAll(".equivalent");
const atarDisplay = document.querySelector(".atar");
const advModeToggle = document.getElementsByClassName("advmodetoggle");

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

let scaled = {

}

const invalidChars = ["e", "+", "-", "Tab"];
const subjectDivs = [subj1, subj2, subj3, subj4, subj5, subj6];
const subjectNames = [subj1Name, subj2Name, subj3Name, subj4Name, subj5Name, subj6Name];
const alignedValues = [aligned1, aligned2, aligned3, aligned4, aligned5, aligned6];
const bandValues = [band1, band2, band3, band4, band5, band6];
let advancedMode = false;


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
            advancedCalculations(subNum);
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
    advModeToggle[0].addEventListener("click", () => {  
        if (advancedMode == true) {
            for (let i=0; i <= 5; i++) {
                if (alignedDisplay[i] != undefined) alignedDisplay[i].style.display = "none";
                if (scaledDisplay[i] != undefined) scaledDisplay[i].style.display = "none";
                if (bandDisplay[i] != undefined) bandDisplay[i].style.display = "none";
                if (atarEquivDisplay[i] != undefined) atarEquivDisplay[i].style.display = "none";
                }
            advancedMode = false;
        } else if (advancedMode == false) {
            for (let i=0; i <= 5; i++) {
            if (alignedDisplay[i] != undefined) alignedDisplay[i].style.display = "block";
            if (scaledDisplay[i] != undefined) scaledDisplay[i].style.display = "block";
            if (bandDisplay[i] != undefined) bandDisplay[i].style.display = "block";
            if (atarEquivDisplay[i] != undefined) atarEquivDisplay[i].style.display = "block";
            }
            advancedMode = true;
        } 
        
    })

    addKeyListener();
    addSelectListener();
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
        alignedValues[i-1][0].innerHTML = "Aligned: 0";
    }  else if (scaledDisplay[i-1].innerHTML.includes(NaN)) {
        scaledDisplay[i-1][0].innerHTML = "Scaled: 0";
    } else if (atarEquivDisplay[i-1].innerHTML.includes(NaN)) {
        atarEquivDisplay[i-1].innerHTML = "Atar Equivalent: 0";
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
    advancedCalculations(i);
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
    
    storedSubjects[`sub${subNum}`] = subName;
    localStorage.setItem(`storedSubjects`, JSON.stringify(storedSubjects));
    refreshSubjects();
    getWeightedAverage(subNum);
    advancedCalculations(subNum);
    nanRemover(subNum);
    console.log()
}

function advancedCalculations(subNum) {
    subName = document.getElementById(`sub${subNum}`).value;
    storedWAM = JSON.parse(localStorage.getItem("storedWAM"));
    subWAM = storedWAM[`sub${subNum}`];
    refreshSubjects();    
    // note: all aligned -> scaled data is from 2023 uac scaling report.

    if (subName == "mathsstd") {
        //2023 data
        if (subWAM >= 90) aligned[subName] = subWAM;
        else if (subWAM >= 74) aligned[subName] = (3*subWAM + 178)/5;
        else if (subWAM >= 54) aligned[subName] = subWAM/2 + 43;
        else if (subWAM >= 35) aligned[subName] = (9*subWAM + 705)/17;
        else aligned[subName] = 59*subWAM/32;

        if (aligned[subName]/2 >= 31.5) scaled[subName] = 1.76757*aligned[subName]/2 - 41.9784;
        else scaled[subName] = 0.434921*aligned[subName]/2;
    
    } else if (subName == "mathsadv") {
        //2023 data, raw to aligned
        if (subWAM >= 79) aligned[subName] = (subWAM + 101)/2;
        else if (subWAM >= 60) aligned[subName] = 8*subWAM/15 + 48;
        else if (subWAM >= 41) aligned[subName] = (subWAM + 99)/2;
        else if (subWAM >= 22) aligned[subName] = subWAM/2 + 49;
        else if (subWAM >= 9.4) aligned[subName] = 7*subWAM/9 + 128/3;
        else aligned[subName] = 5*subWAM;

        if (aligned[subName]/2 >= 35) scaled[subName] = 1.64667*aligned[subName]/2 - 32.3333;
        else scaled[subName] = 0.722857*aligned[subName]/2;
        
    } else if (subName == "mathsext1") {
        //2023 data
        if (subWAM >= 64.29) aligned[subName] = 0.254615*subWAM + 73.6308;
        else if (subWAM >= 45.71) aligned[subName] = 1.04987*subWAM + 22.0105;
        else if (subWAM >= 20) aligned[subName] = 0.79328*subWAM + 33.8656;
        else aligned[subName] = 2.45184*subWAM + 0.469352;

        if (aligned[subName]/2 >= 34) scaled[subName] = 0.825*aligned[subName]/2 + 8.75;
        else scaled[subName] = 1.08235*aligned[subName]/2;
        
    } else if (subName == "mathsext2") {
        //2023 data
        if (subWAM >= 66) aligned[subName] = 5*subWAM/17 + 1200/17;
        else if (subWAM >= 42) aligned[subName] = 10*subWAM/11 + 351/11;
        else if (subWAM >= 20) aligned[subName] = 9*subWAM/10 + 161/5;
        else aligned[subName] = 5*subWAM/2;

        if (aligned[subName]/2 >= 38) scaled[subName] = 0.617391*aligned[subName]/2 + 19.4391;
        else scaled[subName] = 1.12895*aligned[subName]/2;
            
    } else if (subName == "biology") {
            //2022 data
        if (subWAM >= 78) aligned[subName] = subWAM/2 + 51;
        else if (subWAM >= 65) aligned[subName] = 3*subWAM/4 + 125/4;
        else if (subWAM >= 52) aligned[subName] = 3*subWAM/4 + 125/4;
        else if (subWAM >= 38) aligned[subName] = 5*subWAM/7 + 230/7;
        else aligned[subName] = 30*subWAM/19;

        if (aligned[subName]/2 >= 33) scaled[subName] = 2.00625*aligned[subName]/2 - 48.3063;
        else scaled[subName] = 0.542424*aligned[subName]/2;

    } else if (subName == "chemistry") {
        //2023 data
        if (subWAM >= 85) aligned[subName] = subWAM/2 + 95/2;
        else if (subWAM >= 72) aligned[subName] = 5*subWAM/7 + 200/7;
        else if (subWAM >= 55) aligned[subName] = 3*subWAM/5 + 37;
        else aligned[subName] = 14*subWAM/11;

        if (aligned[subName]/2 >= 32.5) scaled[subName] = 1.45143*aligned[subName]/2 - 22.5714;
        else scaled[subName] = 0.756923*aligned[subName]/2;
    
    } else if (subName == "physics") {
        //2022 data
        if (subWAM >= 89) aligned[subName] = 7*subWAM/8 + 97/8;
        else if (subWAM >= 74) aligned[subName] = 2*subWAM/3 + 92/3;
        else if (subWAM >= 54) aligned[subName] = subWAM/2 + 43;
        else aligned[subName] = 35*subWAM/27;

        if (aligned[subName]/2 >= 33.5) scaled[subName] = 1.69032*aligned[subName]/2 - 32.8258;
        else scaled[subName] = 0.710448*aligned[subName]/2;
    
    } else if (subName == "englishstd") {
        //2022 data
        if (subWAM >= 91.5) aligned[subName] = 4*subWAM/3 - 32;
        else if (subWAM >= 75.5) aligned[subName] = 0.625*subWAM + 32.8125;
        else if (subWAM >= 60) aligned[subName] = 0.645161*subWAM + 31.2903;
        else aligned[subName] = 7*subWAM/6;

        if (aligned[subName]/2 >= 32.5) scaled[subName] = 2.19333*aligned[subName]/2 - 57.4833;
        else scaled[subName] = 0.424615*aligned[subName]/2;

    } else if (subName == "englishadv") {
        //2023 data
        if (subWAM >= 85) aligned[subName] = 0.615385*subWAM + 37.7692;
        else if (subWAM >= 67) aligned[subName] = 0.580645*subWAM + 41.0968;
        else aligned[subName] = 80*subWAM/67;

        if (aligned[subName]/2 >= 33.5) scaled[subName] = 2.14286*aligned[subName]/2 - 56.0714;
        else scaled[subName] = 0.705128*aligned[subName]/2;
            
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
        //2023 data
        if (subWAM >= 86.2) aligned[subName] = 0.761905*subWAM + 24.3333;
        else if (subWAM >= 67.4) aligned[subName] = 0.533333*subWAM + 44.2;
        else aligned[subName] = 1.18694*subWAM;

        if (aligned[subName]/2 >= 35) scaled[subName] = 1.72414*aligned[subName]/2 - 35.3448;
        else scaled[subName] = 5*aligned[subName]/2/7;
         
    } else if (subName == "business") {
        //2023 data (and slight but calculated assumption from 2022 data for band 5)
        if (subWAM >= 84.5) aligned[subName] = 0.608696*subWAM + 38.5652;
        else if (subWAM >= 71) aligned[subName] = 0.740741*subWAM + 27.4074;
        else aligned[subName] = 80*subWAM/71;

        if (aligned[subName]/2 >= 33) scaled[subName] = 2.12121*aligned[subName]/2 - 55.4;
        else scaled[subName] = 0.442424*aligned[subName]/2;
        
    } else if (subName == "legal") {
        //2023 data
        if (subWAM >= 84) aligned[subName] = 5*subWAM/8 + 75/2;
        else if (subWAM >= 71) aligned[subName] = 3*subWAM/4 + 107/4;
        else aligned[subName] = 80*subWAM/71;

        if (aligned[subName]/2 >= 33.5) scaled[subName] = 2.1225*aligned[subName]/2 - 55.1875;
        else scaled[subName] = 0.477612*aligned[subName]/2;
    
    } else if (subName == "modernhis") {
        //2023 data
        if (subWAM >= 79.3) aligned[subName] = 4*subWAM/9 + 54.7778;
        else if (subWAM >= 66.3) aligned[subName] = 0.769231*subWAM + 29;
        else aligned[subName] = 1.17483*subWAM;

        if (aligned[subName]/2 >= 32.5) scaled[subName] = 1.94706*aligned[subName]/2 - 46.3794;
        else scaled[subName] = 0.52*aligned[subName]/2;
    
    } else if (subName == "ancienthis") {
        //2023 data
        if (subWAM >= 84.5) aligned[subName] = 0.645161*subWAM + 35.4839;
        else if (subWAM >= 69.5) aligned[subName] = 2*subWAM/3 + 33.6667;
        else aligned[subName] = 1.15108*subWAM;
    
        if (aligned[subName]/2 >= 31.5) scaled[subName] = 1.91892*aligned[subName]/2 - 46.4459;
        else scaled[subName] = 0.444444*aligned[subName]/2;

    } else if (subName == "sdd") {
        //2023 data
        if (subWAM >= 85.6) aligned[subName] = 9*subWAM/13 + 400/13;
        else if (subWAM >= 71) aligned[subName] = 0.864932*subWAM + 31.3699;
        else aligned[subName] = 71*subWAM/80;
        
        if (aligned[subName]/2 >= 33) scaled[subName] = 1.93939*aligned[subName]/2 - 46;
        else scaled[subName] = 6*aligned[subName]/2/11;

    } else if (subName == "engineering") {
        //2022 data (low data, thus mildly inaccurate.)
        if (subWAM >= 78.9) aligned[subName] = (9*subWAM + 1000)/19;
        else aligned[subName] = 1.14068*subWAM;
    
        if (aligned[subName]/2 >= 34) scaled[subName] = 1.87097*aligned[subName]/2 - 44.1129;
        else scaled[subName] = 0.573529*aligned[subName]/2
    }


    nanRemover(subNum);
    displayAligned(subNum, subName);
    displayBand(subNum, subName);
    displayScaled(subNum, subName);
    
    console.log("normal atar")
    calculateAgg();
    console.log("atar is: " + atar)

    console.log("below is displaying equiv")
    displayEquivalent(subNum, subName);
}

function displayAligned(subNum, subName) {
    subjectHTML = document.getElementsByClassName("aligned " + subNum);
    subjectHTML[0].innerHTML = "Aligned: " + Math.round(aligned[subName]);
}

function displayBand(subNum, subName) {
    if (aligned[subName] >= 90) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 6";
    else if (aligned[subName] >= 80) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 5";
    else if (aligned[subName] >= 70) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 4";
    else if (aligned[subName] >= 60) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 3";
    else if (aligned[subName] >= 50) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 2";
    else if (aligned[subName] > 0) document.getElementsByClassName(`band ${subNum}`)[0].innerHTML = "Band 1";
}

function displayScaled(subNum, subName) {
    scaledHTML = document.getElementsByClassName("scaled " + subNum);
    scaledHTML[0].innerHTML = "Scaled: " + 2*Math.round(scaled[subName]);
}

function displayEquivalent(subNum, subName) {
    let atarequiv = 0;
    agg = 10*scaled[subName];
    equivalentHTML = document.getElementsByClassName("equivalent " + subNum);

    //atar >= 99
    if (agg >= 449.5) atarequiv = 98.8913 + (1.83005 * 10**-8) * Math.sqrt((1.09287 * 10**14) * agg - (4.90888 * 10**16));
    //atar >= 90
    else if (agg >= 370) atarequiv = 93.091 - 1.61884e-12 * Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3) + 1.44419e13 / Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3);
    //atar >= 75
    else if (agg >= 287.4) atarequiv = 72.0002 - 0.000360563 * Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3) + 3.46032e6 / Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3);
    //atar >= 60
    else if (agg >= 212.5) atarequiv = 100 + 7.73207e-7 * Math.pow(2.84822e7 * Math.sqrt(8.11233e28 * agg**2 - 6.82898e31 * agg - 6.5677e30) - 8.11233e21 * agg + 3.41449e24, 1/3) + 1.75353e10 / Math.pow(2.84822e7 * Math.sqrt(8.11233e28 * agg**2 - 6.82898e31 * agg - 6.5677e30) - 8.11233e21 * agg + 3.41449e24, 1/3);
    //60 > atar >= 0
    else atarequiv = 63.3491 + 0.000262982 * Math.pow(829810 * Math.sqrt(1.07591e16 * agg**2 - 4.92512e18 * agg - 2.16206e19) - 8.60731e13 * agg + 1.97005e16, 1/3) + 1.94249e7 / Math.pow(829810 * Math.sqrt(1.07591e16 * agg**2 - 4.92512e18 * agg - 2.16206e19) - 8.60731e13 * agg + 1.97005e16, 1/3);

    if (atarequiv > 99.95) atarequiv = 99.95;

    equivalentHTML[0].innerHTML = "Atar Equivalent: " + (Math.round(atarequiv / 0.05) * 0.05).toFixed(2);
}

function calculateAtar(agg) {
    let atar = 0;
    //atar >= 99
    console.log("new calculate atar")
    console.log("aggregate: " + agg)
    if (agg >= 449.5) {
        console.log("big agg")
        atar = 98.8913 + (1.83005 * 10**-8) * Math.sqrt((1.09287 * 10**14) * agg - (4.90888 * 10**16))
    }
    //atar >= 90
    else if (agg >= 370) atar = 93.091 - 1.61884e-12 * Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3) + 1.44419e13 / Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3);
    //atar >= 75
    else if (agg >= 287.4) atar = 72.0002 - 0.000360563 * Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3) + 3.46032e6 / Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3);
    //atar >= 60
    else if (agg >= 212.5) atar = 100 + 7.73207e-7 * Math.pow(2.84822e7 * Math.sqrt(8.11233e28 * agg**2 - 6.82898e31 * agg - 6.5677e30) - 8.11233e21 * agg + 3.41449e24, 1/3) + 1.75353e10 / Math.pow(2.84822e7 * Math.sqrt(8.11233e28 * agg**2 - 6.82898e31 * agg - 6.5677e30) - 8.11233e21 * agg + 3.41449e24, 1/3);
    //60 > atar >= 0
    else atar = 63.3491 + 0.000262982 * Math.pow(829810 * Math.sqrt(1.07591e16 * agg**2 - 4.92512e18 * agg - 2.16206e19) - 8.60731e13 * agg + 1.97005e16, 1/3) + 1.94249e7 / Math.pow(829810 * Math.sqrt(1.07591e16 * agg**2 - 4.92512e18 * agg - 2.16206e19) - 8.60731e13 * agg + 1.97005e16, 1/3);

    if (atar > 99.95) atar = 99.95;

    return atar
}

function calculateAgg() {

    scaledSorted = Object.fromEntries(
        Object.entries(scaled).sort(([keyA, valueA], [keyB , valueB]) => valueB - valueA));
        
    let aggregate = 0;
    let countedUnits = 0;

    

    for (sub in scaledSorted) {
        if (countedUnits == 10 || countedUnits == 11) break;
        if (sub == "englishadv") {
            countedUnits += 2;
            aggregate += 2*scaled["englishadv"];
        } else if (sub == "englishstd") {
            countedUnits += 2;
            aggregate += 2*scaled["englishstd"];
        }
        else if (sub == "mathsext1" && !"mathsext2" in scaledSorted) {
            countedUnits += 1;
            aggregate += scaled[sub];}
        else if (sub == "englishext1") {
            countedUnits += 1;
            aggregate += scaled[sub];}
        else if (sub == "englishext2") {
            countedUnits += 1;
            aggregate += scaled[sub];}
        else {
            countedUnits += 2;
            aggregate += 2*scaled[sub];}
    }

    atar = calculateAtar(aggregate);
    atarDisplay.innerHTML = "Atar: " + (Math.round(atar / 0.05) * 0.05).toFixed(2);
    console.log("calculated atar is: " + atar)

}

function refreshSubjects() {
    const allSubjects = document.querySelectorAll("select");
    let acceptedSubjects = []
    for (subject in allSubjects) {
        acceptedSubjects += allSubjects[subject].value;
    }

    for (sub in scaled) {
        if (!acceptedSubjects.includes(sub)) delete scaled[sub];
    }
}

