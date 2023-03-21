//DOM
const $site = document.getElementById("site");
const $posts = document.getElementById("posts");
const $loader = document.querySelector(".loader");
const $template = document.getElementById("post-template").content;
const $fragmento = document.createDocumentFragment();

// console.log($posts)
//VARIABLES
//https://css-tricks.com /wp-json /wp/v2 /posts
// const DOMAIN = "https://blog.ted.com/";
const DOMAIN = "https://css-tricks.com/";
const SITE = `${DOMAIN}/wp-json`;
const API_WP = `${SITE}/wp/v2`;
const POSTS = `${API_WP}/posts?_embed`;
const INDIVUAL_POST = `${API_WP}/posts/`;
const PAGES = `${API_WP}/pages`;
const CATEGORIES = `${API_WP}/categories`;
let per_page = 10;
let page = 1;

// fetch(CATEGORIES)
// .then(res => res.ok ? res.json() : Promise.reject(res))
// .then(json => {
//     console.log(json);
// })


function getSiteInfo(){
    fetch(SITE)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
       // console.log(json);

        $site.innerHTML += `
            <h3>Sitio Web</h3>
            <h2>
                <a href="${json.url}" target="_blank">${json.name}<a>
            </h2>
            <p>${json.timezone_string}</p>
            <p>${json.description}</p>
        `;
        
    })
    .catch(err => {
        console.warn(err);
        let msg = err.statusText || "Ocurrio un error";
        $site.innerHTML = `<p>Error: <b>${err.status}</b> : ${err.statusText}</p>`;
        
    });
}

function getSitePosts(){
    $loader.classList.remove("hide");
    fetch(`${POSTS}&per_page=${per_page}&page=${page}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        // console.log(json);
        json.forEach( el => {
            // console.log(el)
            $template.querySelector(".post-title").textContent = el.title.rendered;
            $template.querySelector(".post-image").src = el._embedded["wp:featuredmedia"] ? el._embedded["wp:featuredmedia"][0].source_url : "";
            $template.querySelector(".post-image").setAttribute("alt", el.title.rendered);
            $template.querySelector(".avatar").setAttribute("src", el._embedded.author[0].avatar_urls[48]);
            $template.querySelector(".author-name").textContent = el._embedded.author[0].name;
            $template.querySelector(".post-date").textContent = new Date(el.date).toLocaleString();
            $template.querySelector(".post-url").setAttribute("href", el.link);
            $template.querySelector(".post-excerpt").innerHTML = el.excerpt.rendered;
            // $template.querySelector(".post-categories")
            // $template.querySelector(".post-tags")
            $template.querySelector(".post-summary").dataset.postid = el.id;
            $template.querySelector(".post-summary").dataset.haspost = "false";
            // $template.querySelector(".post-content > article").innerHTML = el.content.rendered;
            // $template.querySelector(".post-content").addEventListener("toggle", e=> console.log(e.target));
            
            let actualPost = document.importNode($template, true);
            $fragmento.appendChild(actualPost);
        });

       
        $loader.classList.add("hide");
        $posts.appendChild($fragmento);
        json = null;
    })
    .catch(err => {
        console.warn(err);
        let msg = err.statusText || "Ocurrio un error";
        $posts.innerHTML = `<p>Error: <b>${err.status}</b> : ${err.statusText}</p>`;
        $loader.classList.add("hide");
    });
}

function getIndividualPost(id, padre){
    fetch(`${INDIVUAL_POST}${id}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
       console.log("cargando contenido de articulo");
       padre.querySelector("article").innerHTML = json.content.rendered;
       padre.querySelector(".load-post").classList.add("remove");
    })
    .catch(err => {
        console.warn(err);
        let msg = err.statusText || "Ocurrio un error";
        $posts.innerHTML = `<p>Error: <b>${err.status}</b> : ${err.statusText}</p>`;
        $loader.classList.add("hide");
    });
}

document.addEventListener("DOMContentLoaded", e => {
    getSiteInfo();
    getSitePosts();
});


document.addEventListener("click", e=> {
    
    if(e.target.matches(".post-summary")){
        let postId = e.target.dataset.postid;
        let padre = e.target.parentElement;
        if(!padre.querySelector("article").textContent)
            getIndividualPost(postId, padre);
    }
});

window.addEventListener("scroll", e => {
    const{scrollTop, clientHeight, scrollHeight} = document.documentElement;
    // console.log(scrollTop, clientHeight, scrollHeight);

    if((scrollTop + clientHeight + 1) >= scrollHeight){
        console.log("Final alcanzado");
        page++;
        getSitePosts();
    }
});


