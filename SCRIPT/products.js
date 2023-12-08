// Creation of empty array with variable name of purchase.
let purchase = []

let main = document.querySelector('main')

// retriveing Items/objects from Local storage and assigning a variable of 'pokeItems' to it.
let pokeItems = JSON.parse(localStorage.getItem('pokeItems'))

main.innerHTML = pokeItems.map(function(item, index){
    return `
    <div id="cards" class="col-lg-3 d-flex justify-content-center">
        <div class="card h-100" style="width: 18rem;">
            <img id="imgCard" src="${item.url}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 style="color: yellow; background-color: black;" class="card-title">${item.name}</h5>
            <p class="card-text" style="font-size: 17px; font-weight: bolder;"><i>${item.description}</i></p>
            <p class="card-text" style="font-size: 17px;">R${item.price}</p>
            <button id="adminButt" class="btn btn-primary">Add to Cart</button>
        </div>
    </div>
</div>
    `
})


// Search Section.

// function to update the 'main' element with the provided items in array.
displayItems(pokeItems)

let searchBox = document.querySelector('form');
// Functionailty added to search button.'keyup' used to search after every character entered into search input instead of having to click submit or search button. prevent.preventDefault() to handle submission in a custom manner to update without having to reload the page again.

searchButt.addEventListener('click', function(event){
    event.preventDefault();
    
    // search bar given variable and made the input value case insensitive.
    let search = document.getElementById('searchBar').value.toLowerCase();
    
    // Filtering through the array of pokeItems for the object names both uppercase and lowercase and the method 'includes' to make sure the search accomodates the lowercase search.
    let filteredSearch = pokeItems.filter(item => item.name.toLowerCase().includes(search));

    // if the search is more greater than 0 then display the search with the valid inputed character if not greater than 0 and not a valid product the alert message is triggered.
    if (filteredSearch.length >0){
        displayItems(filteredSearch);
    }
    else{
        alert("Product not found.")
    }
});

// function to display the the the filtered array and corresponding products according to the search parameters by users by maping the the filtered array and displaying the results.
function displayItems(filteredSearch){
    main.innerHTML = filteredSearch.map(function(item, index){
        return `
        <div id="cards" class="col-lg-3 d-flex justify-content-center">
        <div class="card h-100" style="width: 18rem;">
        <img id="imgCard" src="${item.url}" class="card-img-top" alt="">
        <div class="card-body">
        <h5 style="color: yellow; background-color: black;" class="card-title">${item.name}</h5>
        <p class="card-text" style="font-size: 17px; font-weight: bolder;"><i>${item.description}</i></p>
        <p class="card-text" style="font-size: 17px;">R${item.price}</p>
        <button id="adminButt" class="btn btn-primary">Add to Cart</button>
        </div>
        </div>
        </div>
        `
    })
}

// Spinner Section.


// function created with a condition to display spinner if no products are present and removed from the array and if products are still present then hide the spinner.

// condition to make sure th espinner is only dispayed if there are no products(array>0) and to display spinner when there are no products.
if (pokeItems.length === 0 ){
    
    main.innerHTML = `<div id="spinny" class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`
    
}
// if there are products within the array, meaning there is at least one product on display the sppinner will not be visible.
else{
    main.innerHTML=pokeItems.map(function(item, index){
        return `
        <div id="cards" class="col-lg-3 d-flex justify-content-center">
        <div class="card h-100" style="width: 18rem;">
        <img id="imgCard" src="${item.url}" class="card-img-top" alt="">
        <div class="card-body">
        <h5 style="color: yellow; background-color: black;" class="card-title">${item.name}</h5>
        <p class="card-text" style="font-size: 17px; font-weight: bolder;"><i>${item.description}</i></p>
        <p class="card-text" style="font-size: 17px;">R${item.price}</p>
        <button id="adminButt" class="btn btn-primary" data-add  value =${index}>Add to Cart</button>
        </div>
        </div>
        </div>`;
    }).join('');
    
}

// Sorting Section.

// Function created to sort products by price from highest to lowest and display it in that order.
function sorting(){

    // using a ternirary operator we create a new array from the pokeItems array a asssign it a variable sorted. Using the sort method we restructure the array accodring to the price from highest to lowest as indicated by the second value in the array - the first value and if it is postive it will sort it by placing the highest values first then the lowest until all values in the array are correctly rearranged.
    let sorted = [...pokeItems];
    sorted.sort((a,b) => b.price - a.price);
    
    // display the sorted products.
    displayItems(sorted);
}

let sortButt = document.getElementById('sortButt');
// adding functionality to th esort button to perfom the sorting function.
sortButt.addEventListener('click', function(){
    sorting();
});



// Add to cart Section.


//  Function pushing the items in the empty purchase array and setting it to local storage.
function addPurchase(index){
    let alreadyPurchased = purchase.findIndex(item=>item.id == pokeItems[index].id)
    if(purchase.length==0){
        purchase.push(pokeItems[index]);
    } 
    // condition to check if the array has an item of the same array in it and if it does not to duplicate it but to increase the quatity of the selected product by 1 and if it is not found in the array then to add it with a quantity of 1.
    // let alreadyPurchased = purchase.findIndex(item => item.id ===pokeItems[index].id);
    // console.log(alreadyPurchased);
    else if(alreadyPurchased != -1){
        purchase[alreadyPurchased].quantity +=1
    }else{
        // purchase.quantity =1;
        console.log('chu papi Tauha');
        purchase.push(pokeItems[index]);
    }
    console.log(purchase);
    localStorage.setItem('purchase', JSON.stringify(purchase));
}


main.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-add')){
        addPurchase(event.target.value);
    }
})