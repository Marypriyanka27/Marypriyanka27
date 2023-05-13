
var selectedRow = null

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["productName"] = document.getElementById("productName").value;
    formData["productPrice"] = document.getElementById("productPrice").value;
    formData["productDescription"] = document.getElementById("productDescription").value;
    return formData;
}

//Insert the data
function saveProductInfo() {
    var latestData = readFormData(); 

    if (localStorage.getItem("selectedRowIndex") === null)
    {
        var existingUserData = null;
        if (localStorage.getItem('productInfo') === null) {
            existingUserData = [];
        } 
        else
        {
          existingUserData = JSON.parse(localStorage.getItem('productInfo'))
        }

        existingUserData.push(latestData);
    }
    else
    {
         var existingUserData = JSON.parse(localStorage.getItem('productInfo'));
         var selectedRowIndex = JSON.parse(localStorage.getItem('selectedRowIndex'));
         existingUserData[selectedRowIndex] = latestData;

         localStorage.removeItem('selectedRowIndex')
    }
   
    localStorage.setItem('productInfo', JSON.stringify(existingUserData));
    resetForm();
    window.location.href="index.html"
}

function loadProductInfo(){
    let userData = JSON.parse(localStorage.getItem('productInfo'));  
    if(userData.length>0){
        userData.map(uData => {
            var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = uData.productName;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = uData.productPrice;
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = uData.productDescription;
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
        })
    }
}

function loadEditInfo(){

    if (localStorage.getItem('selectedRowIndex') != null) 
    {
        let selectedIndex = JSON.parse(localStorage.getItem('selectedRowIndex')); 
        var existingUserData = JSON.parse(localStorage.getItem('productInfo'));
        var userData = existingUserData[selectedIndex];
        document.getElementById("productName").value = userData.productName;
        document.getElementById("productPrice").value = userData.productPrice;
        document.getElementById("productDescription").value = userData.productDescription;
    }
  }

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    localStorage.setItem('selectedRowIndex', selectedRow.rowIndex - 1);

    window.location.href="addproduct.html";   

    }
    

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productName;
    selectedRow.cells[1].innerHTML = formData.productPrice;
    selectedRow.cells[2].innerHTML = formData.productDescription;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this row?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("productName").value = '';
    document.getElementById("productPrice").value = '';
    document.getElementById("productDescription").value = '';
   
    selectedRow = null;
}
