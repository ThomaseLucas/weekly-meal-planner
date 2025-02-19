import { db, auth } from "/lib/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addRecipe = async (title, ingredients) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("User is not signed in");
        return;
    }

    try {
        await addDoc(collection(db, "users", user.uid, "recipes"), {
            title: title,
            ingredients: ingredients,
            createdAt: new Date()
        });

        console.log("Recipe added for user: ", getDocs(collection(db, "users", user.uid, "name")));
    }
    catch (error) {
        console.error("Error adding document: ", error);
    }
};
