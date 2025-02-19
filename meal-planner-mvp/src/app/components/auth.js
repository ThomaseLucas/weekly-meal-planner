"use client";

import { useState, useEffect } from "react";
import { auth, provider } from "/lib/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "/lib/firebase-config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function Auth() {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    console.log(apiKey);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log("UID: ", user.uid)
                

            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid
            }, {merge: true});

            console.log("Document written with ID: ", user.uid);

        } catch (error) {
            console.error(error);
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Meal Plan Test</h1>

            {user ? (
                <button onClick={signOut} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Sign Out</button>
            ) : (
                <button onClick={signIn} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
            )}
        </div>
    );
}