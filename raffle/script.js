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

// CREATE REWIEW

var raffleForm = document.getElementById('raffleForm');
var fullName   = document.getElementById('fullName');
var hiddenId   = document.getElementById('hiddenId');

raffleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!fullName.value) return null;

    var id = hiddenId.value || Date.now();

    db.ref('raffle/' + id).set({
        fullName: fullName.value
    });

    fullName.value = '';
    hiddenId.value = '';
});

// READ REVEIWS

var raffle = document.getElementById('names');
var raffleRef = db.ref('/raffle');

raffleRef.on('child_added', (data) => {
    var li = document.createElement('li');
    li.id = data.key;
    li.innerHTML = reviewTemplate(data.val());
    raffle.appendChild(li);
});

raffleRef.on('child_changed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.innerHTML = reviewTemplate(data.val());
});

raffleRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
});

raffle.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode

    // UPDATE Name
    if (e.target.classList.contains('edit')) {
        fullName.value = reviewNode.querySelector('.fullName').innerText;
        hiddenId.value = reviewNode.id;
    }

    // DELETE Name
    if (e.target.classList.contains('delete')) {
        var id = reviewNode.id;
        db.ref('raffle/' + id).remove();
    }
});

function reviewTemplate({fullName}) {
    return `
    <div class='fullName'>${fullName}</div>
    <button class='delete'>Delete</button>
    <button class='edit'>Edit</button>
  `
}