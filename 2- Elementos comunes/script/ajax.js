//variables del dom
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");

const loadElements = (options) => {
    let {url, method, result, error} = options;
    const myXHR = new XMLHttpRequest();

    myXHR.addEventListener("readystatechange", e => {
        if(myXHR.readyState !== 4) return;
        if(myXHR.status >= 200 && myXHR.status <300){
            result(myXHR.response);
        }
        else{
            let err= {code: myXHR.status, msg: myXHR.statusText};
            error(err);
        }
    });

    myXHR.open(method,`http://127.0.0.1:5500/${url}`);
    myXHR.setRequestHeader("Content-Type", "text/plain");
    myXHR.send();
};




//al terminar la carga del documento html
document.addEventListener("DOMContentLoaded", e => {
    loadElements({
        url: "assets/header.html",
        method: "GET",
        result: (res) =>{
            console.log(res);
            header.innerHTML = res;
        },
        error: (err) =>{
            console.log(err);
        }
    });

    loadElements({
        url: "assets/footer.html",
        method: "GET",
        result: (res) =>{
            console.log(res);
            footer.innerHTML = res;
        },
        error: (err) =>{
            console.log(err);
        }
    });
});