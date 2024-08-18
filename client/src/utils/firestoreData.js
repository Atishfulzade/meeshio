import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firebase configuration

// Function to save or update user data
const saveUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData, { merge: true }); // Merge will update only the changed fields
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Function to fetch all user data
const fetchUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("User data:", userSnap.data());
      return userSnap.data(); // Return the user data for further use
    } else {
      console.log("No such document exists!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
const saveCartToFirebase = async (userId, cart) => {
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { cart });
  } catch (error) {
    console.error("Error saving cart to Firebase: ", error);
  }
};

const saveSavedCardsToFirebase = async (userId, savedCards) => {
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { savedCards });
  } catch (error) {
    console.error("Error saving saved cards to Firebase: ", error);
  }
};

export {
  fetchUserData,
  saveUserData,
  saveCartToFirebase,
  saveSavedCardsToFirebase,
};
