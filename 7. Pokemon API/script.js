//VARSS
let url = "https://pokeapi.co/api/v2/pokemon/" ;
let nextBtn;
let prevBtn;
//DOM VARS
const mainContent = document.querySelector("main");
const loader = document.querySelector(".loader");
const links = document.querySelector(".links");
const cardTemplate = document.querySelector(".card-template").content;
const fragmento = document.createDocumentFragment();

console.log(loader)
//fragmento


async function getPokemons(url){
    try{
        loader.classList.remove("hide");
        let getPageRequest = await fetch(url);
        let page = await getPageRequest.json();
        
        if(!getPageRequest.ok) throw {error: 400, message: "error getting links"};

        for(let i=0; i<page.results.length; i++){
            let pokemonRequest =  await fetch(page.results[i].url);
            let pokemonData =  await pokemonRequest.json();
            if(!pokemonRequest.ok) throw {error: 400, message: "error getting pokemon"};
            //console.log(pokemonData);

            cardTemplate.querySelector(".img").setAttribute("src",pokemonData.sprites.other.dream_world.front_default);
            //cardTemplate.querySelector(".img").setAttribute("src",pokemonData.sprites.front_default);
            cardTemplate.querySelector(".id").textContent = pokemonData.id;
            cardTemplate.querySelector(".name").textContent = pokemonData.name;

            let cardElement = document.importNode(cardTemplate, true);
            fragmento.appendChild(cardElement);
            
        }
        loader.classList.add("hide");
        mainContent.appendChild(fragmento);

        nextBtn = page.next ? `<button class="next dark-icon material-icons md-36 " data-url="${page.next}">
        arrow_forward
    </button>`  : "";
        prevBtn = page.previous ? `<button class="prev dark-icon material-icons md-36" data-url="${page.previous}">
        arrow_back
    </button>` : "";

        links.innerHTML = prevBtn + " " + nextBtn;
    }
    catch(err){
        console.log(err)
    }
}


document.addEventListener("DOMContentLoaded", e=>{
    getPokemons(url);
});

document.addEventListener("click", e=> {
    e.preventDefault();
    if(e.target.matches(".prev") || e.target.matches(".next")){
        console.log(e.target)
        mainContent.innerHTML="";
        getPokemons(e.target.dataset.url);
    }
});
