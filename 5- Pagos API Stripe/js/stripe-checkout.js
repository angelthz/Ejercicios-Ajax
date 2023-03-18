import STRIPE_KEYS from "./stripe-keys.js";

//console.log(STRIPE_KEYS);

//dom variables

//contenedor 
const tacos = document.getElementById("tacos");
//template
const tacoTemplate = document.createDocumentFragment();


//variables para peticiones
const fetchOptions = {
    headers: {
        "Authorization": `Bearer ${STRIPE_KEYS.secretKey}`
    }
}


//peticiones
fetch("https://api.stripe.com/v1/products",fetchOptions)
.then(res => {
    console.log(res);
    return res.json();
})
.then(data => console.log(data));

fetch("https://api.stripe.com/v1/prices",fetchOptions)
.then(res => {
    console.log(res);
    return res.json();
})
.then(data => console.log(data));