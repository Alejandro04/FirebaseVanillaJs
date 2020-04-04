// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDr0Ir--93cprxKYdwg7QREP1__YoSsDQI",
  authDomain: "chat-48efe.firebaseapp.com",
  projectId: "chat-48efe",
});

var db = firebase.firestore();

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

      document.getElementById('name').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('date').value = ''
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}

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
      <td>${doc.data().date}</td>
  </tr>
      `
  });
});