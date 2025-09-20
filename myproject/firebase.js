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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();


function saveCartToFirebase(userId, cartData) {
    return db.collection('users').doc(userId).set({
        cart: cartData,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function loadCartFromFirebase(userId) {
    return db.collection('users').doc(userId).get()
        .then(doc => {
            if (doc.exists && doc.data().cart) {
                return doc.data().cart;
            }
            return [];
        });
}

auth.onAuthStateChanged(user => {
    if (user) {
        
        console.log('User is signed in:', user.uid);

        loadCartFromFirebase(user.uid)
            .then(firebaseCart => {
                cart = firebaseCart || [];
                updateCartCount();
            });
    } else {

        console.log('User is signed out');
    }
});

