export default function includeHtml(){
    const htmlEls = document.querySelectorAll("[data-include]");
    console.log(htmlEls);
    
    //obtener recursos con XHR
    const xhrGet = (options) => {
        let {url, method, catchRes, catchErr, data} = options;
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", e => {
            if(xhr.readyState !== 4) return;
            
            if(xhr.status >= 200 && xhr.status < 300){
                catchRes(xhr.response);
            }
            else{
                catchErr({code: xhr.status, message: xhr.statusText});
            }
        });

        xhr.open(method, url);
        xhr.send();
    }

    htmlEls.forEach(el => {
        console.log(el.dataset.include)
        xhrGet({
            url: `http://127.0.0.1:5500/${el.dataset.include}`,
            method: "GET",
            catchRes: (res) => {
                console.log(res);
                el.outerHTML = res;
            },
            catchErr: (err) => {
                console.warn(err);
            }
        })
    });
}