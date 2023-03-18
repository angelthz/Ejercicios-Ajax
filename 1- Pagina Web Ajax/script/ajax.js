//usando fetch 
//variables
const mainContainer = document.getElementById("main-container");


async function getPage(docName){
    try{
        let res = await fetch(`http://127.0.0.1:5500/${docName}`);
        let data = await res.text();
        if(!res.ok) throw{code: res.status}
        console.log(data);
        mainContainer.innerHTML = data;
        
    }
    catch(err){
        console.log(err)
    }
}



document.addEventListener("DOMContentLoaded", e =>{
    getPage("assets/home.html");
});

document.addEventListener("click", e => {
    if(e.target.matches(".link")){
        e.preventDefault();
        console.log(e.target.getAttribute("href"));
        getPage(e.target.getAttribute("href"));
    }
});

//getPage("products");