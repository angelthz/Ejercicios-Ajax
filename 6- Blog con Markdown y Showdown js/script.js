document.addEventListener("DOMContentLoaded", e => {
    //DOM
    const contenido = document.querySelector("main");

    //peticion ajax con fetc para solicitar el contenido del archivo md
    fetch("assets/test.md")
    .then( res => res.ok ? res.text() : Promise.reject(res) )
    .then( md =>{
        console.log(md);
        let converter = new showdown.Converter();
        contenido.innerHTML = converter.makeHtml(md);
    })
    .catch(err => console.log(err));
})
