import {recipes} from '../data/recipes.js'


export class App {
    constructor() {
        this.$recipesWrapper = document.querySelector('.recipt-contenaire')
        this.recipesApi = new recipeApi(recipes)
    }

    async main() {
        const recipes = this.recipesApi._url

        recipes.forEach(recipe => {
            const Template = new recipeCard(recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())        
        })    
    }
}

const app = new App()
app.main()