const myChart = document.getElementById("myChart");
const graphSubjectSelector = document.getElementById("graphSubjectSelector");
const graphContainer = document.getElementsByClassName("graphContainer");
const lowerBound = document.getElementsByClassName("lowerbound")[0];
const upperBound = document.getElementsByClassName("upperbound")[0];
const generateGraphButton = document.querySelector(".generateGraph");
const inputs = document.querySelectorAll("input")

let rawMarksArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
let atarEquivArray = [];


generateGraphButton.addEventListener("click", (e) => {
    lowerBoundInt = parseInt(lowerBound.value);
    upperBoundInt = parseInt(upperBound.value);
    if (lowerBoundInt >= upperBoundInt) return alert("Please ensure the lower bound < upper bound.");
    if (lowerBoundInt < 0) return alert("Please ensure the lower bound >= 0");
    if (upperBoundInt > 100) return alert ("Please ensure the upper bound is <= 100");
    calculateXBounds(lowerBoundInt, upperBoundInt);

    let chartStatus = Chart.getChart("myChart")
    if (graphSubjectSelector.value == "") return alert ("Please select a subject before generating the graph.");
    if (chartStatus == undefined) return;
    
    chartStatus.destroy();
    generateDataPoints(graphSubjectSelector.value);
    
});


// [lowerBound, upperBound].forEach(function(element) {
//     element.addEventListener("input", (e) => {
//         let lowerBoundInt = parseInt(lowerBound.value);
//         let upperBoundInt = parseInt(upperBound.value);

//         if (lowerBoundInt >= upperBoundInt) return alert("Please ensure the lower bound < upper bound.");
//         if (lowerBoundInt < 0) return alert("Please ensure the lower bound >= 0");
//         if (upperBoundInt > 100) return alert ("Please ensure the upper bound is <= 100");
//         calculateXBounds(lowerBoundInt, upperBoundInt);

//         let chartStatus = Chart.getChart("myChart")
//         if (graphSubjectSelector.value == "") return alert ("Please select a subject before generating the graph.");
//         if (chartStatus == undefined) return;
            
//         chartStatus.destroy();
//         generateDataPoints(graphSubjectSelector.value);
//         }
//     )
// })


// graphSubjectSelector.addEventListener("change", (e) => {
//     let chartStatus = Chart.getChart("myChart")
//     if (graphSubjectSelector.value == "") return alert ("Please select a subject before generating the graph.");
//     if (chartStatus == undefined) return;
    
//     chartStatus.destroy();
//     generateDataPoints(graphSubjectSelector.value);
// })



function calculateXBounds(lower, upper) {
    rawMarksArray = [];
    atarEquivArray = [];
    for (i = lower; i <= upper; i++) {
        rawMarksArray.push(i);
    }
}

function generateChart(rawMarksArray, atarEquivArray) {
    new Chart(myChart, {
        type: 'line',
        data: {
          labels: rawMarksArray,
          datasets: [{
            label: 'atar equivalent',
            data: atarEquivArray,
            borderWidth: 1
          }]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
            x: {
                title: {
                    display: true,
                    text: "Raw Mark",
                    font: {
                        size: 15
                    }
                },
              beginAtZero: true
            },
            y: {
                min: Math.max(0, 100 - 1.125*(atarEquivArray[atarEquivArray.length - 1] - atarEquivArray[0])),
                title: {
                    display: true,
                    text: "Atar Equivalent",
                    font: {
                        size: 15
                    }
                },
              beginAtZero: true
            }
          }
        }
      });

}

function generateDataPoints(selectedSubject) {
    if (selectedSubject == undefined) return generateChart(rawMarksArray, atarEquivArray);
    generateXArray(selectedSubject);
    console.log(atarEquivArray)
    atarEquivArray.push(100);
    generateChart(rawMarksArray, atarEquivArray);
}

function generateXArray(selectedSubject) {
    for (let mark = 0; mark < rawMarksArray.length; mark++ ) {
        let MARK = rawToAlignedToScaled(selectedSubject, rawMarksArray[mark]);
        let atarEquiv = calculateAtar(10*MARK[1]);
        atarEquivArray.push(atarEquiv);
    }
}

function rawToAlignedToScaled(subName, rawMark) {
    if (subName == "") return [0, 0];
    if (subName == "mathsstd") {
        //2023 data
        if (rawMark >= 90) alignedMark = rawMark;
        else if (rawMark >= 74) alignedMark = (3*rawMark + 178)/5;
        else if (rawMark >= 54) alignedMark = rawMark/2 + 43;
        else if (rawMark >= 35) alignedMark = (9*rawMark + 705)/17;
        else alignedMark = 12*rawMark/7;

        if (alignedMark/2 >= 31.5) scaledMark = 1.76757*alignedMark/2 - 41.9784;
        else scaledMark = 0.434921*alignedMark/2;
    
    } else if (subName == "mathsadv") {
        //2023 data, raw to aligned
        if (rawMark >= 79) alignedMark = (10*rawMark + 1100)/21;
        else if (rawMark >= 60) alignedMark = 8*rawMark/15 + 48;
        else if (rawMark >= 41) alignedMark = (rawMark/2 + 99/2);
        else if (rawMark >= 22) alignedMark = rawMark/2 + 49;
        else if (rawMark >= 9.4) alignedMark = 7*rawMark/9 + 128/3;
        else alignedMark = 5*rawMark;

        if (alignedMark/2 >= 35) scaledMark = 1.64667*alignedMark/2 - 32.3333;
        else scaledMark = 0.722857*alignedMark/2;
        
    } else if (subName == "mathsext1") {
        //2023 data
        if (rawMark >= 64.29) alignedMark = 0.254615*rawMark + 73.6308;
        else if (rawMark >= 45.71) alignedMark = 1.04987*rawMark + 22.0105;
        else if (rawMark >= 20) alignedMark = 0.79328*rawMark + 33.8656;
        else alignedMark = 2.45184*rawMark + 0.469352;

        if (alignedMark/2 >= 34) scaledMark = 0.825*alignedMark/2 + 8.75;
        else scaledMark = 1.08235*alignedMark/2;
        
    } else if (subName == "mathsext2") {
        //2023 data
        if (rawMark >= 66) alignedMark = 5*rawMark/17 + 1200/17;
        else if (rawMark >= 42) alignedMark = 10*rawMark/11 + 351/11;
        else if (rawMark >= 20) alignedMark = 9*rawMark/10 + 161/5;
        else alignedMark = 5*rawMark/2;

        if (alignedMark/2 >= 38) scaledMark = 0.617391*alignedMark/2 + 19.4391;
        else scaledMark = 1.12895*alignedMark/2;
            
    } else if (subName == "biology") {
            //2022 data
        if (rawMark >= 78) alignedMark = rawMark/2 + 51;
        else if (rawMark >= 65) alignedMark = 3*rawMark/4 + 125/4;
        else if (rawMark >= 52) alignedMark = 3*rawMark/4 + 125/4;
        else if (rawMark >= 38) alignedMark = 5*rawMark/7 + 230/7;
        else alignedMark = 30*rawMark/19;

        if (alignedMark/2 >= 33) scaledMark = 2.00625*alignedMark/2 - 48.3063;
        else scaledMark = 0.542424*alignedMark/2;

    } else if (subName == "chemistry") {
        //2023 data
        if (rawMark >= 85) alignedMark = rawMark/2 + 95/2;
        else if (rawMark >= 72) alignedMark = 5*rawMark/7 + 200/7;
        else if (rawMark >= 55) alignedMark = 3*rawMark/5 + 37;
        else alignedMark = 14*rawMark/11;

        if (alignedMark/2 >= 32.5) scaledMark = 1.45143*alignedMark/2 - 22.5714;
        else scaledMark = 0.756923*alignedMark/2;
    
    } else if (subName == "physics") {
        //2022 data
        if (rawMark >= 89) alignedMark = 7*rawMark/8 + 97/8;
        else if (rawMark >= 74) alignedMark = 2*rawMark/3 + 92/3;
        else if (rawMark >= 54) alignedMark = rawMark/2 + 43;
        else alignedMark = 35*rawMark/27;

        if (alignedMark/2 >= 33.5) scaledMark = 1.69032*alignedMark/2 - 32.8258;
        else scaledMark = 0.710448*alignedMark/2;
    
    } else if (subName == "englishstd") {
        //2022 data
        if (rawMark >= 91.5) alignedMark = 4*rawMark/3 - 32;
        else if (rawMark >= 75.5) alignedMark = 0.625*rawMark + 32.8125;
        else if (rawMark >= 60) alignedMark = 0.645161*rawMark + 31.2903;
        else alignedMark = 7*rawMark/6;

        if (alignedMark/2 >= 32.5) scaledMark = 2.19333*alignedMark/2 - 57.4833;
        else scaledMark = 0.424615*alignedMark/2;

    } else if (subName == "englishadv") {
        //2023 data
        if (rawMark >= 85) alignedMark = 0.615385*rawMark + 37.7692;
        else if (rawMark >= 67) alignedMark = 0.580645*rawMark + 41.0968;
        else alignedMark = 80*rawMark/67;

        if ((alignedMark/2) >= 39) scaledMark = 2.14286*alignedMark/2 - 56.0714;
        else scaledMark = 0.705128*(alignedMark/2);
            
    } else if (subName == "englishext1") {
        //no data yet
        return [0, 0]
        if (rawMark >= 90) {

        } else if (rawMark >= 80) {

        } else if (rawMark >= 70) {
    
        } else if (rawMark >= 60) {

        } else if (rawMark >= 50) {

        } else {

              }
    } else if (subName == "englishext2") {
        //no data yet
        return [0, 0]
        if (rawMark >= 90) {
        } else if (rawMark >= 80) {

        } else if (rawMark >= 70) {
    
        } else if (rawMark >= 60) {

        } else if (rawMark >= 50) {

        } else {

              }
    } else if (subName == "economics") {
        //2023 data
        if (rawMark >= 86.2) alignedMark = 0.761905*rawMark + 24.3333;
        else if (rawMark >= 67.4) alignedMark = 0.533333*rawMark + 44.2;
        else alignedMark = 1.18694*rawMark;

        if (alignedMark/2 >= 35) scaledMark = 1.72414*alignedMark/2 - 35.3448;
        else scaledMark = 5*alignedMark/2/7;
         
    } else if (subName == "business") {
        //2023 data (and slight but calculated assumption from 2022 data for band 5)
        if (rawMark >= 84.5) alignedMark = 0.608696*rawMark + 38.5652;
        else if (rawMark >= 71) alignedMark = 0.740741*rawMark + 27.4074;
        else alignedMark = 80*rawMark/71;

        if (alignedMark/2 >= 33) scaledMark = 2.12121*alignedMark/2 - 55.4;
        else scaledMark = 0.442424*alignedMark/2;
        
    } else if (subName == "legal") {
        //2023 data
        if (rawMark >= 84) alignedMark = 5*rawMark/8 + 75/2;
        else if (rawMark >= 71) alignedMark = 3*rawMark/4 + 107/4;
        else alignedMark = 80*rawMark/71;

        if (alignedMark/2 >= 33.5) scaledMark = 2.1225*alignedMark/2 - 55.1875;
        else scaledMark = 0.477612*alignedMark/2;
    
    } else if (subName == "modernhis") {
        //2023 data
        if (rawMark >= 79.3) alignedMark = 4*rawMark/9 + 54.7778;
        else if (rawMark >= 66.3) alignedMark = 0.769231*rawMark + 29;
        else alignedMark = 1.206636501*rawMark;

        if (alignedMark/2 >= 32.5) scaledMark = 1.94706*alignedMark/2 - 46.3794;
        else scaledMark = 0.52*alignedMark/2;
    
    } else if (subName == "ancienthis") {
        //2023 data
        if (rawMark >= 84.5) alignedMark = 0.645161*rawMark + 35.4839;
        else if (rawMark >= 69.5) alignedMark = 2*rawMark/3 + 33.6667;
        else alignedMark = 1.15108*rawMark;
    
        if (alignedMark/2 >= 31.5) scaledMark = 1.91892*alignedMark/2 - 46.4459;
        else scaledMark = 0.444444*alignedMark/2;

    } else if (subName == "sdd") {
        //2023 data
        if (rawMark >= 85.6) alignedMark = 9*rawMark/13 + 400/13;
        else if (rawMark >= 71) alignedMark = 0.684932*rawMark + 31.3699;
        else alignedMark = 80*rawMark/71;
        
        if (alignedMark/2 >= 33) scaledMark = 1.93939*alignedMark/2 - 46;
        else scaledMark = 6*alignedMark/22;

    } else if (subName == "engineering") {
        //2022 data (low data, thus mildly inaccurate.)
        if (rawMark >= 78.9) alignedMark = (9*rawMark + 1000)/19;
        else alignedMark = 1.14068*rawMark;
    
        if (alignedMark/2 >= 34) scaledMark = 1.87097*alignedMark/2 - 44.1129;
        else scaledMark = 0.573529*alignedMark/2
    } else if (subName == "pdh") {
        //2023 data, raw to aligned
        if (rawMark >= 77) alignedMark = (10*rawMark + 1300)/23;
        else if (rawMark >= 65) alignedMark = (5*rawMark + 155)/6;
        else alignedMark = 16*rawMark/13;

        if (alignedMark/2 >= 33) scaledMark = 2.11852*alignedMark/2 - 55.8111;
        else scaledMark = 0.427273*alignedMark/2;   
    }

    return [alignedMark, scaledMark];
}

function calculateAtar(agg) {
    let atar = 0;
    //atar >= 99
    if (agg >= 449.5) atar = 98.8913 + (1.83005 * 10**-8) * Math.sqrt((1.09287 * 10**14) * agg - (4.90888 * 10**16));
    //atar >= 90
    else if (agg >= 370) atar = 93.091 - 1.61884e-12 * Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3) + 1.44419e13 / Math.pow(5.07093e17 * Math.sqrt(6.42859e36 * agg**2 - 5.04749e39 * agg + 9.93538e41) - 1.28572e36 * agg + 5.04749e38, 1/3);
    //atar >= 75
    else if (agg >= 287.4) atar = 72.0002 - 0.000360563 * Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3) + 3.46032e6 / Math.pow(230940 * Math.sqrt(1.19999e15 * agg**2 - 6.53742e17 * agg + 1.05611e20) - 7.99996e12 * agg + 2.17914e15, 1/3);
    //atar >= 60
    else if (agg >= 212.5) atar = 3.234188422495 * 10**-7 * agg**3 - 0.000346846 * agg**2 + 0.312585 * agg + 6.13456;
    //60 > atar >= 0
    else atar = 2.0421373632670e-6 * agg**3 - 0.00122525 * agg**2 + 0.450504 * agg;    

    return Math.min((Math.round(atar / 0.05) * 0.05).toFixed(2), 99.95);
}

generateDataPoints();