"use client"; 

import { useState } from "react";
import { addRecipe } from "./AddRecipe.js";

export default function RecipeForm() {
    console.log("RecipeForm component loaded");

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !ingredients) {
            console.error("Title and ingredients are required");
            return;
        }
        
        await addRecipe(title, ingredients);
        setTitle("");
        setIngredients("");
    };
    
    return(
        <div className="m-10 p-10 max-w-md mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add a Recipe</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Recipe Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Ingredients (comma-separated)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Add Recipe
                </button>
            </form>
        </div>
    );
}
