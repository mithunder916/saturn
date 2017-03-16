import firebase from 'firebase';
import { setFirebase } from './ducks/firebase_ducks.jsx';
import { setUser, clearUser } from './ducks/user_ducks.jsx';
import store from './store.jsx';

const config = {
    apiKey: "AIzaSyBf4hOY6pe_wWtVp8Fg6afP3Gcjji9cxMk",
    authDomain: "saturn-dd6d1.firebaseapp.com",
    databaseURL: "https://saturn-dd6d1.firebaseio.com",
    storageBucket: "saturn-dd6d1.appspot.com",
    messagingSenderId: "979801854053"
}

firebase.initializeApp(config);

export const onAppEnter = () => {
  // writes over test string - only works if user is logged in
  firebase.database().ref("TEST").set("HAIGUYZ")
  store.dispatch(setFirebase(firebase))

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(setUser(user))
  } else {
    store.dispatch(clearUser())
  }
});
}
