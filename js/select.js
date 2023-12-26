import {recipes} from '../data/recipes.js'
import { displayResults } from './pages/index.js';
import { clearSelect } from './pages/index.js';
import { cleanRecipescontenair } from './pages/index.js';
import { displayTotalRecipes } from './pages/index.js';
import { resultsSearch} from './pages/index.js';

export function allIngredients(recipes) {
  const select = document.getElementById('ingredients');

  // Utilise la méthode .flat() pour aplatir le tableau de tableaux en un seul tableau
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()));

  // Utilise Set directement pour obtenir des valeurs uniques
  const uniqueIngredients = [...new Set(allIngredients)];

  // Trier les ingrédients par ordre alphabétique
  uniqueIngredients.sort((a, b) => a.localeCompare(b));

  // Utilise document.createDocumentFragment pour améliorer les performances lors de l'ajout d'options
  const fragment = document.createDocumentFragment();

  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select')
  firstOption.textContent = 'Ingredients'
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);
  // Utilise forEach avec la déstructuration des paramètres
  uniqueIngredients.forEach((ingredient) => {
    const option = document.createElement('option');
    option.classList.add('second');
    option.textContent = ingredient;
    fragment.appendChild(option);
  });

  // Ajoute le fragment complet en une seule opération
  select.appendChild(fragment);
}

export function allAppareils(recipes) {
  const select = document.getElementById('appareils');

  // Utilise Set directement pour obtenir des valeurs uniques
  const uniqueAppliances = [...new Set(recipes.map(recipe => recipe.appliance.toLowerCase()))];

  // Trie les appareils par ordre alphabétique
  uniqueAppliances.sort((a, b) => a.localeCompare(b));

  // Utilise document.createDocumentFragment pour améliorer les performances lors de l'ajout d'options
  const fragment = document.createDocumentFragment();

  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select')
  firstOption.textContent = 'Appareils'
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);

  // Utilise forEach avec la déstructuration des paramètres
  uniqueAppliances.forEach((appliance) => {
    const option = document.createElement('option');
    option.textContent = appliance;
    fragment.appendChild(option);
  });

  // Ajoute le fragment complet en une seule opération
  select.appendChild(fragment);
}


export function allUstensils(recipes) {
  const select = document.getElementById('Ustensiles');

  // Utilise Set directement pour obtenir des valeurs uniques
  const uniqueUstensils = [...new Set(
    recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
  )];

  // Trie les ustensiles par ordre alphabétique
  uniqueUstensils.sort((a, b) => a.localeCompare(b));

  // Utilise document.createDocumentFragment pour améliorer les performances lors de l'ajout d'options
  const fragment = document.createDocumentFragment();

  const firstOption = document.createElement('option');
  firstOption.classList.add('btn-select')
  firstOption.textContent = 'Ustensiles'
  firstOption.disabled = true;
  firstOption.selected = true;
  select.appendChild(firstOption);

  // Utilise forEach avec la déstructuration des paramètres
  uniqueUstensils.forEach((ustensil) => {
    const option = document.createElement('option');
    option.textContent = ustensil;
    fragment.appendChild(option);
  });

  // Ajoute le fragment complet en une seule opération
  select.appendChild(fragment);
}

allIngredients(recipes)
allAppareils(recipes)
allUstensils(recipes)


export let tableauValeurs = [];
export let selectValue ='';
export let hasAllValues=''


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
  selectOption.forEach(function(item, index) {
    if (index == 0) {
      return;
    }
    let customSelect__item = document.createElement('li');
    
    customSelect__item.classList.add('mg-custom-select__list__item')
    customSelect__item.dataset.value = item.value;
    customSelect__item.textContent = item.text;
    customSelect__list.appendChild(customSelect__item);
    

  })

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
      let tags = document.createElement('div');
      const tagsButton = document.createElement('button');
      const tagsLabel = document.createElement('h3');
      tags.classList.add('tags')
      tagsButton.classList.add('tags-button');
      const tagContnair = document.getElementById('selected-tags')
      tagsLabel.innerHTML = this.dataset.value;
      tags.appendChild(tagsLabel);
      tags.appendChild(tagsButton);
      
      tagContnair.appendChild(tags);
      selectValue= this.dataset.value;
      updateTags(selectValue)
      if (resultsSearch.length > 0){
        tagsSearch(tableauValeurs,resultsSearch)
      }
      else if (resultsSearch.length === 0){
        tagsSearch(tableauValeurs,recipes)
      }

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
        customSelect__items.forEach(function(item, index) {
          item.classList.remove('hidden');
        })      
      }, duration)
    })
  })

  // Ajouter un écouteur d'événement 'keyup' à la barre de recherche (le cas échéant)
  if(withSearch) {
    searchInput.addEventListener('keyup', function() {
      let inputVal = this.value;
      let pattern = new RegExp(inputVal, 'i');
      customSelect__items.forEach(function(item, index) {
        if (!item.textContent.match(pattern)) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }  
      })
    })
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

export function tagsSearch(tableauValeurs,recipeses) {
  const results = recipeses.filter(recipe => {
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

      return hasAllValues;
  });

 
console.log(results);
  displayTotalRecipes(results)
clearSelect()
allIngredients(results)
allAppareils(results)
allUstensils(results)
custumSelect()
cleanRecipescontenair()
displayResults(results)
}



function updateTags() {
  if (!tableauValeurs.includes(selectValue)) {
    tableauValeurs.push(selectValue);
    console.log(tableauValeurs);}
}

custumSelect()




