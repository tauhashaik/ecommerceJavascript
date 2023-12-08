// Creation of empty array for the objects to be pushed into
let pokeItems = [];

// Constructor fucntion to create objects that will be inserted into the array
function Createobjects(id, name, description,quantity,price,url){
    this.id = id,
    this.name = name,
    this.description = description,
    this.quantity = quantity,
    this.price = price,
    this.url = url
}



// Creation of plush objects using the constructor function to be pushed into the array.
let plush1 = new Createobjects(1, 'Kimono Pikachu', 'Limited Edition Pikachu in a Kimono from Japanese collection',1, 800, 'https://i.postimg.cc/XN55NbtS/Pikachu-kimono.jpg')

let plush2 = new Createobjects(2, 'Cyndaquil', 'Soft fluffy Cyndaquil plushie to comfort your saddest days',1, 400, 'https://i.postimg.cc/2S0b98Lv/Cyndaquil.jpg')

let plush3 = new Createobjects(3, 'Leafeon', 'Leafeon is the cutest Pokémon in the world', 1, 600, 'https://i.postimg.cc/pX8Hr0J6/Leafeon.jpg')

let accs1 = new Createobjects( 4, 'Charmander watch x Fossil', 'Be on time with Charmander at your side',1, 2000, 'https://i.postimg.cc/90ChDQ60/Charmander-watch.jpg')

let accs2 = new Createobjects( 5, 'Mimikyu Necklace', 'Shine with Pikachu around your neck',1, 1000, 'https://i.postimg.cc/pVJvgKjF/Pikachu-necklace.jpg')

let accs3 = new Createobjects( 6, 'Pikachu Keychain', 'Have your keys in style with the latest Pikachu keychain',1, 1000, 'https://i.postimg.cc/NFDwmwt4/Pikachu-Keychain.jpg')

let clothe1 = new Createobjects( 7, 'Dragonite T-Shirt', 'Comfortable and stylish T-shirt',1, 850, 'https://i.postimg.cc/Kjyw8cKz/Dragonite-Tshirt.jpg')

let clothe2 = new Createobjects( 8, 'Team Rocket Anorak Jacket', 'Keep warm in style',1, 2500, 'https://i.postimg.cc/65PVrj0V/Team-Rocket-Anorak.jpg')

let clothe3 = new Createobjects( 9, 'Articuno Jacket', 'Keep warm with this jacket while still looking cool',1, 2500, 'https://i.postimg.cc/Ss9H4Yx3/Articuno-Jacket.jpg')




// Pushing the created objects above into the array pokeItems.
pokeItems.push(plush1, plush2, plush3, accs1, accs2, accs3, clothe1, clothe2, clothe3);

// Set the array pokeItems in LocalStorage.
localStorage.setItem('pokeItems', JSON.stringify(pokeItems));

// gets the array from localStorage and sets it to the code.
pokeItems = JSON.parse(localStorage.getItem('pokeItems'));


// Setting variable to HTML table Tag.
let table = document.querySelector('table');

// Creating function to map through array of pokeItems and append them to the table
function toProducts(){
    let products = pokeItems.map(function(item, index){
        return `
        <tr>
            <td style = "color: yellow; background-color: red; padding-top: 40px">${item.id}</td>
            <td style = "color: yellow; background-color: black; font-size: 20px; padding-top: 40px">${item.name}</td>
            <td style = "color: yellow; background-color: red; font-size: 20px; padding-top: 40px">${item.description}</td>
            <td style = "color: yellow; background-color: black; font-size: 20px; padding-top: 40px">R${item.price}</td>
            <td style = "color: yellow; background-color:black"><img id='adminImg' src="${item.url}"></td>
            <td style = "color: yellow; background-color: red; font-size: 20px; padding-top: 40px">${item.quantity}</td>
            <td style = "color: yellow; background-color: red; padding-top: 40px"><button id="adminButt" class = 'editBtn' data-bs-toggle="modal" data-bs-target="#exampleModal1">Edit</button></td>
            <td style = "color: yellow; background-color: red; padding-top: 40px"><button id="adminButt" class ='deleteBtn' value = '${index}'>Delete</button></td>
        </tr>
        `
    })
    // display the above information in the table of admin HTML.
    table.innerHTML = products.join('');
}
toProducts()

// function to set to local storage and call/get from local storage.
function itemSave() {
    localStorage.setItem('pokeItems',JSON.stringify(pokeItems))

    items = JSON.parse(localStorage.getItem('pokeItems'));
    toProducts()
};

// setting variable to delete button using queryselector.
let deleteButton = document.querySelector('.deleteBtn');

// function to remove Item from array pokeItems, then run the itemsave function to set it to the local storage and retrieve again to display the change array after item removal.
function deletes(position){
    pokeItems.splice(position, 1);
    itemSave();
    toProducts();
}

//  This adds funtionality to the button to delete said item from array 'pokeItems' by assigning the function name deletes to it when clicked.This also includes a condition that checks that the button that was clicked matches the class of '.deleteBtn' using The method 'matches' which if it is returned true it will run the follwoing code, if false it will not run the following code. The next line of code assiagns a variable of 'position' to the value of the button.The follwing code to run would be the function 'deletes(position)' to remove the item from the array using splice.
table.addEventListener('click',function(){

    if(event.target.matches('.deleteBtn')){
        let targetPos = event.target.getAttribute('value');
        deletes(targetPos)
        // alert(`Are you sure you want to delete`)
    }
});

// Add Modal Section.

function Addnewproduct(){   
    let name = document.getElementById('input1').value
    let description = document.getElementById('input2').value
    let price = document.getElementById('input3').value
    let url = document.getElementById('input4').value
    let createNewProduct = new Createobjects(pokeItems.length +1, name, description, price, url);

    pokeItems.push(createNewProduct);

    itemSave();
    
    toProducts();
}

let saveChanges=document.getElementById('adminButt2');

saveChanges.addEventListener('click',Addnewproduct);


// Edit Modal section.

// let editBtn = document.querySelector('.editBtn');
let editConfirm = document.getElementById('editButt');



editConfirm.addEventListener('click', function(){
    let name = document.getElementById('input#1').value;
    let description = document.getElementById('input#2').value;
    let price = document.getElementById('input#3').value;
    let url = document.getElementById('input#4').value;
    document.getElementById('editButt')
    let index = document.getElementById('exampleModal1').getAttribute("data-index");

    if(name && description && price && url){

        pokeItems[index].name = name;
        pokeItems[index].description = description;
        pokeItems[index].price = price;
        pokeItems[index].url = url;

        localStorage.setItem(pokeItems, JSON.stringify(pokeItems));
    }
    else {
        alert('Please fill in all fields');
    }
    toProducts();
});

// function editProd(index){
//     let name = document.getElementById('input#1').value;
//     let description = document.getElementById('input#2').value;
//     let price = document.getElementById('input#3').value;
//     let url = document.getElementById('input#4').value;

//     name = pokeItems[index].name
//     description = pokeItems[index].description
//     price = pokeItems[index].price
//     url = pokeItems[index].url

//     document.getElementById('exampleModal1').setAttribute("data-index",index)
// }

// function savedEditProd(){
//   let  name = document.getElementById('input#1').value.trim();
//   let description = document.getElementById('input#2').value.trim();
//   let price = document.getElementById('input#3').value.trim();
//   let url = document.getElementById('input#4').value.trim();
//   let pos = document.getElementById('exampleModal1').getAttribute("data-index");

//   pokeItems[pos].name = name;
//   pokeItems[pos].description = description;
//   pokeItems[pos].price = price;
//   pokeItems[pos].url = url;

//   itemSave();
//   toProducts();
// }

// editConfirm.addEventListener('click', function(){
//     if(event.target.classList.contains(editBtn)){
//         editProd(event.target.value)
//     }
//     itemSave();
// })