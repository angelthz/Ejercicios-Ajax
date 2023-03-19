//DOM
//loader elemento
const loader = document.querySelector(".loader");
//contenendor de la barra de busqueda
const searchContainer = document.querySelector(".search-container");
//main container: donde iran los resultados de la busqueda
const tvShowsContainer = document.querySelector(".shows-container");
//template para formar cada card
const cardTemplate = document.getElementById("card-template").content;
//fragmentos
const fragmento = document.createDocumentFragment();

//formulario
const searchForm = document.querySelector(".search-form");


// console.log(searchForm)

//funcion asincrona para realizar la query

function getRate(num){
    let rate ="";
    let lim = Math.trunc((num*5)/10);

    for(let i=0; i<lim; i++){
        rate += `<i class="fas fa-star"></i>`;
    }
    return rate;
}

function clearShows(){
    while(tvShowsContainer.firstChild)
            tvShowsContainer.removeChild(tvShowsContainer.firstChild);
    tvShowsContainer.innerHTML = "";
}

async function tvShowQuery(str){
    try{
        loader.classList.remove("hide-loader");
        clearShows();
        let tvShowsRequest = await fetch(`https://api.tvmaze.com/search/shows?q=${str}`);
        let tvShowsData = await tvShowsRequest.json();
        // console.log(tvShowsRequest);
        if(!tvShowsRequest.ok || (tvShowsData.length <= 0) ) throw {err: tvShowsRequest};
        
        console.log(tvShowsRequest.ok);
        tvShowsData.forEach(el => {
            console.log(Math.trunc((el.show.rating.average*5)/10));
            cardTemplate.querySelector(".cover").src = el.show.image ? el.show.image.medium : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            cardTemplate.querySelector(".show-title").textContent = el.show.name;
            cardTemplate.querySelector(".year").textContent = el.show.premiered ? (el.show.premiered.slice(0,4)) : "";
            cardTemplate.querySelector(".rating").innerHTML = getRate(el.show.rating.average);
            cardTemplate.querySelector(".summary").innerHTML = el.show.summary;
            cardTemplate.querySelector(".url").setAttribute("href", el.show.url);
            let cardClone = document.importNode(cardTemplate, true);
            fragmento.appendChild(cardClone);
        });
        loader.classList.add("hide-loader");
        searchContainer.classList.add("search-inactive");
        tvShowsContainer.classList.add("tvshows-active");
        tvShowsContainer.appendChild(fragmento);
        
    }
    catch(err){
        console.warn(err);
        loader.classList.add("hide-loader");
        searchContainer.classList.add("search-inactive");
        tvShowsContainer.classList.add("tvshows-active");
        tvShowsContainer.innerHTML = `<p class="error">Error data not found`;
    }
};

//eventos
searchForm.addEventListener("submit", e=>{
    e.preventDefault();
    let str = e.target.search.value;
    if(str)
        tvShowQuery(str);
    e.stopPropagation();
});

//evento para la barra de busqueda
searchForm.addEventListener("input", e=> {
    e.stopPropagation();
    console.log(e.target.value)
    if(!e.target.value){
        searchContainer.classList.remove("search-inactive");
        tvShowsContainer.classList.remove("tvshows-active");
        // console.log(tvShowsContainer)
        clearShows();
    }
});

