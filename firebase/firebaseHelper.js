import { collection, addDoc } from "firebase/firestore";
import { database } from "./FirebaseSetup";

// Add a new document with a generated id.
export async function writeToDB(data, collectionName) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

//Updates an existing document in a specified collection in Firestore.
export async function updateToDB(key, collectionName, updatedData) {
  try {
    await updateDoc(doc(database, collectionName, key), updatedData);
  } catch (err) {
    console.error("Error updating document: ", err);
  }
}

//Deletes a document from a specified collection in Firestore.
export async function deleteFromDb(key, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, key));
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}
