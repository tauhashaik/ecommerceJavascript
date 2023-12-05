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

// function to update the 'main' element with the provided items in array.
displayItems(pokeItems)

let searchBox = document.querySelector('form');
// Functionailty added to search button. event.preventDefault() to handle submission in a custom manner to update without having to reload the page again.
searchBar.addEventListener('keyup', function(event){
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

// Creation o spinner with appropriate id's, class names, and attributes and div element for the spinner to be inserted in.
let spinner = document.createElement('div');
spinner.id = 'spinny';
spinner.className = 'spinner-border text-danger';
spinner.setAttribute('role','status');
spinner.innerHTML = '<span class="visually-hidden">Loading...</span>'

// ensuring the spinner is added before the main element in HTML.
main.parentNode.insertBefore(spinner, main);

// function created with a condition to display spinner if no products are present and removed from the array and if products are still present then hide the spinner.
function spin(){
    let mainProd = document.getElementById('mainProd');
    let spinner = document.getElementById('spinny');
    
    // condition to make sure th espinner is only dispayed if there are no products(array>0) and to display spinner when there are no products.
    if (filteredSearch.length > 0 ){
        mainProd.style.display = 'block';
        spinner.style.display = 'none';

        main.innerHTML=filteredSearch.map(function(item, index){
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
            </div>`;
        }).join('');
    }
    else{
        mainProd.style.display = 'none';
        spinner.style.display = 'block';
        alert("No Products")
    }
}