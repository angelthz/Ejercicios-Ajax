//dom
//select de estados
const estadoSelect = document.getElementById("estado-sel");
//select de colonias
const municipios = document.getElementById("municipios-sel");

//variables
const TOKEN = "pruebas";

//delete all nodes
function removeAllChilds(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
    element.innerHTML = "";
}


//funcion asincrona
async function getEstados(url){
    try{
        let getRequest = await fetch(url);
        let data = await getRequest.json();
        // console.log(getRequest)
        // console.log(data)

        if(!getRequest.ok) throw {
            request:{
                code: getRequest.status, 
                message: getRequest.statusText
            },
            data:{
                code: data.code_error,
                message: data.error_message
            }
        };

        console.log(data.response.estado);
        data.response.estado.forEach(el => {
            let option = document.createElement("option");
            option.setAttribute("value",el);
            option.textContent = el;
            estadoSelect.appendChild(option);
        });
        estadoSelect.removeAttribute("disabled")
    }
    catch(err){
        console.warn(err);
    }
}

document.addEventListener("DOMContentLoaded", e => {
    getEstados(`https://api.copomex.com/query/get_estados?token=${TOKEN}`);
});

document.addEventListener("input", async e => {
    if(e.target === estadoSelect){
        
        
        try{
            removeAllChilds(municipios);
            // municipios.setAttribute("disabled","true");
            let municipiosRequest = await fetch(`https://api.copomex.com/query/get_municipio_por_estado/${e.target.value}?token=${TOKEN}`);
            let municipiosData = await municipiosRequest.json();
            // console.log(municipiosRequest, municipiosData)
            if(!municipiosRequest.ok) throw {
                request:{
                    code: municipiosRequest.status, 
                    message: municipiosRequest.statusText
                },
                data:{
                    code: municipiosData.code_error,
                    message: municipiosData.error_message
                }
            }; 

            console.log(municipiosData.response.municipios);
            
            municipiosData.response.municipios.forEach(el => {
                let option = document.createElement("option");
                option.setAttribute("value", el);
                option.textContent = el;
                municipios.appendChild(option);
            });
            municipios.removeAttribute("disabled");
        }
        catch(err){
            console.warn(err);
        }
    }
});

