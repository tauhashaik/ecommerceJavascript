// Getting the items from the array of purchase from Local Storage.
let purchase = JSON.parse(localStorage.getItem('purchase'))

let table = document.querySelector('table');

// mapping through the purchase array and displaying it to the table in the HTML.
function callData(){
    table.innerHTML = purchase.map(function(item, index){
    return `
    <tr id="tRow">
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData">${index+1}</td>
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData">${item.name}</td>
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData">${item.description}</td>
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData">R${item.price}</td>
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData"><img id='adminImg' src= "${item.url}"></td>
         <td style = "color: yellow; background-color: red; padding-top: 40px" id="tData">${item.quantity}</td>
        <td style = "color: yellow; background-color: red; padding-top: 40px"><button id="deleteButt" class ='deleteBtn' value = '${index}'>Delete</button></td>
        </tr>
    `
    }).join('')
}
callData()

function deletes(position){
    purchase.splice(position, 1)
    localStorage.setItem('purchase', JSON.stringify(purchase))
    purchase = JSON.parse(localStorage.getItem('purchase'))
    callData()
}


let deleteButt= document.getElementById('deleteButt');

table.addEventListener('click',function(){
    if (event.target.classList.contains('deleteBtn')){
        deletes(event.target.value);
    }
});