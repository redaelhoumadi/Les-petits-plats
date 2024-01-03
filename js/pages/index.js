import { recipes } from '../../data/recipes.js'
import { allIngredients } from '../select.js';
import { allAppareils } from '../select.js';
import { allUstensils } from '../select.js';
import { custumSelect } from '../select.js';
import { resultsTags } from '../select.js';
import { tableauValeurs } from '../select.js';
import { tagsSearch } from '../select.js';


const ulSelect = document.querySelectorAll('.mg-custom-select__list');
const totalRecipesLabel = document.querySelector('.filter-results');
const recipesContainer = document.querySelector('.recipt-contenaire');
const optionIngredient = document.getElementById('ingredients');
const optionAppareils = document.getElementById('appareils');
const optionUstensiles = document.getElementById('Ustensiles');
export const inputSearchGlobal = document.querySelector('.search-input');
const filterResults = document.querySelector('.result-filters');
const selectedTags = document.getElementById('selected-tags');
const mainContainer = document.querySelector('.main-container');
const recipesContainerErreur = document.createElement('div');
const clearSearch = document.querySelector('.clear-search');
const searchIcon = document.querySelector('.submit');
export let query = '';
export let resultsSearch = '';

// Fonction pour afficher le nombre total de recettes
export function displayTotalRecipes(total) {
    totalRecipesLabel.textContent = total.length + ' recettes';
}

// Fonction pour afficher toutes les recettes
export function displayRecipes() {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const Template = new recipeCard(recipe);
        recipesContainer.appendChild(Template.createRecipeCard());
    }
}


// Fonction pour vider le conteneur des recettes
export function cleanRecipescontenair() {
    recipesContainer.innerHTML = '';
}

// Fonction pour afficher les résultats de la recherche
export function displayResults(res) {
    cleanRecipescontenair();
    res.forEach(recipe => {
        const Template = new recipeCard(recipe);
        recipesContainer.appendChild(Template.createRecipeCard());
    });
}

// Fonction pour réinitialiser les sélecteurs
export function clearSelect() {
    optionIngredient.innerHTML = '';
    optionUstensiles.innerHTML = '';
    optionAppareils.innerHTML = '';
    ulSelect.innerHTML = '';
}

// Fonction interne pour afficher les filtres de résultats
function displayResultsFilters() {
    filterResults.style.display = 'flex';
    selectedTags.style.display = 'flex';
}

// Fonction interne pour effectuer la recherche
function search(recipeses) {
    resultsSearch = [];
    for (let i = 0; i < recipeses.length; i++) {
        const recipe = recipeses[i];

        const hasMatchingIngredient = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(query)
        );

        const hasMatchingName = recipe.name.toLowerCase().includes(query);

        const hasMatchingDescription = recipe.description.toLowerCase().includes(query);

        if (hasMatchingIngredient || hasMatchingName || hasMatchingDescription) {
            resultsSearch.push(recipe);
        }
    }

    displayTotalRecipes(resultsSearch);
    searchIcon.classList.add('submitactive');
    clearSearch.style.display = 'block';
    clearSelect();
    displayResults(resultsSearch);
    allIngredients(resultsSearch);
    allAppareils(resultsSearch);
    allUstensils(resultsSearch);
    custumSelect();

    if (resultsSearch.length === 0) {
        recipesContainerErreur.classList.add('recipes-container-erreur');
        recipesContainerErreur.style.display = 'block';
        recipesContainerErreur.classList.add('text-center');
        recipesContainerErreur.textContent = ' Aucune recette ne contient ' + query + ' vous pouvez chercher tarte aux pommes , poisson, etc';
        mainContainer.appendChild(recipesContainerErreur);
        filterResults.style.display = 'none';
        selectedTags.style.display = 'none';
    } else {
        displayResultsFilters();
        recipesContainerErreur.style.display = 'none';
    }
}


// Fonction interne pour gérer l'entrée de recherche
function searchInput() {
    inputSearchGlobal.addEventListener('input', function () {
        query = inputSearchGlobal.value.toLowerCase();

        if (query.length >= 3) {
            if (resultsTags.length > 0) {
                search(resultsTags);
                if (query.length < 3) {
                    tagsSearch(tableauValeurs, recipes);
                }
            } else {
                search(recipes);
            }
        } else if (query.length === 0) {
            if (resultsTags.length > 0) {
                tagsSearch(tableauValeurs, recipes);
            } else {
                searchIcon.classList.remove('submitactive');
                clearSearch.style.display = 'none';
                cleanRecipescontenair();
                displayRecipes(recipes);
                displayTotalRecipes(recipes);
                clearSelect();
                allIngredients(recipes);
                allAppareils(recipes);
                allUstensils(recipes);
                custumSelect();
                if (resultsTags.length === 0) {
                    displayResultsFilters();
                }
            }
        }
    });
}

// Appeler la fonction de recherche lors de l'initialisation
searchInput();
// Afficher le nombre total de recettes au chargement
displayTotalRecipes(recipes);

// Gérer le clic sur le bouton de suppression de la recherche
clearSearch.addEventListener('click', () => {
    event.preventDefault();
    inputSearchGlobal.value = '';
    query = '';
    clearSearch.style.display = 'none';

    if (resultsTags.length > 0) {
        tagsSearch(tableauValeurs, recipes);
    } else {
        searchIcon.classList.remove('submitactive');
        clearSearch.style.display = 'none';
        cleanRecipescontenair();
        displayRecipes(recipes);
        displayTotalRecipes(recipes);
        clearSelect();
        allIngredients(recipes);
        allAppareils(recipes);
        allUstensils(recipes);
        custumSelect();
        displayResultsFilters();
    }
});
