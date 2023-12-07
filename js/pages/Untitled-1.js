                let resultsNames = '';
                let resultsIngredient = '';
                 if (resultsNames = recipes.filter(recipe => recipe.name.toLowerCase().includes(query))){
                    const wrapper = document.querySelector('.recipt-contenaire')
                    wrapper.innerHTML = '';
                    console.log(resultsNames);
                    
    
                }else if(resultsIngredient  ){
                    
                    wrapper.innerHTML = '';
                    console.log(resultsIngredient+ " ingretiends");
                }
                else {console.log('if1')}




