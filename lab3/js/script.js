//Event Listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event){
    validateForm(event);
});
document.querySelector("#password").addEventListener("focus", passwordSuggestion);


//Functions

//display city from web api after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (!data.city){ 
        document.querySelector("#zipError").innerHTML = " Zip code not found ";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        return;
    }

    document.querySelector("#zipError").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

//Displaying counties from Web API based on the two-letter abbreviation of the state
async function displayCounties(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i = 0; i < data.length; i++){
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

//Checking whether the username is available
async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available){
        usernameError.innerHTML = "Username is available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username is taken";
        usernameError.style.color = "red";
    }
}

//validating form data
function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    if (username.length == 0){
        document.querySelector("#usernameError").innerHTML = "Username Required";
        isValid = false;
    }

    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters";
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match";
        isValid = false;
    }

    if (!isValid){  
        e.preventDefault(); 
    }} 

//suggesting a password when the user clicks on the password field
async function passwordSuggestion(){
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#suggestedPwd").innerHTML = `Suggested Password: ${data.password}`;
}

//get all US states two letter abbreviations from web api and populate the state dropdown
async function populateStates(){
    let url = `https://csumb.space/api/allStatesAPI.php`; 
    let response = await fetch(url);
    let data = await response.json();
    let stateDropdown = document.querySelector("#state");

    stateDropdown.innerHTML = "<option> Select State </option>";
    for (let i = 0; i < data.length; i++){
        stateDropdown.innerHTML += `<option value="${data[i].usps}"> ${data[i].state} </option>`;
    }

}

populateStates();
