//Event Listeners
document.querySelector('#recipe-form').addEventListener('submit', findRecipes);

//Functions

function findRecipes(event) {
    event.preventDefault();
    let ingredient = document.querySelector('#ingredient').value.trim();
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}