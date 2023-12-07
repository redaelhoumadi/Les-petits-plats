import {recipes} from '../../data/recipes.js'

function allIngredients(){
    const select = document.getElementById('ingredients')
  
  // Utilise la méthode .flat() pour aplatir le tableau de tableaux en un seul tableau
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
  
  
  
  const uniqueIngredients = [...new Set(allIngredients)];
  
  // Trier les ingrédients par ordre alphabétique
  const sortedIngredients = uniqueIngredients.sort((a, b) => a.localeCompare(b));
  
  // Affiche chaque ingrédient dans la console
  sortedIngredients.forEach((ingredient) => {
      const ingrediente = ingredient
      const option = document.createElement('option');
      option.innerHTML = ingrediente
      select.appendChild(option)
  });
  
  }
  
  function allAppareils(){
    const select = document.getElementById('appareils')
  
        // Extraction de tous les appareils de toutes les recettes
  const allAppliances = [...new Set(recipes.map(recipe => recipe.appliance))];
  const sortedallAppliances = allAppliances.sort((a, b) => a.localeCompare(b));
  
  sortedallAppliances.forEach((recipe) => {
    const Appareil = recipe
  
      const option = document.createElement('option');
      option.innerHTML = Appareil
      select.appendChild(option)
      
    }) 
    
  
  }
  
  function allUstensils(){
    const select = document.getElementById('Ustensiles')
  
        // Extraction de tous les appareils de toutes les recettes
        const allUstensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils))];
        const sortedallUstensilss = allUstensils.sort((a, b) => a.localeCompare(b));
  
  sortedallUstensilss.forEach((recipe) => {
    const Ustensilss = recipe
  
      const option = document.createElement('option');
      option.innerHTML = Ustensilss
      select.appendChild(option)
      
    }) 
    
  
  }
  


const recipesContainer = document.querySelector('.recipt-contenaire');
const totalRecipesLabel = document.querySelector('.filter-results');

function searchForm(){
    
    function displayTotalRecipes(){
        totalRecipesLabel.textContent = recipes.length +' recettes';
    }

    function cleanTotalRecipes(){
        totalRecipesLabel.textContent= '';
    }

    function displayRecipes(){
        recipes.forEach(recipe => {
            const Template = new recipeCard(recipe)
            recipesContainer.appendChild(Template.createRecipeCard())
            
        })
    }

    function cleanRecipescontenair(){
        recipesContainer.innerHTML ='';
    }
    
    function search() {

        const clearSearch = document.querySelector('.clear-search')
        const searchIcon = document.querySelector('.submit')

        document.addEventListener('keyup', (event) => {
            const query = event.target.value.toLowerCase()
            ;
            if (query.length >= 3) {
                const results = recipes.filter(recipe => {
                    const hasMatchingIngredient = recipe.ingredients.some(ingredient =>
                        ingredient.ingredient.toLowerCase().includes(query)
                    );
            
                    const hasMatchingName = recipe.name.toLowerCase().includes(query);

                    const hasMatchingDescription = recipe.description.toLowerCase().includes(query);
            
                    return hasMatchingIngredient || hasMatchingName || hasMatchingDescription;
                    
                });
                cleanTotalRecipes()
                totalRecipesLabel.textContent = results.length +' recettes';

                searchIcon.classList.add('submitactive')
                clearSearch.style.display = 'block'
                
                
                function displayResults(){
                    cleanRecipescontenair()
                    results.forEach(recipe => {
                        const Template = new recipeCard(recipe)
                        recipesContainer.appendChild(Template.createRecipeCard())
                        
                    })

                }
                displayResults()
            }
            
            else {
                searchIcon.classList.remove('submitactive')
                clearSearch.style.display = 'none'
                cleanRecipescontenair()
                displayRecipes(recipes)
                displayTotalRecipes(recipes)
                
            } 
        })
    }

    search()
    displayTotalRecipes()
}

searchForm()
