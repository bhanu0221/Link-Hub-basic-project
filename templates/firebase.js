// Firebase Config from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


//  Handle Registration
const registerForm = document.getElementById("registerform");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
         const user = userCredential.user;

        //  Save additional data to Firestore
        return db.collection("users").doc(user.uid).set({
          name: name,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        alert(" Registration successful.");
        window.location.href = "login.html"; // Redirect to login page
      })
      .catch((error) => {
        alert(`error ${error.message}`);
      });
  });
}

//  Handle Login
const loginForm = document.getElementById("loginform");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert(" Login successful.");
        window.location.href = "home.html"; // Redirect to home page
      })
      .catch((error) => {
        alert(`error ${error.message}`);
      });
  });
}



//  Logout Button Handling (Only runs if on home page)
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut()
      .then(() => {
        alert(" Logged out successfully");
        window.location.href = "login.html"; // Redirect to login page
      })
      .catch((error) => {
        alert(`error ${error.message}`);
      });
  });
}
