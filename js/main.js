  var fullNameInput =  document.getElementById('fullNameInput');
 var phoneNumberInput =  document.getElementById('phoneNumberInput');
 var emailAdressInput =  document.getElementById('emailAdressInput');
 var locationAdressInput =  document.getElementById('locationAdressInput');
 var groupInput =  document.getElementById('groupInput');
 var notesInput =  document.getElementById('notesInput');
 var photoInput =  document.getElementById('photoInput');
 var searchInput =  document.getElementById('searchInput');
 var favoriteInput =  document.getElementById('favoriteInput');
 var emergencyInput =  document.getElementById('emergencyInput');
 var contentContainer =  document.getElementById('contentContainer');
 var addBtn =  document.getElementById('addBtn');
 var updateBtn =  document.getElementById('updateBtn');
 var modalElement = document.getElementById('exampleModal');
var modal = bootstrap.Modal.getOrCreateInstance(modalElement);
var updatedIndex= 0 ;
var totalContacts = document.getElementById('totalContacts');
var favoriteContacts = document.getElementById('favoriteContacts');
var emergencyContacts = document.getElementById('emergencyContacts');
var alertName = document.querySelector('.alertName');
var alertPhone = document.querySelector('.alertPhone');
var alertEmail = document.querySelector('.alertEmail');
var alertForm = document.querySelector('.alertForm');
var inputList = [
    fullNameInput,
    phoneNumberInput,
    emailAdressInput,
    locationAdressInput
];
var contentList = [];

if(localStorage.getItem('contentList') != null){
    contentList = JSON.parse(localStorage.getItem('contentList'));

}
displayAllContents(contentList);
updateStatistics();

function addContent(){

if (validateContent(fullNameInput)
&& validateContent(phoneNumberInput)
&& validateContent(emailAdressInput)
 && validateContent(locationAdressInput)
){
    // 1-Get the input values
    //2- group of input values

    var content = {
        fullName: fullNameInput.value,
        phoneNumber: phoneNumberInput.value,
        emailAdress: emailAdressInput.value,
        address: locationAdressInput.value,
       img: photoInput.files[0]
      ? `img/${photoInput.files[0].name}`
      : 'img/download.png',
        group: groupInput.value,
        notes: notesInput.value,
        photo: photoInput.value,
        favorite: favoriteInput.checked,
        emergency: emergencyInput.checked
    }
    // 3-grouping all contents
    contentList.push(content);
    // 4- save the content list in the local storage
    localStorage.setItem('contentList', JSON.stringify(contentList));
    // 5- display the content in the content box
    updateStatistics();
displayLastContent(content);


// check formAlert
if(alertForm.classList.contains('d-block')){
    alertForm.classList.replace('d-block', 'd-none');
}
// removw is valid
for(var i=0; i<inputList.length; i++){
    inputList[i].classList.remove('is-valid');
}

// 6- clear the input values
clearform()

modal.hide();

} else {
    alertForm.classList.replace('d-none', 'd-block');
}
}
function clearform(){
fullNameInput.value = '';
phoneNumberInput.value = '';
emailAdressInput.value = '';
locationAdressInput.value = '';
groupInput.value = '';
notesInput.value = '';
photoInput.value = '';
favoriteInput.checked = false;
emergencyInput.checked = false;
}

function displayLastContent(content){
var row = `
<div class="col-md-4">
    <div class="content">
        <div class="content-header">
            <div class="logo">
                ${content.fullName.charAt(0).toUpperCase()}
            </div>
            <div class="naming">
                <h3>${content.fullName}</h3>
                <p><i class="fa-solid fa-phone fa-2xs"></i> ${content.phoneNumber}</p>
            </div>
        </div>

        <div class="content-body">
            <p><i class="fa-solid fa-envelope fa-2xs"></i> ${content.emailAdress}</p>
            <p><i class="fa-solid fa-location-dot fa-2xs"></i> ${content.address}</p>
            <span>${content.group}</span>
            <p>${content.notes}</p>
        </div>

        <div class="content-footer">
            <div class="right-icons">
                <i class="fa-solid fa-phone fa-2xs"></i>
                <i class="fa-solid fa-envelope fa-2xs"></i>
            </div>

            <div class="left-icons">
                <button onclick="setFormForUpdate(${contentList.length - 1})"><i  class="fa-solid fa-pen fa-2xs"></i></button>
                <button  onclick="deleteContent(${contentList.length - 1})" ><i  class="fa-solid fa-trash fa-2xs"></i></button>
            </div>
        </div>
    </div>
</div>`;

            contentContainer.innerHTML += row;
}

//   ${contentList[i].fullName.charAt(0).toUpperCase()} 
function displayAllContents(list){

    var container ='';
    for(var i=0; i<list.length; i++){
        container += `
       
<div class="col-md-4  ">
                <div class="content">
 <div class="content-header">
                    <div class="logo">
                    ${list[i].fullName.charAt(0).toUpperCase()} 
                    </div>
                    <div class="naming">
                        <h3>${list[i].fullName}</h3>
                        <p><i class="fa-solid fa-phone fa-2xs"></i>  ${list[i].phoneNumber} </p>
                    </div>
                </div>
                <div class="content-body">
                    <p><i class="fa-solid fa-envelope fa-2xs"></i>  ${list[i].emailAdress}</p>
                    <p> <i class="fa-solid fa-location-dot fa-2xs"></i>  ${list[i].address} </p>
                    <span> ${list[i].group}</span>
                    <p>${list[i].notes}</p>
                </div>
                <div class="content-footer">
                    <div class="right-icons">
                        <i class="fa-solid fa-phone fa-2xs"></i>
                        <i class="fa-solid fa-envelope fa-2xs"></i>
                    </div>
                    <div class="left-icons">
                        <button onclick="setFormForUpdate(${i})"> <i class="fa-solid fa-pen fa-2xs"></i></button>
                        <button onclick="deleteContent(${i})"> <i  class="fa-solid fa-trash fa-2xs"></i></button>
                    </div>
                </div>
                </div>
               
            </div>
        `
    }
      contentContainer.innerHTML = container;
}


function deleteContent(index){
    contentList.splice(index, 1);
    localStorage.setItem('contentList', JSON.stringify(contentList));
    displayAllContents(contentList);
    updateStatistics();
}

function searchByNameContent(){
    var searchResults = [];
for (var i=0; i<contentList.length; i++){
    if(contentList[i].fullName.toLowerCase().includes(searchInput.value.toLowerCase())){
searchResults.push(contentList[i]);
}
}

 displayAllContents(searchResults);


}

function setFormForUpdate(index){
    // // 1- get the content to be updated
    var content = contentList[index];
    // 2- fill the input values with the content values
    
    fullNameInput.value = content.fullName;
    phoneNumberInput.value = content.phoneNumber;
    emailAdressInput.value = content.emailAdress;   
    locationAdressInput.value = content.address;
    groupInput.value = content.group;
    notesInput.value = content.notes;
    photoInput.value = content.photo;
    favoriteInput.checked = content.favorite;
    emergencyInput.checked = content.emergency;

     //  open Modal
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    // hide add button and show update button
    addBtn.classList.replace( 'd-block' , 'd-none');
    updateBtn.classList.replace(  'd-none' , 'd-block');


    updatedIndex  = index;



}

function updateContent(index){
// contentList[updatedIndex].fullName = fullNameInput.value;
// contentList[updatedIndex].phoneNumber = phoneNumberInput.value;
// contentList[updatedIndex].emailAdress = emailAdressInput.value;
// contentList[updatedIndex].address = locationAdressInput.value;
// contentList[updatedIndex].group = groupInput.value;
// contentList[updatedIndex].notes = notesInput.value;
// contentList[updatedIndex].photo = photoInput.value;
// contentList[updatedIndex].favorite = favoriteInput.checked;
// contentList[updatedIndex].emergency = emergencyInput.checked;
if (validateContent(fullNameInput)&& validateContent(phoneNumberInput)
&& validateContent(emailAdressInput)
 && validateContent(locationAdressInput)
){
var content = {
        fullName: fullNameInput.value,
        phoneNumber: phoneNumberInput.value,
        emailAdress: emailAdressInput.value,
        address: locationAdressInput.value,
       img: photoInput.files[0]
    ? `img/${photoInput.files[0].name}`
    : contentList[updatedIndex].img,
        group: groupInput.value,
        notes: notesInput.value,
        photo: photoInput.value,
        favorite: favoriteInput.checked,
        emergency: emergencyInput.checked
    }
    contentList.splice(updatedIndex, 1, content);

    localStorage.setItem('contentList', JSON.stringify(contentList));

    updateBtn.classList.replace( 'd-block' ,'d-none' );

    addBtn.classList.replace(  'd-none','d-block' );

    displayAllContents(contentList);
    // check formAlert
if(alertForm.classList.contains('d-block')){
    alertForm.classList.replace('d-block', 'd-none');
}
// removw is valid
for(var i=0; i<inputList.length; i++){
    inputList[i].classList.remove('is-valid');
}
updateStatistics();
 clearform()

 var modalElement = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();
} else{
    alertForm.classList.replace('d-none', 'd-block');
}}

function resetModal(){
    clearform();

    updateBtn.classList.replace('d-block','d-none');
    addBtn.classList.replace('d-none','d-block');
}


// function closeModal() {
//     var modalElement = document.getElementById('exampleModal');
//     var modal = bootstrap.Modal.getInstance(modalElement);

//     modal.hide();
// }

function updateStatistics() {

    totalContacts.innerHTML = contentList.length;

    var favoriteCount = 0;
    var emergencyCount = 0;

    for (var i = 0; i < contentList.length; i++) {

        if (contentList[i].favorite) {
            favoriteCount++;
        }

        if (contentList[i].emergency) {
            emergencyCount++;
        }
    }

    favoriteContacts.innerHTML = favoriteCount;
    emergencyContacts.innerHTML = emergencyCount;
}

// validation functions




function validateContent(element ) {
   
var regex={
    fullNameInput: /^[a-zA-Z ]{6,30}$/,
    phoneNumberInput: /^(010|011|012|015)[0-9]{8}$/,
    emailAdressInput: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   locationAdressInput: /^[a-zA-Z0-9\s,.-]{5,50}$/
}
var alerts = {
    fullNameInput: document.querySelector('.alertName'),
    phoneNumberInput: document.querySelector('.alertPhone'),
    emailAdressInput: document.querySelector('.alertEmail'),
    locationAdressInput: document.querySelector('.alertAdress')
};
 var alertElement = alerts[element.id];

var elementId = element.id;
    if (!regex[element.id].test(element.value)) {

        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        alertElement.classList.replace('d-none', 'd-block');
        return false;

    } else {

        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        if(alertElement.classList.contains('d-block')){
            alertElement.classList.replace('d-block', 'd-none');
        }

        return true;
    }
}
for(var i=0; i<inputList.length; i++){
    inputList[i].addEventListener('blur',function(){
        validateContent(this)
    })
}

//     fullNameInput.addEventListener('blur',function(){
// validateContent( fullNameInput , /^[a-zA-Z ]{6,30}$/ , alertName)
//     });
//      phoneNumberInput.addEventListener('blur',function(){
// validateContent( phoneNumberInput , /^(010|011|012|015)[0-9]{8}$/ , alertPhone)
//     });
//       emailAdressInput.addEventListener('blur',function(){
// validateContent( emailAdressInput , /^[^\s@]+@[^\s@]+\.[^\s@]+$/ , alertEmail)
//     });

// function validatePhone() {
//     var regexPhone = /^(010|011|012|015)[0-9]{8}$/;

//     if (!regexPhone.test(phoneNumberInput.value)) {
//         phoneNumberInput.classList.add('is-invalid');
//         phoneNumberInput.classList.remove('is-valid');
//         alertPhone.classList.replace('d-none', 'd-block');
//         return false;
//     } else {
//         phoneNumberInput.classList.add('is-valid');
//         phoneNumberInput.classList.remove('is-invalid');
//          if(alertPhone.classList.contains('d-block')){
//             alertPhone.classList.replace('d-block', 'd-none');
//         }
//         return true;
        
//     }}

//   phoneNumberInput.addEventListener('blur',function(){
// validatePhone()
//     });


// function validateEmail() {
//     if (!regexEmail.test(emailAdressInput.value)) {
//         emailAdressInput.classList.add('is-invalid');
//         emailAdressInput.classList.remove('is-valid');
//         alertEmail.classList.replace('d-none', 'd-block');
//         return false;
//     } else {
//         emailAdressInput.classList.add('is-valid');
//         emailAdressInput.classList.remove('is-invalid');
//          if(alertEmail.classList.contains('d-block')){
//             alertEmail.classList.replace('d-block', 'd-none');
//         }
//         return true;
//     }   }

//       emailAdressInput.addEventListener('blur',function(){
// validateEmail()
//     });
