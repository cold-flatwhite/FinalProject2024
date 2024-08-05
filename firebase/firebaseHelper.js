// firestoreFunctions.js
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { database } from "./FirebaseSetup";


// Add a new document with a generated id.
export async function writeToDB(data, collectionName) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

// Add a new document with a specified id.
export async function setToDB(data, collectionName, key) {
  try {
    await setDoc(doc(database, collectionName, key), data);
  } catch (err) {
    console.error("Error setting document: ", err);
  }
}

// Updates an existing document in a specified collection in Firestore.
export async function updateToDB(key, collectionName, updatedData) {
  try {
    await updateDoc(doc(database, collectionName, key), updatedData);
  } catch (err) {
    console.error("Error updating document: ", err);
  }
}

// Deletes a document from a specified collection in Firestore.
export async function deleteFromDb(key, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, key));
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}

// Gets a document from a specified collection in Firestore.
export async function getFromDB(key, collectionName) {
  try {
    const docRef = doc(database, collectionName, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.error("Error getting document: ", err);
    return null;
  }
}
