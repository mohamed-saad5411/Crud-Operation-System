var productName = document.getElementById('productName')
var productPrice = document.getElementById('productPrice')
var productCategory = document.getElementById('productCategory')
var productDescription = document.getElementById('productDescription')
var addProductBtn = document.getElementById('addProductBtn')
var updateProductBtn = document.getElementById('updateProductBtn')
var lightMood = document.getElementById('lightMood')
var darktMood = document.getElementById('darktMood')
var section = document.querySelector('section')
var labels = document.querySelectorAll('.text-white-50')
var form = document.querySelector('#form')
var table = document.querySelector('.table')

var indexToUpdate;

function doLightMood() {
    lightMood.classList.add('d-none')
    darktMood.classList.remove('d-none')
    section.classList.remove('bg-dark')
    for (var i = 0; i < labels.length; i++) {
        labels[i].classList.replace('text-white-50', 'text-dark')

    }
    form.classList.add('bg-body-tertiary')
    table.classList.add('bg-body-tertiary')

}
function doDarkMood() {
    darktMood.classList.add('d-none')
    lightMood.classList.remove('d-none')
    section.classList.add('bg-dark')
    for (var i = 0; i < labels.length; i++) {
        labels[i].classList.replace('text-dark', 'text-white-50')

    }
    form.classList.remove('bg-body-tertiary')
    table.classList.remove('bg-body-tertiary')

}

var productContainer = []

if (localStorage.getItem('products') != null) {
    productContainer = JSON.parse(localStorage.getItem('products'))
    displayProduct(productContainer)
}

function addProduct() {
    if (ValidateProductName() && ValidateProductPrice() && ValidateProductCat() && ValidateProductDesc()) {
        var product = {
            productName: productName.value,
            price: productPrice.value,
            cat: productCategory.value,
            desc: productDescription.value,
        }
        productContainer.push(product)
        displayProduct(productContainer)
        localStorage.setItem('products', JSON.stringify(productContainer))

        // clearForm()
    }
}

function displayProduct(arr) {
    cartona = ``
    for (var i = 0; i < arr.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].newName ? arr[i].newName : arr[i].productName}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].cat}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="readyUpdateProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>`
    }
    document.getElementById('data').innerHTML = cartona
}

function deleteProduct(index) {
    productContainer.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(productContainer))
    displayProduct(productContainer)
}

function clearForm() {
    productName.value = ''
    productPrice.value = ''
    productCategory.value = ''
    productDescription.value = ''


}

function searchByName(item) {
    var searchedProducts = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(item.toLowerCase()) == true) {
            searchedProducts.push(productContainer[i]);
            productContainer[i].newName = productContainer[i].productName.replace(item, `<span class="text-danger fw-bolder">${item}</span>`)
            console.log(item);
            displayProduct(searchedProducts);
        }
    }

}

function readyUpdateProduct(index) {
    indexToUpdate = index
    productName.value = productContainer[index].productName
    productPrice.value = productContainer[index].price
    productCategory.value = productContainer[index].cat
    productDescription.value = productContainer[index].desc

    addProductBtn.classList.add('d-none')
    updateProductBtn.classList.replace('d-none', 'd-block')

}

function updateProduct() {

    var product = {
        productName: productName.value,
        price: productPrice.value,
        cat: productCategory.value,
        desc: productDescription.value,
    }

    productContainer.splice(indexToUpdate, 1, product)
    displayProduct(productContainer)
    localStorage.setItem('products', JSON.stringify(productContainer))

    updateProductBtn.classList.add('d-none')
    addProductBtn.classList.replace('d-none', 'd-block')
    clearForm()
}

function ValidateProductName() {
    var regexProductName = /^[a-zA-Z0-9]{2,50}$/
    if (regexProductName.test(productName.value)) {
        document.getElementById('alertName').classList.add('d-none')
        return true
    } else {
        document.getElementById('alertName').classList.replace('d-none', 'd-inline-block')
        return false
    }
}

function ValidateProductPrice() {
    var regexProductPrice = /^[1-9][0-9]{1,4}$/

    if (regexProductPrice.test(productPrice.value)) {
        document.getElementById('alertPrice').classList.add('d-none')
        return true
    } else {
        document.getElementById('alertPrice').classList.replace('d-none', 'd-inline-block')
        return false
    }
}

function ValidateProductCat() {
    var regexProductName = /^[a-zA-Z0-9]{2,50}$/
    if (regexProductName.test(productCategory.value)) {
        document.getElementById('alertCat').classList.add('d-none')
        return true
    } else {
        document.getElementById('alertCat').classList.replace('d-none', 'd-inline-block')
        return false
    }
}

function ValidateProductDesc() {
    var regexProductName = /^[a-zA-Z0-9]{2,50}$/
    if (regexProductName.test(productDescription.value)) {
        document.getElementById('alertDesc').classList.add('d-none')
        return true
    } else {
        document.getElementById('alertDesc').classList.replace('d-none', 'd-inline-block')
        return false
    }
}