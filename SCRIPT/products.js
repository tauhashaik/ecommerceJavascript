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

searchBox.addEventListener('click', function(){
    let searchBox=
})

