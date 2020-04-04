
init()
observer()
getAllData()

function init() {

  firebaseConfig = {
    apiKey: "AIzaSyDr0Ir--93cprxKYdwg7QREP1__YoSsDQI",
    authDomain: "chat-48efe.firebaseapp.com",
    databaseURL: "https://chat-48efe.firebaseio.com",
    projectId: "chat-48efe",
    storageBucket: "chat-48efe.appspot.com",
    messagingSenderId: "985978857548",
    appId: "1:985978857548:web:3c251f88cbf56ee450ece9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // GLOBAL
  db = firebase.firestore();
}

function observer() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("usuario activo: ", email)
      console.log(providerData)
      console.log("email verificado:", emailVerified)
      
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

function getAllData() {
  let table = document.getElementById('table')
  db.collection("users").onSnapshot((querySnapshot) => {
    table.innerHTML = ''
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      table.innerHTML += `
      <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().name}</td>
      <td>${doc.data().lastName}</td>
      <td>${doc.data().date} <i class="far fa-edit"></i></td>
      <td><button class="btn btn-warning" id="editBtn" onclick="editItem('${doc.id}', '${doc.data().name}', '${doc.data().lastName}', '${doc.data().date}')">X</button></td>
      <td><button class="btn btn-danger"id="deleteBtn" onclick="deleteItem('${doc.id}')">X</button></td>
  </tr>
      `
    });
  });
}

function save() {
  let name = document.getElementById('name').value
  let lastName = document.getElementById('lastName').value
  let date = document.getElementById('date').value

  db.collection("users").add({
    name: name,
    lastName: lastName,
    date: date
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      cleanInputs()
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function editItem(id, name, lastName, date) {
  document.getElementById('name').value = name
  document.getElementById('lastName').value = lastName
  document.getElementById('date').value = date

  let btn = document.getElementById('btn')
  btn.innerHTML = 'Actualizar'

  btn.onclick = function () {
    let name = document.getElementById('name').value
    let lastName = document.getElementById('lastName').value
    let date = document.getElementById('date').value

    let userRef = db.collection("users").doc(id);
    return userRef.update({
      name: name,
      lastName: lastName,
      date: date
    })
      .then(function () {
        console.log("Document successfully updated!");
        btn.innerHTML = 'Guardar'
        cleanInputs()
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}

function deleteItem(id) {
  db.collection("users").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

function cleanInputs() {
  document.getElementById('name').value = ''
  document.getElementById('lastName').value = ''
  document.getElementById('date').value = ''
}

function register() {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    verify()
    window.location.href="users.html"
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode)
    console.log(errorMessage)
    // ...
  });
}

function login() {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function (){
    window.location.href="users.html"
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode)
    console.log(errorMessage)
    // ...
  });
}

function logout() {
  firebase.auth().signOut()
  window.location.href="index.html"
}

function verify() {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    console.log("enviando email")
  }).catch(function (error) {
    console.log(error)
  });
}