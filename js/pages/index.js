import {recipes} from '../../data/recipes.js'
import { allIngredients } from '../select.js';
import { allAppareils } from '../select.js';
import { allUstensils } from '../select.js';
import {custumSelect} from '../select.js';
import { tagsSearch } from '../select.js';
import { tableauValeurs } from '../select.js';
import { hasAllValues } from '../select.js';

const ulSelect = document.querySelectorAll('.mg-custom-select__list');
const totalRecipesLabel =document.querySelector('.filter-results');
const recipesContainer = document.querySelector('.recipt-contenaire');
const optionIngredient = document.getElementById('ingredients')
const optionAppareils = document.getElementById('appareils')
const optionUstensiles = document.getElementById('Ustensiles')
export let resultsSearch = ''

    
     export function displayTotalRecipes(total){
        totalRecipesLabel.textContent = total.length +' recettes';
    }


    export function displayRecipes(){
        recipes.forEach(recipe => {
            const Template = new recipeCard(recipe)
            recipesContainer.appendChild(Template.createRecipeCard())
            
        })
    }

    export function cleanRecipescontenair(){
        recipesContainer.innerHTML ='';
    }

    export function displayResults(res){
        cleanRecipescontenair()
        res.forEach(recipe => {
            const Template = new recipeCard(recipe)
            recipesContainer.appendChild(Template.createRecipeCard())
            
        })

    }

    export function clearSelect(){
        optionIngredient.innerHTML = ''
        optionUstensiles.innerHTML = ''
        optionAppareils.innerHTML = ''
        ulSelect.innerHTML = ''
    }
    
    function searchInput() {

        const mainContainer = document.querySelector('.main-container')
        const recipesContainerErreur = document.createElement('div')
        const clearSearch = document.querySelector('.clear-search')
        const searchIcon = document.querySelector('.submit')

        document.addEventListener('keyup', (event) => {
            const query = event.target.value.toLowerCase()
            ;
            if (query.length >= 3) {

                resultsSearch = recipes.filter(recipe => {
                    const hasMatchingIngredient = recipe.ingredients.some(ingredient =>
                        ingredient.ingredient.toLowerCase().includes(query)
                    )
            
                    const hasMatchingName = recipe.name.toLowerCase().includes(query);

                    const hasMatchingDescription = recipe.description.toLowerCase().includes(query);
            
                    return hasMatchingIngredient || hasMatchingName || hasMatchingDescription;
                    
                });
                
                
                displayTotalRecipes(resultsSearch)
                searchIcon.classList.add('submitactive')
                clearSearch.style.display = 'block'
                clearSelect()
                displayResults(resultsSearch)
                allIngredients(resultsSearch)
                allAppareils(resultsSearch)
                allUstensils(resultsSearch)
                
                custumSelect()
                
                if (resultsSearch.length === 0) {
                    
                    recipesContainerErreur.classList.add('recipes-container-erreur')
                    recipesContainerErreur.style.display = 'block';
                    recipesContainerErreur.classList.add('text-center')
                    recipesContainerErreur.textContent = ' Aucune recette ne contient ' + query + ' vous pouvez chercher tarte aux pommes , poisson, etc'
                    mainContainer.appendChild (recipesContainerErreur)
                }

                else if (resultsSearch.length > 0 && tableauValeurs.length > 0) {
                tagsSearch(tableauValeurs, resultsSearch)}

                else {
                    console.log('erreur');
                }
            } 
            
            

            else {
                searchIcon.classList.remove('submitactive')
                clearSearch.style.display = 'none'
                cleanRecipescontenair()
                displayRecipes(recipes)
                displayTotalRecipes(recipes)
                clearSelect()
                allIngredients(recipes)
                allAppareils(recipes)
                allUstensils(recipes)
                custumSelect()  
            } 
        })
    }

    searchInput()
    displayTotalRecipes(recipes)



