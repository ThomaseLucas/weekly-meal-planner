"use client";

import { useState, useEffect } from "react";
import { auth } from "../../../lib/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function RandomRecipe(){

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("User: ", user.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);  


    const fetchRandomRecipe = async () => {
        const response = await fetch(`/api/add-to-calendar?uid=${user.uid}`);
        const data = await response.json();
        console.log("Random Recipe:", data);
    };
    
    return(
        <button className = "m-10"onClick={fetchRandomRecipe}>Get Random Recipe</button>   
    )
}

