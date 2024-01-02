import {recipes} from '../../data/recipes.js'
import { allIngredients } from '../select.js';
import { allAppareils } from '../select.js';
import { allUstensils } from '../select.js';
import {custumSelect} from '../select.js';
import { resultsTags } from '../select.js';
import { tableauValeurs } from '../select.js';
import { tagsSearch } from '../select.js';

const ulSelect = document.querySelectorAll('.mg-custom-select__list');
const totalRecipesLabel =document.querySelector('.filter-results');
const recipesContainer = document.querySelector('.recipt-contenaire');
const optionIngredient = document.getElementById('ingredients')
const optionAppareils = document.getElementById('appareils')
const optionUstensiles = document.getElementById('Ustensiles')
export const inputSearchGlobal = document.querySelector('.search-input')
const filterResults = document.querySelector('.result-filters')
const selectedTags = document.getElementById('selected-tags')
const mainContainer = document.querySelector('.main-container')
const recipesContainerErreur = document.createElement('div')
const clearSearch = document.querySelector('.clear-search')
const searchIcon = document.querySelector('.submit')
export let query = ''
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

    function displayResultsFilters(){
        filterResults.style.display = 'flex';
        selectedTags.style.display = 'flex';
    }

    function search(recipeses){
                resultsSearch = recipeses.filter(recipe => {
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
                    filterResults.style.display = 'none';
                    selectedTags.style.display = 'none';
                }
                else{
                    displayResultsFilters()
                    recipesContainerErreur.style.display = 'none';
                }

            }
    
    function searchInput() {
        inputSearchGlobal.addEventListener('input', function() {
            query = inputSearchGlobal.value.toLowerCase();

            if (resultsTags.length > 0 && query.length >= 3){
                search(resultsTags)
                console.log("ca1")  
            }

            else if (query.length >= 3 && resultsTags.length === 0) {
                search(recipes)
                console.log("ca2")  
            }

            else if (resultsTags.length > 0 && query.length < 3){
                search(resultsTags)
                tagsSearch(tableauValeurs,recipes)
                console.log("ca3")  
            }

            else if (resultsTags.length > 0 && query.length === 0){
                tagsSearch(tableauValeurs,recipes)
                console.log("ca6")  
            }

            else if (resultsTags.length === 0 && query.length === 0){
                console.log("ca4")
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
                console.log("ca5")  
                
            } 
        })

        
    }

    searchInput()
    displayTotalRecipes(recipes)

    clearSearch.addEventListener('click', () => {
        event.preventDefault();
        inputSearchGlobal.value = '';
        query = ''
        clearSearch.style.display = 'none';

        if (resultsTags.length > 0){
        tagsSearch(tableauValeurs,recipes)}
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