class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipt-contenaire')
        this.recipesApi = new recipeApi('data/recipes.json')
    }

    async main() {
        const recipes = await this.recipesApi.getRecipes()

        recipes.forEach(recipe => {
            const Template = new recipeCard(recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())        
        })    
    }
}

const app = new App()
app.main()
