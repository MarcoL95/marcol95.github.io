//Event Listeners
document.querySelector('#recipe-form').addEventListener('submit', findRecipes);

//Functions

//Fetch recipes based on ingredient from user input
function findRecipes(event) {
    event.preventDefault();

    document.querySelector('#recipes').innerHTML = "";

    let ingredient = document.querySelector('#ingredient').value.trim();

    //Validate input
    if (!ingredient) {
        alert("Please enter an ingredient.");
        return;
    }

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (!data.meals) {
                document.querySelector('#recipes').innerHTML = "<p>No recipes found.</p>";
                return;
            }
            data.meals.forEach(meal => {
                getMealDetails(meal.idMeal);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

//Fetch meal details by ID
function getMealDetails(mealId) {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let meal = data.meals[0];

            let ingredientsList = "";

            for (let i = 1; i <= 20; i++) {
                let ingredient = meal["strIngredient" + i];
                let measure = meal["strMeasure" + i];

                if (ingredient && ingredient.trim() !== "") {
                    ingredientsList += `<li>${measure} ${ingredient}</li>`;
                }
            }

            let recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            recipeDiv.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    ${ingredientsList}
                </ul>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
            `;

            document.querySelector('#recipes').appendChild(recipeDiv);
        })
        .catch(error => console.error('Error fetching data:', error));
}