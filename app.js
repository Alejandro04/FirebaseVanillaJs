
init()

function init() {
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDr0Ir--93cprxKYdwg7QREP1__YoSsDQI",
    authDomain: "chat-48efe.firebaseapp.com",
    projectId: "chat-48efe",
  });

  // GLOBAL
  db = firebase.firestore();
  getAllData()
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
      <td><button class="btn btn-warning"id="btn" onclick="editItem('${doc.id}', '${doc.data().name}', '${doc.data().lastName}', '${doc.data().date}')">X</button></td>
      <td><button class="btn btn-danger"id="btn" onclick="deleteItem('${doc.id}')">X</button></td>
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

      document.getElementById('name').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('date').value = ''
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
        document.getElementById('name').value = ''
        document.getElementById('lastName').value = ''
        document.getElementById('date').value = ''
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
