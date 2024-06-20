var searchInput = document.querySelector("input")
var cards = document.querySelector(".cards")
var fullReceipeBtn = document.querySelector(".publisher-receipe-container > button");
var ingredients = document.querySelector(".full-receipe")
var loadingLayer = document.querySelector(".loading-layer");
var buttonsContainer = document.querySelector(".buttons-container");
var allBtnsContainer = document.querySelector(".all-btns-container")
var collapseBtn = document.querySelector("button.collapse")


// list of all the food with emojis made with ChatGPT
const foodItemsWithEmojis = [
    "carrot 🥕", "broccoli 🥦", "asparagus 🥬", "cauliflower 🥦", "corn 🌽", 
    "cucumber 🥒", "green pepper 🫑", "lettuce 🥬", "mushrooms 🍄", "onion 🧅", 
    "potato 🥔", "pumpkin 🎃", "red pepper 🌶️", "tomato 🍅", "beetroot 🥕", 
    "brussel sprouts 🥦", "peas 🥬", "zucchini 🥒", "radish 🥕", "sweet potato 🍠", 
    "artichoke 🥬", "leek 🥬", "cabbage 🥬", "celery 🥬", "chili 🌶️", 
    "garlic 🧄", "basil 🌿", "coriander 🌿", "parsley 🌿", "dill 🌿", 
    "rosemary 🌿", "oregano 🌿", "cinnamon 🌿", "saffron 🌾", "green bean 🥬", 
    "bean 🫘", "chickpea 🥬", "lentil 🥬", "apple 🍎", "apricot 🍑", 
    "avocado 🥑", "banana 🍌", "blackberry 🍇", "blackcurrant 🍇", "blueberry 🫐", 
    "boysenberry 🍇", "cherry 🍒", "coconut 🥥", "fig 🍈", "grape 🍇", 
    "grapefruit 🍊", "kiwifruit 🥝", "lemon 🍋", "lime 🍋", "lychee 🍇", 
    "mandarin 🍊", "mango 🥭", "melon 🍈", "nectarine 🍑", "orange 🍊", 
    "papaya 🥭", "passion fruit 🍈", "peach 🍑", "pear 🍐", "pineapple 🍍", 
    "plum 🍑", "pomegranate 🍎", "quince 🍎", "raspberry 🍓", "strawberry 🍓", 
    "watermelon 🍉", "salad 🥗", "pizza 🍕", "pasta 🍝", "popcorn 🍿", 
    "lobster 🦞", "steak 🥩", "bbq 🍖", "pudding 🍮", "hamburger 🍔", 
    "pie 🥧", "cake 🍰", "sausage 🌭", "tacos 🌮", "kebab 🥙", 
    "poutine 🍟", "seafood 🍤", "chips 🍟", "fries 🍟", "masala 🍛", 
    "paella 🥘", "som tam 🍲", "chicken 🍗", "toast 🍞", "marzipan 🍬", 
    "tofu 🍲", "ketchup 🍅", "hummus 🥙", "chili 🌶️", "maple syrup 🥞", 
    "parma ham 🍖", "fajitas 🌮", "champ 🍲", "lasagna 🍝", "poke 🍣", 
    "chocolate 🍫", "croissant 🥐", "arepas 🍞", "bunny chow 🍲", "pierogi 🍲", 
    "donuts 🍩", "rendang 🍲", "sushi 🍣", "ice cream 🍨", "duck 🍗", 
    "curry 🍛", "beef 🥩", "goat 🐐", "lamb 🍖", "turkey 🦃", 
    "pork 🍖", "fish 🐟", "crab 🦀", "bacon 🥓", "ham 🍖", 
    "pepperoni 🍕", "salami 🍖", "ribs 🍖"
]

// displaying all buttons in the foldable container
var allCartoona = ''
for(var i = 0 ; i < foodItemsWithEmojis.length ; i++){
    var createdBtn = document.createElement("button");
    createdBtn.classList.add("btn", "btn-outline-primary",'m-2',"fs-5","flex-shrink-0");
    createdBtn.innerHTML = foodItemsWithEmojis[i]
    allCartoona += createdBtn.outerHTML;
}
allBtnsContainer.innerHTML = allCartoona ;



// loading layer timer for 1.2S
function loadingLayerTiming(){
    loadingLayer.classList.replace("d-none", "d-flex")
    loadingLayer.classList.add("d-flex")
    setTimeout(() => {
            loadingLayer.classList.replace("d-flex",'d-none')
    }, 1200);
};

loadingLayerTiming();





// displaying The top five btns
function btns(specifiedItem){
    var specifiedItemIndex = foodItemsWithEmojis.indexOf(specifiedItem);
    var cartoona = '';
    var createdElements = [];
    for(var i = 0 ; i < 5 ; i++){
        let createdElement = document.createElement("button");
        createdElement.classList.add("btn", "btn-outline-primary","m-2","fs-5");
        if(i == 2)
            createdElement.classList.replace("btn-outline-primary","btn-primary")
        createdElements.push(createdElement);
    }
    createdElements[2].innerHTML = specifiedItem ;
    createdElements[0].innerHTML = foodItemsWithEmojis[specifiedItemIndex-2] ?? foodItemsWithEmojis[foodItemsWithEmojis.length-2] //if the specified was the first element it gets the last element 
    createdElements[1].innerHTML = foodItemsWithEmojis[specifiedItemIndex-1] ?? foodItemsWithEmojis[foodItemsWithEmojis.length-1] // and the element before the last one
    createdElements[3].innerHTML = foodItemsWithEmojis[specifiedItemIndex+1] ?? foodItemsWithEmojis[1] // if the specifed is the last element in the array
    createdElements[4].innerHTML = foodItemsWithEmojis[specifiedItemIndex+2] ?? foodItemsWithEmojis[2] // if the specifed is the last element in the array
    for( var i = 0 ; i < createdElements.length ; i++){
        cartoona += createdElements[i].outerHTML
    }
    buttonsContainer.innerHTML = cartoona;
}




function fetchFood(query){
    sessionStorage.setItem("now",`${query}`)
    return fetch(`https://forkify-api.herokuapp.com/api/search?q=${ query }`)
    .then(res=> res.json())

}

function fetchRecipe(rId){
    return fetch(`https://forkify-api.herokuapp.com/api/get?rId=${rId}`)
    .then(res=> res.json())

}




function displayRecipes(arr) {
    loadingLayerTiming()
    var recipesCartoona = '';
    for(var i = 0 ; i < arr.length ; i++)
                recipesCartoona += `
                    <div class="col-xl-4 col-lg-6 col-12">
                        <div class="cardo rounded-3 position-relative hov overflow-hidden" receipes="${arr[i]}">
                            <div class="image-container w-100 h-100 overflow-hidden">
                                <img src="${arr[i].image_url}" class="w-100 h-100" alt="">
                            </div>
                            <div class="text-container position-absolute bg-light bg-opacity-75 h-100 w-100 d-flex flex-column">
                                <h5 class="text-capitalize text-center mt-2 flex-grow-1 d-flex align-items-center justify-content-center">${arr[i].title}</h5>
                                <div class="publisher-receipe-container w-100 position-absolute bottom-0 start-0 mb-2 d-flex align-items-center justify-content-around">
                                    <div class="publisher text-center mb-2 d-flex flex-column align-items-center justify-content-center">
                                        <h5 class="h6 w-fit-content">-- Publisher --</h5>
                                        <a href="${arr[i].publisher_url}" target="_blank" class="h6 text-capitalize">${arr[i].publisher}</a>
                                    </div>
                                    <button class="btn btn-outline-danger fw-bold">ingredients</button>
                                </div>
                            </div>
                            <div class="h-100 d-flex flex-column justify-content-center full-receipe position-absolute top-0 d-none" receipeId="${arr[i].recipe_id}">
                                <div class="ingredients-btn-container py-2 px-3 d-flex flex-column" receipe_id="${arr[i].recipe_id}">
                                    <div class="close-container flex-grow-1 d-flex justify-content-end align-items-end">
                                        <div class="right-section w-100 h-100 d-flex justify-content-between align-items-center">
                                            <a class="btn btn-outline-warning d-block px-5 fw-bold" href="${arr[i].source_url}" target="_blank">Full Recipe</a>
                                            <button class="btn btn-outline-info d-block  px-5 fw-bold" receipeid="${arr[i].recipe_id}">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            cards.innerHTML = recipesCartoona;
}


function displayIngredients(ingredientsObject){
    var ingredientsArray = ingredientsObject.recipe.ingredients ;
    var list = document.createElement("ul")
    list.classList.add("mb-2","list-group", "list-group-flush", "overflow-auto")
    for(var i = 0 ; i<ingredientsArray.length ; i++){
        var li = document.createElement("li");
        li.classList.add("list-group-item","bg-transparent")
        li.innerHTML = ingredientsArray[i]
        list.append(li) ;
    }
    return list ;



}


// input search functionality
searchInput.addEventListener("change",function(e){
    var specifiedItem = foodItemsWithEmojis.filter(item => item.includes(searchInput.value.toLowerCase()))[0];
    btns(specifiedItem)
    fetchFood(specifiedItem.split(" ")[0])
    .then(res=> displayRecipes(res.recipes))
    
})



// navigating using all buttons + clicking on collapsing button to fold again after choosing the food
allBtnsContainer.addEventListener("click",function(e){
    if(!e.target.classList.contains("all-btns-container")){
        btns(e.target.innerHTML)
        loadingLayerTiming()
        collapseBtn.click()
        fetchFood(e.target.innerHTML.split(" ")[0])
        .then(res=> displayRecipes(res.recipes))
    }
})

// changing btn to and from outline when clicked
collapseBtn.addEventListener("click", function(){
    if(this.getAttribute("clicked") != 1){
        this.classList.replace("btn-outline-success" ,"btn-success");
        this.setAttribute("clicked","1")
    }
    else if(this.getAttribute("clicked") == 1){
        this.classList.replace("btn-success","btn-outline-success")
        this.setAttribute("clicked","0")
    }
})

// navigating using top buttons
buttonsContainer.addEventListener("click",function(e){
    if(!e.target.classList.contains("buttons-container")){
        btns(e.target.innerHTML)
        loadingLayerTiming()
        fetchFood(e.target.innerHTML.split(" ")[0])
        .then(res=> displayRecipes(res.recipes))
    }
})

// Displaying ingredients fetching it once and displaying it all the time 
cards.addEventListener("click", function (e){
    if(e.target.classList.contains("btn-outline-danger")){
        var ingredientsLayer = e.target.parentElement.parentElement.nextElementSibling ;
        if(e.target.getAttribute("done") == "1"){
            ingredientsLayer.classList.remove("d-none");
        }
        else{
            e.target.setAttribute("done","1")
            fetchRecipe(ingredientsLayer.getAttribute("receipeid"))
            .then((res)=> {
                ingredientsLayer.querySelector(".ingredients-btn-container").prepend(displayIngredients(res))
                ingredientsLayer.classList.remove("d-none");
        })
        }

    }
    
    if(e.target.getAttributeNames().includes("receipeid")){
        e.target.parentElement.parentElement.parentElement.parentElement.classList.add("d-none")
    }
})



// first fetch when opening the Website
fetchFood(searchInput.value || sessionStorage.getItem("now") ||"pizza" )
.then(function(resultArray){
    displayRecipes(resultArray.recipes)
        btns(foodItemsWithEmojis.filter(item => item.includes(searchInput.value.toLowerCase()))[0])
})
