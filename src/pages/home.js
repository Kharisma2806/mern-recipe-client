import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedRecipesSet, setSavedRecipesSet] = useState(new Set());
  const [cookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        console.log("Fetched recipes:", response.data);
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );

        if (response.data && Array.isArray(response.data.savedRecipes)) {
          console.log("Fetched saved recipes:", response.data.savedRecipes);
          setSavedRecipes(response.data.savedRecipes);
          setSavedRecipesSet(
            new Set(response.data.savedRecipes.map((recipe) => recipe._id))
          );
        } else {
          console.error(
            "Invalid response format from the server:",
            response.data
          );
        }
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipe();
  }, [userID, cookies.access_token]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );

      if (response.data && Array.isArray(response.data.savedRecipes)) {
        // Fetch the saved recipes from the server
        const savedRecipesResponse = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );

        // Update the savedRecipes and savedRecipesSet states
        setSavedRecipes(savedRecipesResponse.data.savedRecipes);
        setSavedRecipesSet(
          new Set(
            savedRecipesResponse.data.savedRecipes.map((recipe) => recipe._id)
          )
        );
      } else {
        console.error("Invalid response format from the server:", response);
      }
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipesSet.has(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
