//DOM
//input de tipo file
const inputFiles = document.getElementById("input-files");

//contenedor para mostrar la lista de archivos
const fileList = document.querySelector(".uploader-list");

async function uploadFiles(file){
    console.log(file);
    try{
        const formulario = new FormData();
        formulario.append("file",file);

        const url = "php/uploader.php";
        const optiosn = {
            headers: {
                'enc-type': "multipart/form-data"
            },
            body: formulario
        };

        let response = await fetch(url, optiosn);
        
        if(!response.ok) throw {response}

    }
    catch(err){
        console.warn(response);
    }
}


document.addEventListener("change", e => {
    if(e.target === inputFiles){
        const selectedFiles = Array.from(e.target.files);
        
        selectedFiles.forEach(file => {
            uploadFiles(file);
        });
    }
})