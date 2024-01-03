import {recipes} from '../data/recipes.js'
import { displayResults, query } from './pages/index.js';
import { clearSelect } from './pages/index.js';
import { cleanRecipescontenair } from './pages/index.js';
import { displayTotalRecipes } from './pages/index.js';
import { resultsSearch} from './pages/index.js';

export function allIngredients(recipes) {
  const select = document.getElementById('ingredients');

  const allIngredients = [];
for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
        allIngredients.push(ingredient);
    }
}

const uniqueIngredients = [...new Set(allIngredients)];
uniqueIngredients.sort((a, b) => a.localeCompare(b));

  const fragment = document.createDocumentFragment();

  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select');
  firstOption.textContent = 'Ingredients';
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);

  // Utilise une boucle for pour créer les options
  for (let i = 0; i < uniqueIngredients.length; i++) {
    const ingredient = uniqueIngredients[i];
    const option = document.createElement('option');
    option.classList.add('second');
    option.textContent = ingredient;
    fragment.appendChild(option);
  }

  select.appendChild(fragment);
}

export function allAppareils(recipes) {
  const select = document.getElementById('appareils');

  const uniqueAppliances = [];
const applianceSet = new Set();

// Utilise une boucle for pour itérer sur les recettes
for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const applianceLower = recipe.appliance.toLowerCase();

    // Vérifie si l'appareil est déjà dans le Set
    if (!applianceSet.has(applianceLower)) {
        applianceSet.add(applianceLower);
        uniqueAppliances.push(applianceLower);
    }
}

// Trie les appareils par ordre alphabétique
uniqueAppliances.sort((a, b) => a.localeCompare(b));

const fragment = document.createDocumentFragment();


  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select');
  firstOption.textContent = 'Appareils';
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);

  // Utilise une boucle for pour créer les options
  for (let i = 0; i < uniqueAppliances.length; i++) {
    const appliance = uniqueAppliances[i];
    const option = document.createElement('option');
    option.textContent = appliance;
    fragment.appendChild(option);
  }

  select.appendChild(fragment);
}



export function allUstensils(recipes) {
  const select = document.getElementById('Ustensiles');

  const allUstensils = [];
  
  // Utilise une boucle for pour parcourir les recettes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // Utilise une boucle for pour parcourir les ustensiles de chaque recette
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j].toLowerCase();
      allUstensils.push(ustensil);
    }
  }

  const uniqueUstensils = [...new Set(allUstensils)];
  uniqueUstensils.sort((a, b) => a.localeCompare(b));

  const fragment = document.createDocumentFragment();

  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select');
  firstOption.textContent = 'Ustensiles';
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);

  // Utilise une boucle for pour créer les options
  for (let i = 0; i < uniqueUstensils.length; i++) {
    const ustensil = uniqueUstensils[i];
    const option = document.createElement('option');
    option.textContent = ustensil;
    fragment.appendChild(option);
  }

  select.appendChild(fragment);
}


allIngredients(recipes)
allAppareils(recipes)
allUstensils(recipes)


export let tableauValeurs = [];
export let selectValue ='';
export let resultsTags=''


function updateSearchTags(){
  if (query.length > 0){
    tagsSearch(tableauValeurs,resultsSearch)
  
  }
  else if (resultsSearch.length === 0){
    tagsSearch(tableauValeurs,recipes)
    
  }
  else {
    tagsSearch(tableauValeurs,recipes)
  }
}

export function custumSelect(){
// Sélection de tous les éléments avec la classe 'mg-custom-select-js'
let parents = Array.from(document.querySelectorAll('.mg-custom-select-js'));

// Pour chaque élément trouvé
parents.forEach(function(item) {
  // Le parent actuel
  const parent = item;
  
  // Vérifier si la classe 'mg-custom-select--search-js' est présente
  let withSearch = parent.classList.contains('mg-custom-select--search-js');

  // Créer l'élément de sélection personnalisé (customSelect)
  let customSelect = document.createElement('div');
  customSelect.classList.add('mg-custom-select');

  // Créer le bouton d'invocation (customSelect__invoker)
  let customSelect__invoker = document.createElement('button');
  const btnSelect = document.querySelectorAll('.btn-select');
  customSelect__invoker.textContent = parent.childNodes[1].options[parent.childNodes[1].selectedIndex].text;
  customSelect__invoker.classList.add('mg-custom-select__button');
  customSelect.appendChild(customSelect__invoker);

  // Créer le conteneur du menu déroulant
  let dropdown = document.createElement('div');
  dropdown.classList.add('mg-custom-select__dropdown');

  // Ajouter la barre de recherche si nécessaire
  if(withSearch) {
    var searchInput = document.createElement('input');
    searchInput.classList.add('mg-custom-select__search');
    
    searchInput.setAttribute('type', 'text');

    let searchInputLabel = document.createElement('label');
    searchInputLabel.classList.add('mg-custom-select__search__label');
    searchInputLabel.appendChild(searchInput);

    dropdown.appendChild(searchInputLabel);
  }

  // Créer la liste d'options du menu déroulant
  let customSelect__list = document.createElement('ul');
customSelect__list.classList.add('mg-custom-select__list');
let selectOption = Array.from(parent.querySelectorAll('option'));

// Utilise une boucle for pour créer les éléments li
for (let index = 1; index < selectOption.length; index++) {
    let item = selectOption[index];
    let customSelect__item = document.createElement('li');
    
    customSelect__item.classList.add('mg-custom-select__list__item');
    customSelect__item.dataset.value = item.value;
    customSelect__item.textContent = item.text;
    customSelect__list.appendChild(customSelect__item);
}


  // Assembler tous les éléments
  dropdown.appendChild(customSelect__list);
  customSelect.appendChild(dropdown);
  parent.appendChild(customSelect);
  parent.childNodes[1].style.display = 'none';

  // Récupérer la durée de l'animation de transition
  let duration = parseFloat(window.getComputedStyle(dropdown, null).getPropertyValue('transition-duration')) * 1000;
  
  // Sélectionner tous les éléments de la liste déroulante
  let customSelect__items = Array.from(customSelect__list.querySelectorAll('li'));
  customSelect__items.forEach(function(item, index) {
    // Ajouter un écouteur d'événement 'click' à chaque élément de la liste
    item.addEventListener('click', function() {
      let selectedOption = parent.childNodes[1].options[parent.childNodes[1].selectedIndex];
      dropdown.classList.toggle('opened');
      parent.childNodes[1].value = this.dataset.value;
      selectValue= this.dataset.value;
      
      
      updateTags(selectValue)
      updateSearchTags()

      
      selectedOption.removeAttribute('selected');
      parent.childNodes[1].options[index + 1].setAttribute('selected', true);

      // Déclencher un événement de changement
      let selectChangeEvent = document.createEvent("HTMLEvents");
      selectChangeEvent.initEvent('change', false, true);
      parent.childNodes[1].dispatchEvent(selectChangeEvent);

      // Mettre à jour le texte du bouton d'invocation et réinitialiser la recherche (le cas échéant)
      customSelect__invoker.textContent = this.textContent;
      setTimeout(function() {
        if(withSearch) {
          searchInput.value = '';
        }
        for (let index = 0; index < customSelect__items.length; index++) {
          let item = customSelect__items[index];
          item.classList.remove('hidden');
      }      
      }, duration)
    })
  })

  // Ajouter un écouteur d'événement 'keyup' à la barre de recherche (le cas échéant)
  if (withSearch) {
    searchInput.addEventListener('input', function() {
      let inputVal = this.value;
      let pattern = new RegExp(inputVal, 'gi');
      for (let index = 0; index < customSelect__items.length; index++) {
        let item = customSelect__items[index];
    
        if (!item.textContent.match(pattern)) {
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    }
    });
  }
  

  // Ajouter un écouteur d'événement 'click' au bouton d'invocation
  customSelect__invoker.addEventListener('click', function() {
    dropdown.classList.toggle('opened');
  })

  // Ajoutez un écouteur d'événements pour le clic sur le document
document.addEventListener('click', function(event) {
  // Vérifiez si l'élément cliqué est à l'intérieur du menu déroulant
  if (!dropdown.contains(event.target) && !customSelect__invoker.contains(event.target)) {
      // Caché le menu déroulant
      dropdown.classList.remove('opened');
  }
});

  // Régler la largeur et la hauteur du parent après un délai de 200 millisecondes
  setTimeout(function() {
    parent.style.width = window.getComputedStyle(customSelect, null).getPropertyValue('width');
    parent.style.height = window.getComputedStyle(customSelect, null).getPropertyValue('height');
  }, 200);  
})

}

export function tagsSearch(tableauValeurs, recipeses) {
  resultsTags = [];
  
  for (let i = 0; i < recipeses.length; i++) {
    const recipe = recipeses[i];

    // Vérifier si la recette contient tous les éléments du tableau
    const hasAllValues = tableauValeurs.every(choice => {
      const hasMatchingIngredient = recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(choice)
      );

      const hasMatchingAppliance = recipe.appliance.toLowerCase().includes(choice);

      const hasMatchingUstensil = recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(choice)
      );

      return hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil;
    });

    if (hasAllValues) {
      resultsTags.push(recipe);
    }
  }

  displayTotalRecipes(resultsTags);
  clearSelect();
  allIngredients(resultsTags);
  allAppareils(resultsTags);
  allUstensils(resultsTags);
  custumSelect();
  cleanRecipescontenair();
  displayResults(resultsTags);
}


function updateTags() {
  
  // Assurer que selectValue a une valeur valide
  if (selectValue) {
    // Vérifiez si selectValue est déjà présent dans le tableau
    if (!tableauValeurs.includes(selectValue)) {
      tableauValeurs.push(selectValue);

      let tags = document.createElement('div');
      const tagsButton = document.createElement('button');
      const tagsLabel = document.createElement('h3');
      
      tags.classList.add('tags');
      tagsButton.classList.add('tags-button');

      // Configurer le bouton pour supprimer le tag
      tagsButton.addEventListener('click', function() {
        tagContainer.removeChild(tags);
        // Supprimer la valeur correspondante du tableau
        const valueToRemove = tagsLabel.innerHTML;
        const index = tableauValeurs.indexOf(valueToRemove);
        if (index > -1) {
          tableauValeurs.splice(index, 1);
          
          
          updateSearchTags()
        }
      });

      const tagContainer = document.getElementById('selected-tags');
      tagsLabel.innerHTML = selectValue;
      tags.appendChild(tagsLabel);
      tags.appendChild(tagsButton);
      tagContainer.appendChild(tags);
      
    }
  }
  

  
}

custumSelect()




