import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,  
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADg4OgozfMj7c3CW_417vPv6RfNLtI67o",
  authDomain: "signinandsignout-36b8c.firebaseapp.com",
  projectId: "signinandsignout-36b8c",
  storageBucket: "signinandsignout-36b8c.firebasestorage.app",
  messagingSenderId: "699474630720",
  appId: "1:699474630720:web:ed8ae349f7f1a2e980e7a5",
  measurementId: "G-GBDJH36QVV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const form = document.getElementById("registerForm");
const statusMsg = document.getElementById("statusMsg");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!fullname || !email || !password || !confirmPassword) {
    statusMsg.textContent = "Vui lòng điền đầy đủ thông tin!";
    statusMsg.style.color = "red";
    return;
  }

    document.querySelector('form').addEventListener('submit', function(event) {
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            event.preventDefault(); 
            alert('Please enter a valid email address.');
            emailInput.focus();
        }
    });


  if (password !== confirmPassword) {
    statusMsg.textContent = "Mật khẩu xác nhận không khớp!";
    statusMsg.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "users"), {
      fullname,
      email,
      password,
      createdAt: new Date()
    });

  form.reset();
  statusMsg.textContent = "Đăng ký thành công!";
  statusMsg.style.color = "green";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);

  } catch (error) {
    statusMsg.textContent = "Đăng ký thất bại: " + error.message;
    statusMsg.style.color = "red";
  }
});
