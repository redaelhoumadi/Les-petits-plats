//custom select dropdown
var parents = Array.from(document.querySelectorAll('.mg-custom-select-js'));
parents.forEach(function(item, index) {
  var parent = item;
  var withSearch = parent.classList.contains('mg-custom-select--search-js');

  var customSelect = document.createElement('div');
  customSelect.classList.add('mg-custom-select');

  var customSelect__invoker = document.createElement('button');
  customSelect__invoker.textContent = parent.childNodes[1].options[parent.childNodes[1].selectedIndex].text;
  customSelect__invoker.classList.add('mg-custom-select__button');
  customSelect.appendChild(customSelect__invoker);

  var dropdown = document.createElement('div');
  dropdown.classList.add('mg-custom-select__dropdown');

  if(withSearch) {
    var searchInput = document.createElement('input');
    searchInput.classList.add('mg-custom-select__search');
    searchInput.setAttribute('type', 'text');
    

    var searchInputLabel = document.createElement('label');
    searchInputLabel.classList.add('mg-custom-select__search__label');
    searchInputLabel.appendChild(searchInput);

    dropdown.appendChild(searchInputLabel);
  }

  var customSelect__list = document.createElement('ul');
  customSelect__list.classList.add('mg-custom-select__list');
  var selectOption = Array.from(parent.querySelectorAll('option'));
  selectOption.forEach(function(item, index) {
    if ( index == 0) {
      return;
    }
    var customSelect__item = document.createElement('li');
    customSelect__item.classList.add('mg-custom-select__list__item')
    customSelect__item.dataset.value = item.value;
    customSelect__item.textContent = item.text;
    customSelect__list.appendChild(customSelect__item);
  })

  dropdown.appendChild(customSelect__list);
  customSelect.appendChild(dropdown);
  parent.appendChild(customSelect);
  parent.childNodes[1].style.display = 'none';
  
  var duration = parseFloat(window.getComputedStyle(dropdown, null).getPropertyValue('transition-duration')) * 1000;
  
  var customSelect__items =  Array.from(customSelect__list.querySelectorAll('li'));
  customSelect__items.forEach(function(item, index) {
    item.addEventListener('click', function() {
      var selectedOption = parent.childNodes[1].options[parent.childNodes[1].selectedIndex];
      dropdown.classList.toggle('opened');
      parent.childNodes[1].value = this.dataset.value;

      selectedOption.removeAttribute('selected');
      parent.childNodes[1].options[index + 1].setAttribute('selected', true);

      var selectChangeEvent = document.createEvent("HTMLEvents");
      selectChangeEvent.initEvent('change', false, true);
      parent.childNodes[1].dispatchEvent(selectChangeEvent);

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

  if(withSearch) {
    searchInput.addEventListener('keyup', function() {
      var inputVal = this.value;
      var pattern = new RegExp(inputVal, 'i');
      customSelect__items.forEach(function(item, index) {
        if (!item.textContent.match(pattern)) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }  
      })
    })
  }

  customSelect__invoker.addEventListener('click', function() {
    dropdown.classList.toggle('opened');
  })

  setTimeout(function() {
    parent.style.width = window.getComputedStyle(customSelect, null).getPropertyValue('width');
    parent.style.height = window.getComputedStyle(customSelect, null).getPropertyValue('height');
  }, 200);  
})