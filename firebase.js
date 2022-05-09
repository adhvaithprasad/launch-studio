var config = {
  apiKey: "AIzaSyA17yiXJ1BO3yvPd0JIfUgSj4WfRNTGTWw",
  authDomain: "krios-studio.firebaseapp.com",
  databaseURL: "https://krios-studio-default-rtdb.firebaseio.com",
  projectId: "krios-studio",
  storageBucket: "krios-studio.appspot.com",
  messagingSenderId: "106933948741",
  appId: "1:106933948741:web:75f91a5f0e222f2c38ae2c",
  measurementId: "G-MQVQ7YDZX3"
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    // document.getElementById("login_div").style.display = "none";
  const user = firebase.auth().currentUser;
if (user !== null) {
  user.providerData.forEach((profile) => {

document.cookie="avatar="+profile.photoURL;
    document.getElementById("user-img").src=profile.photoURL;
const options = {method: 'GET', headers: {'content-type': 'application/json'}};

fetch('https://api.github.com/user/'+profile.uid, options)
  .then(response => response.json())
  .then(response => n(response.login))
  .catch(err => console.error(err));
});

function m(children){
for (var i = 0; i < children.length; i++){
    var m = children[i];
  document.getElementById("languages").innerHTML += `<div class="div" onclick="doCloneAndStuff('${m.html_url}','${m.full_name}')" id="${m.full_name}"><div><img src="${getCookie("avatar")}"/>${m.full_name}</div></div>`
}
}

function n(login){
const options1 = {method: 'GET', headers: {'content-type': 'application/json'}};
  
fetch('https://api.github.com/users/'+login+"/repos", options1)
  .then(response => response.json())
  .then(response => m(response))
  .catch(err => console.error(err));  
}


}


    
  } 
 else {
    // No user is signed in.
    
 var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;
      // ...
    }

    // The signed-in user info.
    var user = result.user;
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  
  }
});