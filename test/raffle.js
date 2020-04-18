// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBvWiYYKVdHOz6MV0ZgphGrSd8s0femyG4",
    authDomain: "raffle-soa.firebaseapp.com",
    databaseURL: "https://raffle-soa.firebaseio.com",
    projectId: "raffle-soa",
    storageBucket: "raffle-soa.appspot.com",
    messagingSenderId: "606168632980",
    appId: "1:606168632980:web:1485d89e54123655ab2e81"
};

firebase.initializeApp(config);
var db = firebase.database();
var raffleRef = db.ref('/raffle');
var arrayNames = [];

function getNames(){
    raffleRef.once("value", (data) => {
        arrayNames = Object.values(data.val());
        getWord();
    });
}

function getRandomNumber(min, max) {
    var step1 = max - min + 1;
    var step2 = Math.random() * step1;
    var result = Math.floor(step2) + min;
    return result;
}

function getWord() {
    if (arrayNames.length === 0) {
        document.getElementById('camper').textContent = "RAFFLE IS DONE";
    }
    let randomIndex = getRandomNumber(0, arrayNames.length-1);
    let chosenItem = arrayNames[randomIndex];
    arrayNames.splice(chosenItem, 1);
    console.log("Chosen: " + chosenItem.fullName);
    console.log(arrayNames);
    debugger;

    //
    // var randIndex = parseInt(Math.random() * arrayNames.length);
    // var chosenWord = arrayNames.splice(randIndex, 1);
    // var raffleName = chosenWord[0].fullName;
    // document.getElementById('camper').textContent = raffleName;
    // console.log(arrayNames);


}

$( document ).ready(function() {
    $( "#raffleButton" ).click(function() {
        getNames();
    });
});