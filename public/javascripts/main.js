

start = () => {
    var nombre = document.getElementById("Banda")
    var modelos = document.getElementById("opciones-Genero");
    var marcas = document.getElementById("opciones-Vocalista");
    var tipos = document.getElementById("opciones-NumAlbunes");
    var precio = document.getElementById("Precio");
    let listaGeneros = ["rock", "indie pop", "gospel", "country"];
    let listaVocalista = ["chris-martin", "adelle", "alexis", "husserl", "camilo", "keith"];
    let listaBandas = ["Mychemical romance", "paramore", "coldplay", "ledzeppelin", "eternamente"]
    llenar = () => {

        listaModelos.forEach(element => {
            let opcion = document.createElement("option");
            opcion.innerHTML = element;
            modelos.appendChild(opcion);
        });

        listaMarca.forEach(element => {
            let opcion = document.createElement("option");
            opcion.innerHTML = element;
            marcas.appendChild(opcion);
        });

        listaTipos.forEach(element => {
            let opcion = document.createElement("option");
            opcion.innerHTML = element;
            tipos.appendChild(opcion);
        });


    }
    llenar();

    var formulario = document.getElementById("form-principal")
    var btn_crear = document.getElementById("btn-principal");
    var btn_actualizar = document.getElementById("btn-actualizar");
    var btn_limpiar = document.getElementById("btn-limpiar");
    var tabla = document.getElementById("bodytable");
    var ascen = document.getElementById("asc");
    var des = document.getElementById("des");
    var anterior = document.getElementById("anterior");
    var siguiente = document.getElementById("siguiente");

    getWatchs = (page, orden, e) => {
        if (e) {
            e.preventDefault();
        }
        let params = {
            page: page, 
            orden: orden
        };
        

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
            .join("&");
        let options_and_body = {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let auxUrl = "/api/watches/" + "?" + query;;
        console.log(auxUrl);
        console.log(options_and_body);
        tabla.innerHTML = "";

        fetch(auxUrl, options_and_body)
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            .then(response => {
                siguiente.removeAttribute("page");

                anterior.removeAttribute("page");
                if(response.paginas > 1 && page < response.paginas && page > 1){
                    anterior.setAttribute("page", parseInt(page) - 1);
                    
                    siguiente.setAttribute("page", parseInt(page) + 1)
                }else{
                    if(page == 1){
                        
                        anterior.setAttribute("page", parseInt(page));
                        if(response.paginas > 1){
                            let atributo = parseInt(page) + 1;
                            console.log(atributo);
                            siguiente.setAttribute("page", parseInt(page) + 1)
                            console.log(siguiente.getAttribute("page"))
                        }else{
                            siguiente.setAttribute("page", parseInt(page))
                        }
                        
                    }else{
                        anterior.setAttribute("page", parseInt(page) - 1);
                        siguiente.setAttribute("page", parseInt(page))
                    }
                }
                
                console.log("success: ", response);

                let contador = (page - 1) * 10 + 1;
                response.docs.forEach(element => {
                    let row = document.createElement("tr");
                    let th = document.createElement("th");
                    th.innerHTML = contador;
                    let id = document.createElement("td");
                    id.innerHTML = element._id;
                    let nombre2 = document.createElement("td");
                    nombre2.innerHTML = element.name;
                    let modelo = document.createElement("td");
                    modelo.innerHTML = element.modelo;
                    let marca = document.createElement("td");
                    marca.innerHTML = element.marca;
                    let tipo = document.createElement("td");
                    tipo.innerHTML = element.tipo;
                    let precio2 = document.createElement("td");
                    precio2.innerHTML = element.precio;
                    let opciones = document.createElement("td");

                    let btnBorrar = document.createElement("button");
                    btnBorrar.innerHTML = "Borrar";
                    btnBorrar.classList.add("button");
                    btnBorrar.classList.add("is-danger");
                    btnBorrar.classList.add("is-small");
                    btnBorrar.classList.add("is-outlined");

                    btnBorrar.addEventListener("click", function (e) {
                        e.preventDefault();
                        let options_and_body = {
                            method: "DELETE",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        };
                        options_and_body["body"] = JSON.stringify({
                            _id: element._id
                        });

                        fetch("/api/watches/", options_and_body)
                            .then(res => res.json())
                            .catch(error => {
                                console.log("error: ", error);
                                Swal.fire("Hubo un problema para borrar el laboratorio", error, "error");
                            })
                            .then(response => {
                                console.log("success: ", response);
                                Swal.fire(response.msg, "Continua gestionado laboratorios", response.ok);
                            })
                            .then(() => {})
                            .then(() => {
                                console.log("esperar medio segundo");
                                setTimeout(() => {
                                    getWatchs(1, e);
                                }, 500);
                            });

                    });
                    opciones.appendChild(btnBorrar);


                    let btnEditar = document.createElement("button");
                    btnEditar.innerHTML = "Editar";
                    btnEditar.classList.add("button");
                    btnEditar.classList.add("is-primary");
                    btnEditar.classList.add("is-small");
                    btnEditar.classList.add("is-outlined");
                    btnEditar.addEventListener("click", function (e) {
                        console.log("entre editar")
                        e.preventDefault();
                        btn_actualizar.classList.remove("is-hidden");

                        nombre.disabled = true;
                        e.preventDefault();


                        nombre.value = element.name;
                        nombre.setAttribute("_id", element._id);
                        precio.value = element.precio;

                        for (let index = 0; index < modelos.options.length; index++) {
                            if (modelos.options[index].value == element.modelo) {
                                modelos.selectedIndex = index;
                            }
                        }

                        for (let index = 0; index < marcas.options.length; index++) {
                            if (marcas.options[index].value == element.marca) {
                                marcas.selectedIndex = index;
                            }
                        }


                        for (let index = 0; index < tipos.options.length; index++) {
                            if (tipos.options[index].value == element.tipo) {
                                tipos.selectedIndex = index;
                            }
                        }
                    });
                    opciones.appendChild(btnEditar);

                    row.appendChild(th);
                    row.appendChild(id);
                    row.appendChild(nombre2);
                    row.appendChild(modelo);
                    row.appendChild(marca);
                    row.appendChild(tipo);
                    row.appendChild(precio2);
                    row.appendChild(opciones);
                    tabla.appendChild(row);
                    contador++;
                });
            });

            
           





    };

    anterior.addEventListener("click", (e)=>{
        e.preventDefault();
        if(ascen.getAttribute("ordenar") == "1"){
            getWatchs(anterior.getAttribute("page"), 1, e);    
        }else{
            getWatchs(anterior.getAttribute("page"), -1, e);
        }
        
        console.log(anterior.getAttribute("page"));
        console.log(siguiente.getAttribute("page"));
    });
    siguiente.addEventListener("click", (e)=>{
        e.preventDefault();
        if(ascen.getAttribute("ordenar") == "1"){
            getWatchs(siguiente.getAttribute("page"), 1, e);
        }else{
            getWatchs(siguiente.getAttribute("page"), -1, e);
        }
        console.log(anterior.getAttribute("page"));
        console.log(siguiente.getAttribute("page"));
    });


   
    ascen.addEventListener("click", (e) => {
        ascen.setAttribute("ordenar", "1")
        des.setAttribute("ordenar", "0");
        e.preventDefault();
        getWatchs(1,1,e)

    });

    des.addEventListener("click", (e)=>{
        ascen.setAttribute("ordenar", "0")
        des.setAttribute("ordenar", "1");
        e.preventDefault();
        getWatchs(1,-1, e);
    });


    btn_actualizar.addEventListener("click", (e) => {
        e.preventDefault();

        if (nombre.value && precio.value && nombre.getAttribute("_id")) {
            console.log(marcas.value)
            let body = {
                name: nombre.value,
                id: nombre.getAttribute("_id"),
                precio: parseFloat(precio.value),
                modelo: modelos.value,
                marca: marcas.value,
                tipo: tipos.value
            };

            let options_and_body = {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };


            options_and_body["body"] = JSON.stringify(body);
            fetch('/api/watches/', options_and_body)
                .then(res => res.json())
                .catch(error => {
                    console.log("error: ", error);
                    Swal.fire("Hubo un problema para actualizar el watch", error, "error");
                })
                .then(response => {
                    console.log("success: ", response);
                    Swal.fire(response.msg, "Continua gestionado watchs", response.ok);
                })
                .then(() => {

                    btn_limpiar.click();
                })
                .then(() => {
                    console.log("esperar medio segundo");
                    setTimeout(() => {
                        getWatchs(1, e)
                    }, 500);
                });
        }
    });



    btn_limpiar.addEventListener("click", e => {
        e.preventDefault();
        console.log(btn_actualizar.classList);
        btn_actualizar.classList.remove("is-hidden")
        btn_actualizar.classList += btn_actualizar.classList + " is-hidden";
        formulario.reset();
        nombre.disabled = false;
    });

    crearWatch = (e) => {
        e.preventDefault();
        if (nombre.value && modelos.value && marcas.value && tipos.value) {
            try {

                let watch = {
                    name: nombre.value,
                    modelo: modelos.value,
                    marca: marcas.value,
                    tipo: tipos.value,
                    precio: parseFloat(precio.value)
                };

                e.preventDefault();
                let options_and_body = {
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                URL = "/api/watches/";
                options_and_body["body"] = JSON.stringify(watch);
                options_and_body["method"] = "POST";

                fetch(URL, options_and_body)
                    .then(res => res.json())
                    .catch(error => {
                        console.log("error: ", error);
                        Swal.fire("Hubo un problema para crear el laboratorio", error, "error");
                    })
                    .then(response => {
                        console.log("success: ", response);
                        Swal.fire(response.msg, "Continua gestionado laboratorios", response.ok);
                        getWatchs(1, e);
                    })
                    .then(() => {
                        formulario.reset();
                    })
                    .then(() => {
                        console.log("esperar medio segundo");

                    });



            } catch (error) {
                Swal.fire("Ingrese los campos necesarios", "corrige los problemas", "error");
            }
        } else {
            Swal.fire("Ingrese los campos necesarios", "corrige los problemas", "error");
        }

    };
    btn_crear.addEventListener("click", crearWatch)

    getWatchs(1,1);


};





window.onload = start;