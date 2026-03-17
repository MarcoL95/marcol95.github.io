
//Global Variables
let score = 0;
let attempts = localStorage.getItem("total_attempts");

//Event Listeners

document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();

function displayQ4Choices() {
    let q4ChoicesArray = [" Maine ", " Rhode Island ", " Maryland ", " Delaware "];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id="${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label>`;
    }
}

//functions

function isFormValid(){
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}

function gradeQuiz() { 
    console.log("Grading quiz..");
    document.querySelector("#validationFdbk").innerHTML = "";
    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name='q4']:checked").value.trim();
    let q5Response = document.querySelector("#q5").value.toLowerCase();
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("input[name='q7']:checked").value;
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value;
    

    //Grading Question 1
    if (q1Response == "sacramento") {
        rightAnser(1);
    }
    else {
        wrongAnswer(1);
    }

        //Grading Question 2
    if (q2Response == "mo") {
        rightAnser(2);
    }
    else {
        wrongAnswer(2);
    }

    if (!document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked && document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked) {
        rightAnser(3);
    }
    else {
        wrongAnswer(3);
    }

    //Grading Question 4
    if (q4Response == "Rhode Island") {
        rightAnser(4);
    }
    else {
        wrongAnswer(4);
    }

    //Grading Question 5
    if (q5Response == "pacific ocean") {
        rightAnser(5);
    }
    else {
        wrongAnswer(5);
    }

    //Grading Question 6
    if (q6Response == "houston") {
        rightAnser(6);
    }
    else {
        wrongAnswer(6);
    }

    //Grading Question 7
    if (q7Response == "Denali") {
        rightAnser(7);
    }
    else {
        wrongAnswer(7);
    }

    //Grading Question 8
    if (document.querySelector("#Alaska").checked && document.querySelector("#Hawaii").checked && !document.querySelector("#Florida").checked && !document.querySelector("#Maine").checked) {
        rightAnser(8);
    }
    else {
        wrongAnswer(8);
    }

    //Grading Question 9
    if (q9Response == "5") {
        rightAnser(9);
    }
    else {
        wrongAnswer(9);
    }

    //Grading Question 10
    if (q10Response == "50") {
        rightAnser(10);
    }
    else {
        wrongAnswer(10);
    }

    if (score < 80) {
        document.querySelector("#totalScore").className = "text-info text-danger";
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

    }else {
        document.querySelector("#totalScore").className = "text-info text-success";
        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}<br>Congratulations!`;
    }
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);

}

function rightAnser(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark'>";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

// show default value
document.querySelector("#q10Value").textContent = document.querySelector("#q10").value;

// update when slider moves
document.querySelector("#q10").addEventListener("input", function() {
    document.querySelector("#q10Value").textContent = this.value;
});