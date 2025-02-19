"use client";
import Auth from ".//components/auth.js";
import RecipeForm from ".//components/RecipeForm.js";
import RandomRecipe from "./components/RandomRecipeButton.js";

import {useEffect, useState} from "react";
import { db } from "/lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testdata"));
        const recipeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
      }));
      setRecipes(recipeList);        
      } catch(error){
        console.error("Error getting documents: ", error);
      }
    };
  
    fetchRecipes();
  }, []);

  return (

    
    <div className="flex  items-center justify-center h-screen">
      <Auth/>
      <RecipeForm/>
      <RandomRecipe/>
    </div>

      
  )

}


