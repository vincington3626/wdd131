function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('\n');
}

function ratingTemplate(rating) {
	let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        }
        else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

	html += `</span>`;
	return html;
}

function recipeTemplate (recipe) {
    return `<section class="recipe">
                <img src="${recipe.image}" alt="">
                <div class="info">
                    <ul class="recipe-tags">
                        ${tagsTemplate(recipe.tags)}
                    </ul>
                    <h2><a href="#">${recipe.name}</a></h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="recipe-description">${recipe.description}</p>
                </div>
            </section>`
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector('#content');
    const listOfRecipes = recipeList.map(recipeTemplate)
    outputElement.insertAdjacentHTML("beforeend", listOfRecipes);
}

function init() {
    const recipe = getRandomListEntry(recipes)
    renderRecipes([recipe]);
  }

function filterRecipes(query) {
    function searchRecipes(recipe) {
        return recipe.name.toLowerCase().includes(query) || 
        recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query)) || 
        recipe.description.toLowerCase().includes(query) || 
        recipe.tags.find(tag => tag.toLowerCase().includes(query)); 
    }
    return recipes.filter(searchRecipes);
}

function sortNames(a,b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
   return 0;
  }

init();

document.querySelector("#search-bar").addEventListener("submit", function(event) {
    event.preventDefault();
    let searchQuery = event.target.search.value.toLowerCase();
    event.target.search.value = "";
    document.querySelector("#content").innerHTML = "";
    renderRecipes(filterRecipes(searchQuery).sort(sortNames));
});
