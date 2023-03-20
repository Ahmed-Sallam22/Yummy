/// <reference types="../@types/jquery"/>
$(document).ready(() => {
    searchName("").then(() => { //for display meals in main stater page
        //loding screen
        $(".fa-spin").fadeOut(500,function(){
            $(".loading-screen").fadeOut(500)
            $("body").css("overflow", "visible")
        })
    })
})
//  sideBAr   
function OpenSideNavBar() {
$(".sideBar").animate({left: 0}, 800)
$("#Opne_Close").removeClass("fa-bars");
$("#Opne_Close").addClass("fa-close");
for (let i = 0; i < 5; i++) {
   $(".links li").eq(i).animate({top: 0,bottom:0}, i*200 )
}
}
function CloseNavBar() {
let sidebarWidth = $(".sideBar .sideBarInner").innerWidth()
$(".sideBar").animate({left: -sidebarWidth}, 800)
$("#Opne_Close").addClass("fa-bars");
$("#Opne_Close").removeClass("fa-close");
$(".links li").animate({top: 400}, 1000)
}
CloseNavBar()
$(".sideBar i#Opne_Close").click(() => {
if ($(".sideBar").css("left") == "0px") {
   CloseNavBar()
} else {
   OpenSideNavBar()
}
})

// Contact Section


//Api
let CardDAta = document.getElementById("meal");
let search = document.getElementById("search");
let searchSection = document.getElementById("searchSection");
let categorySection = document.getElementById("categorySection");
let areaSection =document.getElementById("AreaSection")
let ingrediantsSection =document.getElementById("ingrediantsSection")
let contactSection =document.getElementById("contactUsSection")

// show main home 
function Meals(meals) {
    let cartoona = "";
    for (let i = 0; i < meals.length; i++) {
        cartoona += `
        <div class="col-md-3 ">
                <div class="meal-card" onclick="MealDetails('${meals[i].idMeal}')">
                    <img class="w-100" src="${meals[i].strMealThumb}" alt="">
                    <div class="layer">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    CardDAta.innerHTML= cartoona
}
// search category
function showSearchInputs() {
    search.innerHTML = `
    <div class="row py-3 ">
        <div class="col-md-6">
            <input oninput="searchName(this.value)" class="form-control" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchFLetter(this.value)" maxlength="1" class="form-control" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    CardDAta.innerHTML = ""
}
async function searchName(mealName) {
    CardDAta.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    response = await response.json()
    console.log(response);
    response.meals ? Meals(response.meals) : Meals([])
}
async function searchFLetter(mealLetter) {
    CardDAta.innerHTML = ""
    if(mealLetter==""){
        mealLetter="a"
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`)
    response = await response.json()
    console.log(response);
    if(response.meals==true){
        Meals(response.meals)
    }
    else{
        Meals([])
    }
    
}
searchSection.addEventListener("click",function(){
    showSearchInputs();
    CloseNavBar()
})
// Category Section
async function Categories() {
    CardDAta.innerHTML = ""
    search.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    showCategories(response.categories)
}
async function CategoryMeals(categ) {
    CardDAta.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`)
    response = await response.json()
    Meals(response.meals.slice(0, 10))
}
function showCategories(cat) {
    let cartoona = "";
    for (let i = 0; i < cat.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="CategoryMeals('${cat[i].strCategory}')" class="meal-card">
                    <img class="w-100" src="${cat[i].strCategoryThumb}" alt="">
                    <div class="layer">
                        <h3>${cat[i].strCategory}</h3>
                        <p>${cat[i].strCategoryDescription.split(" ").slice(0,10)}</p>
                    </div>
                </div>
        </div>
        `
    }
    CardDAta.innerHTML = cartoona
}
categorySection.addEventListener("click",function(){
    Categories();
    CloseNavBar()
})
//area section
async function Area() {
    CardDAta.innerHTML = ""
    search.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
}
function displayArea(area) {
    let areaSection = "";
    for (let i = 0; i < area.length; i++) {
        areaSection += `
        <div class="col-md-3">
                <div onclick="AreaMeals('${area[i].strArea}')" class="meal-card">
                        <i class="fa-solid fa-house-laptop fa-6x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }
    CardDAta.innerHTML = areaSection
}
async function AreaMeals(area) {
    CardDAta.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    // console.log(response);
    Meals(response.meals.slice(0, 10))
}
areaSection.addEventListener("click",function(){
    Area();
    CloseNavBar()
})
//ingrediants Section
async function Ingredients() {
    CardDAta.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
}

function displayIngredients(ing) {
    let IngredientsSection = "";
    for (let i = 0; i < ing.length; i++) {
        IngredientsSection += `
        <div class="col-md-3">
                <div onclick="IngredientsMeals('${ing[i].strIngredient}')" class="meal-Card">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing[i].strIngredient}</h3>
                        <p>${ing[i].strDescription.split(" ").slice(0,10).join(" ")}</p>
                </div>
        </div>
        `
    }
    CardDAta.innerHTML = IngredientsSection
}
async function IngredientsMeals(ingredients) {
    CardDAta.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    Meals(response.meals.slice(0, 10))
}
ingrediantsSection.addEventListener("click",function(){
    Ingredients();
    CloseNavBar()
})
//details card
async function MealDetails(mealID) {
    CardDAta.innerHTML = ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    }
function displayMealDetails(deMeal) {
    let ingredients = ``
        for (let i = 1; i <= 20; i++) {
        if (deMeal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-success m-2 p-1 " id="ingr">${deMeal[`strMeasure${i}`]} ${deMeal[`strIngredient${i}`]}</li>`
        }
    }
let cartoona = `
<div class="col-md-4">
            <img class="w-100 rounded-2" src="${deMeal.strMealThumb}"alt="">
                <h2>${deMeal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${deMeal.strInstructions}</p>
            <h2><span class="fw-bold">Area: </span>${deMeal.strArea}</h2>
            <h2><span class="fw-bold">Category: </span>${deMeal.strCategory}</h2>
            <h2 class="fw-bold">Recipes:</h2>
            <ul class="d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>
            <h2>Tags:</h2>
            <a target="_blank" href="${deMeal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${deMeal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`
CardDAta.innerHTML = cartoona
}



function showContacts() {
    CardDAta.innerHTML = `
    <section id="contact">
    <div class="container  px-1 px-lg-5">
    <form class="row g-4 justify-content-center">
        <div class="col-lg-6 position-relative">
        <input type="text" class="w-100" placeholder="Enter Your Name" oninput="return uservalidation();" id="username">
        <div id="validation-name" class="alert alert-danger d-none text-center mt-2" role="alert">
            Special characters and numbers not allowed
        </div>
        </div>
        <div class="col-lg-6 position-relative">
        <input type="email" class="w-100"  placeholder="Enter Your Email" oninput="return emailvalidation();" id="email">
        <div id="validation-email"  class="alert alert-danger text-center mt-2 d-none" role="alert">
            Email not valid *exemple@yyy.zzz
        </div>
        </div>
        <div class="col-lg-6 position-relative">
            <input type="tel" class="w-100"  placeholder="Enter Your Phone" oninput="return phonevalidation()" id="phone">
            <div id="validation-phone" class="alert alert-danger d-none text-center mt-2"  role="alert">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-lg-6 position-relative">
            <input type="number" class="w-100"   placeholder="Enter Your Age" oninput="return agevalidation()" id="age">
            <div id="validation-age" class="alert alert-danger d-none text-center mt-2" role="alert">
                Enter valid age
            </div>
        </div>
        <div class="col-lg-6 position-relative">
            <input type="password" class="w-100"  placeholder="Enter Your Password"  oninput="return passwordvalidation()" id="password">
            <div id="validation-password" class="alert alert-danger d-none text-center mt-2" role="alert" >
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
        </div>
        <div class="col-lg-6 position-relative">
        
            <input type="password" class="w-100"  placeholder="Repassword" oninput="return repasswordvalidation();" id="repassword">
            <div id="validation-repassword" class="alert alert-danger d-none text-center mt-2" role="alert">
                Enter valid repassword
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button id="submit"  class="button btn btn-outline-danger">Submit</button>
        </div>
    </form>
    </div>
    </section>`
    }
    contactSection.addEventListener("click",function(){
    showContacts()
    CloseNavBar()
    })
    
    function uservalidation(){
    let username=document.getElementById("username").value;
    let namecheck=/^[a-zA-Z]{3,}$/
    if(namecheck.test(username)){
        document.getElementById("validation-name").classList.replace('d-block','d-none');
        $("#username").addClass('valid');
        $("#username").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-name").classList.replace('d-none','d-block');
        $("#username").addClass('non-valid');
        $("#username").removeClass('valid');
        return false
    }
    }
    function emailvalidation(){
    let email=document.getElementById("email").value;
    let emailcheck=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,4}$/
    if(emailcheck.test(email)){
        document.getElementById("validation-email").classList.replace('d-block','d-none');
        $("#email").addClass('valid');
        $("#email").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-email").classList.replace('d-none','d-block');
        $("#email").addClass('non-valid');
        $("#email").removeClass('valid');
        return false
    }
    }
    function phonevalidation(){
    let phone=document.getElementById("phone").value;
        let phonecheck=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,7}$/im
    if(phonecheck.test(phone)){
        document.getElementById("validation-phone").classList.replace('d-block','d-none');
        $("#phone").addClass('valid');
        $("#phone").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-phone").classList.replace('d-none','d-block');
        $("#phone").addClass('non-valid');
        $("#phone").removeClass('valid');
        return false
    }
    }
    function agevalidation(){
    let age=document.getElementById("age").value;
    let agecheck= /^[1-9]?[0-9]{1}$|^100$/
    if(agecheck.test(age)){
        document.getElementById("validation-age").classList.replace('d-block','d-none');
        $("#age").addClass('valid');
        $("#age").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-age").classList.replace('d-none','d-block');
        $("#age").addClass('non-valid');
        $("#age").removeClass('valid');
        return false
    }
    }
    function passwordvalidation(){
        let password=document.getElementById("password").value;
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(passwordcheck.test(password)){
        document.getElementById("validation-password").classList.replace('d-block','d-none');
        $("#password").addClass('valid');
        $("#password").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-password").classList.replace('d-none','d-block');
        $("#password").addClass('non-valid');
        $("#password").removeClass('valid');
        return false
    }
    repasswordvalidation()
    }
    function repasswordvalidation(){
        let password=document.getElementById("password").value;
        let repassword=document.getElementById("repassword").value;
    if(repassword==password){
        document.getElementById("validation-repassword").classList.replace('d-block','d-none');
        $("#repassword").addClass('valid');
        $("#repassword").removeClass('non-valid');
    }
    else{
        document.getElementById("validation-repassword").classList.replace('d-none','d-block');
        $("#repassword").addClass('non-valid');
        $("#repassword").removeClass('valid');
        return false
    }
    }

    // function button(){
    //     if(uservalidation()==true&&emailvalidation()==true&&phonevalidation()==true&&agevalidation()==true&&passwordvalidation()==true&&repasswordvalidation()==true){
    //         $("#submit").removeClass("btn-outline-danger");
    //         $("#submit").addClass("btn-outline-success");
    //     }
    //     else{
    //         $("#submit").addClass("btn-outline-danger");
    //     }
    // }


    // 