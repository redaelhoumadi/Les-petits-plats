class recipeCard{
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {
        const $wrapper = document.createElement('div');
        $wrapper.classList.add('recipe-card-wrapper')

        const recipeCard = `
        <article>
                <div class="recipts-img-duration">
                    <span class="duration">${this._recipe.time}min</span>
                    <img src="../assets/${this._recipe.image}">
                </div>
                <div class="recipt-container">
                    <h2 class="recipt-title">${this._recipe.name}</h2>
                    <h3 class="recipt-label">RECETTE</h3>
                    <p class="recipt-paragraphe">
                        ${this._recipe.description}
                    </p>
                    <h3 class="recipt-label">Ingrédients</h3>
                    <div class="ingredients-recipt grid gap-4">

                    ${this._recipe.ingredients.map(ingredient => {
                        if (ingredient.quantity && ingredient.unit) {
                            return `
                            <div class="ingredient">
                            <h4 class="ingredient-title">${ingredient.ingredient}</h4>
                            <h5 class="ingredient-quantity">${ingredient.quantity} ${ingredient.unit}</h5>
                        </div>
                                    `;
                        } else {
                            return `
                            <div class="ingredient">
                            <h4 class="ingredient-title">${ingredient.ingredient}</h4>
                        </div>
                                    `;
                        }
                    }).join('')} 
                        
                    </div>
                </div>
            </article>
        `
        $wrapper.innerHTML = recipeCard
        return $wrapper
    }
}