import {db, auth} from "/lib/firebase-config";
import {collection, getDocs} from "firebase/firestore";

export async function GET(req) {
    try {
        const { searchParams} = new URL(req.url)
        const uid = searchParams.get("uid"); 

        if (!uid) {
            return new Response(JSON.stringify({error: "User is not signed in"}), {status: 401});
        }

        const recipesRef = collection(db, "users", uid, "recipes");
        const querySnapshot = await getDocs(recipesRef);

        const recipes = querySnapshot.docs.map(doc =>{
            const recipeData = doc.data();
            return{
                id: doc.id,
                title: recipeData.title,
                ingredients: recipeData.ingredients
            };
        });

        if (recipes.length === 0) {
            return new Response(JSON.stringify({message: "No recipes found"}), {status: 404});
        }

        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

        return new Response(JSON.stringify({recipe: randomRecipe}), {
            headers: {"Content-Type": "application/json"},
            status: 200,
        });
        } catch (error) {
            console.error("Error getting documents: ", error);
            return new Response(JSON.stringify({error: "Error getting documents"}), {status: 500});
    }
}
