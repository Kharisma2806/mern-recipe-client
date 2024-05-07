import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );

        console.log("Response:", response.data); // Add this line to log the response data
        setSavedRecipes(response.data.savedRecipes);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchSavedRecipe();
  }, [userID, savedRecipes]);

  // Render loading indicator if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render saved recipes list if data is available
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useGetUserID } from "../hooks/useGetUserID";

// export const SavedRecipes = () => {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const userID = useGetUserID();

//   useEffect(() => {
//     const fetchSavedRecipe = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
//         );
//         setSavedRecipes(response.data.savedRecipes);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchSavedRecipe();
//   }, [userID]);

//   return (
//     <div>
//       <h1>Saved Recipes</h1>
//       <ul>
//         {savedRecipes.map((recipe) => (
//           <li key={recipe._id}>
//             <div>
//               <h2>{recipe.name}</h2>
//             </div>
//             <div className="instructions">
//               <p>{recipe.instructions}</p>
//             </div>
//             <img src={recipe.imageUrl} alt={recipe.name} />
//             <p>Cooking Time: {recipe.cookingTime} minutes</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
