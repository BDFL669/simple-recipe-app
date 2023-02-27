document.addEventListener('DOMContentLoaded', function() {
//Initial refs
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";



searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;
    if(userInp == 0){
        result.innerHTML = `<h3>Input field cannot be empty</h3>`;
    }
    else{
        fetch(url + userInp)
.then(response => response.json())
.then(data => {
    if(Object.keys(data.meals).length > 0){
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
    for (let i in myMeal) {
        let ingredient = '';
        let measure = '';
        if(i.startsWith("strIngredient") && myMeal[i]){
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count+=1;
            ingredients.push(`${measure} ${ingredient}`);

        }
    }   
    console.log(ingredients); 
    result.innerHTML = `<img src="${myMeal.strMealThumb}" alt="${myMeal.strMeal}">
    <div class="details">
    <h2>${myMeal.strMeal}</h2>
    <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
    <button id="hide-recipe">X</button>
    <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
    let ingredientCon = document.getElementById("ingredient-con");
    let parent = document.createElement("ul");
    let recipe = document.getElementById("recipe");
    let hideRecipe = document.getElementById("hide-recipe");
    let showRecipe = document.getElementById("show-recipe");

    ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
        
    });

    hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
    });
    showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
    });
    
};
if(Object.keys(data.meals).length == 100000000){
    const dataArray = data.meals;
    console.log(dataArray);
    let table = document.getElementById("table-results");
    dataArray.forEach((obj) => {
        // Create a new table row element using createElement
    const row = document.createElement('tr');

    // Create a new table cell element for the image using createElement
    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = obj.strMealThumb;
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    // Create a new table cell element for the text using createElement
    const textCell = document.createElement('td');
    textCell.innerText = obj.strMeal;
    row.appendChild(textCell);

    // Create a new table cell element for the button using createElement
    const buttonCell = document.createElement('td');
    const button = document.createElement('button');
    button.innerText = 'Details';
    button.id='view-more';
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    // Add the new table row to the table using appendChild
    table.appendChild(row);
    });
   console.log(table)

let viewMore = document.getElementById("view-more");
viewMore.addEventListener("click", () => {
    let count = 1;
    let ingredients = [];
for (let i in data.meals) {
    let ingredient = '';
    let measure = '';
    if(i.startsWith("strIngredient") && data.meals[i]){
        ingredient = data.meals[i];
        measure = data.meals[`strMeasure` + count];
        count+=1;
        ingredients.push(`${measure} ${ingredient}`);

    }
}
    result.innerHTML = `<img src="${data.meals.strMealThumb}" alt="${data.meals.strMeal}">
<div class="details">
<h2>${data.meals.strMeal}</h2>
<h4>${data.meals.strArea}</h4>
</div>
<div id="ingredient-con"></div>
<div id="recipe">
<button id="hide-recipe">X</button>
<pre id="instructions">${data.meals.strInstructions}</pre>
</div>
<button id="show-recipe">View Recipe</button>
`
let ingredientCon = document.getElementById("ingredient-con");
let parent = document.createElement("ul");
let recipe = document.getElementById("recipe");
let hideRecipe = document.getElementById("hide-recipe");
let showRecipe = document.getElementById("show-recipe");

ingredients.forEach((i) => {
    let child = document.createElement("li");
    child.innerText = i;
    parent.appendChild(child);
    ingredientCon.appendChild(parent);
    
});

hideRecipe.addEventListener("click", () => {
    recipe.style.display = "none";
});
showRecipe.addEventListener("click", () => {
    recipe.style.display = "block";
});
    });
    //add a button on click to each button
    
        
    


}



}).catch(err => {
result.innerHTML = `<h3>${err}</h3>`;
})

}
    
});
});

