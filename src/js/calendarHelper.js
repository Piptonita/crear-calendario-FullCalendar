botonCrear = document.getElementById('crear');
botonCrear.addEventListener('click', ()=> {
    sendForm('crear');
    calendar.refetchEvents();
    cerrarModal();
    vaciarCampos();

});

botonEditar = document.getElementById('editar');
botonEditar.addEventListener('click', ()=>{
    cerrarModal();
    calendar.refetchEvents();
    vaciarCampos();
});

botonBorrar = document.getElementById('borrar');
botonBorrar.addEventListener('click', ()=>{
    cerrarModal();
    // le pasamos la opción de borrar:
    sendForm('borrar');
    calendar.refetchEvents();
    vaciarCampos();
})

var modal = document.getElementById('modal');

function abrirModal(permisos){
    if(permisos == 'crear'){
        document.getElementById('editar').style.cssText = "display: none";
        document.getElementById('crear').style.cssText = "display: block";
        document.getElementById('borrar').style.cssText = "display: none";
    }else{
        document.getElementById('editar').style.cssText = "display: block";
        document.getElementById('crear').style.cssText = "display: none";
        document.getElementById('borrar').style.cssText = "display: block";
    }

    modal.style.cssText = "display: flex;";
    window.setTimeout(()=>{
        modal.style.cssText += "opacity: 1; transition: 0.5s";
    }, 10);
}

function recuperarCampos(){
    // cambiamos el tipo de dato ahora por un objeto:
    var nuevoEvento = {};
    nuevoEvento.title = document.getElementById('titulo').value;
    if(document.getElementById('horaInicio').value != ''){
        nuevoEvento.start = document.getElementById('fechaInicio').value + " " + document.getElementById('horaInicio').value;
    }else{
        nuevoEvento.start = document.getElementById('fechaInicio').value;
    }
    nuevoEvento.end = document.getElementById('fechaFin').value + " " + document.getElementById('horaFin').value;
    nuevoEvento.description = document.getElementById('descripcion').value;
    nuevoEvento.color = document.getElementById('color').value;
    nuevoEvento.textColor = document.getElementById('textColor').value;

    return nuevoEvento;
}

var botonCerrar = document.getElementById('cancelar');
botonCerrar.addEventListener('click', ()=>{
    cerrarModal();
    vaciarCampos();
});

function cerrarModal(){
    modal.style.cssText += 'opacity: 0; transition: 0.5s';
    window.setTimeout(()=>{
        modal.style.cssText = 'display: none';
    }, 500);
}

function vaciarCampos(){
    // también tenemos que vaciar el nuevo campo:
    document.getElementById('id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('fechaInicio').value = '';
    document.getElementById('horaInicio').value = '';
    document.getElementById('fechaFin').value = '';
    document.getElementById('horaFin').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('color').value = '#00C217';
    document.getElementById('textColor').value = '#0018CC';
}

function cortarFecha(fecha){
    fecha = fecha.split("T");
    if(fecha[1]){
        fecha[1] = fecha[1].substr(0,8);
    }
    return fecha;
}

function sendForm(opcion){ 
        let data = new FormData(document.getElementById('form'));
        fetch('./eventos.php?accion=' + opcion, {
            method: 'POST', 
            body: data 
        })
        .then((respuesta)=>{
            if(respuesta.ok){
                return respuesta.text();
            }else{
                throw "Error en el envío del formulario";
            }
        })
        .then((texto)=>{
            //console.log(texto);
        })
        .catch((error)=>{
            //console.log(error);
        });
}