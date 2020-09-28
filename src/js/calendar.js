var calendarDiv = document.getElementById('calendar');


var calendar = new FullCalendar.Calendar(calendarDiv, {
    locales: 'es', 
    initialView: 'dayGridMonth', 
    headerToolbar: { 
        left: 'prev', 
        center: 'title', 
        right: 'next',

    },
    footerToolbar: {
        left: 'prevYear',    
        center: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth,today',
        right: 'nextYear'
    }, 
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Listado'
    }, 
    events: [
        {
            title: 'Evento de prueba 1',
            description: 'Esta es una descripción de prueba', 
            start: '2020-09-20 12:00:00', 
            end: '2020-09-25 12:00:00', 
            color: 'yellow', 
            textColor: 'red', 
        },
        {
            title: 'Evento de prueba 2',
            descripcion: 'Este es otro evento de un solo día',
            start: '2020-09-26',
            color: 'red',
            textColor: 'yellow'
        },
        {
            title: 'Evento de prueba 3',
            description: 'Este evento dura un tiempo determinado',
            start: '2020-09-27 08:00:00', 
            end: '2020-09-27 10:00:00', 
            color: 'blue',
            textColor: 'green'
        }        
    ], 
    dateClick: (info) => {
        abrirModal('crear');

        var fecha = document.getElementById('fechaInicio');
        fecha.value = info.dateStr; 
        
    },
    eventClick: (info) => {
        document.getElementById('tituloEntrada').innerHTML = info.event.title;
        document.getElementById('titulo').value = info.event.title;
        fechaInicio = cortarFecha(info.event.startStr);
        document.getElementById('fechaInicio').value = fechaInicio[0];

        if(fechaInicio.length > 1){
            document.getElementById('horaInicio').value = fechaInicio[1];
        }

        fechaFin = cortarFecha(info.event.endStr);
        document.getElementById('fechaFin').value = fechaFin[0];

        if(fechaFin.length > 1){
            document.getElementById('horaFin').value = fechaFin[1];
        }

        if(info.event.extendedProps.description){
            document.getElementById('descripcion').value = info.event.extendedProps.description;
        }
        
        document.getElementById('color').value = info.event.backgroundColor;
        document.getElementById('textColor').value = info.event.textColor;

        abrirModal('editar');
    },
    editable: true, 
});

botonCrear = document.getElementById('crear');
botonCrear.addEventListener('click', ()=> {
    recuperarCampos();
    calendar.addEvent(recuperarCampos());
    cerrarModal();
    vaciarCampos();

});

// capturamos el botón de editar:
botonEditar = document.getElementById('editar');
botonEditar.addEventListener('click', ()=>{
    console.log(calendar.getEventSourceById(1));
    // cerramos el modal:
    cerrarModal();
    // ahora utilizamos este metodo para actualizar el calendario:
    calendar.refetchEvents();
    // vaciamos los campos:
    vaciarCampos();
});

var modal = document.getElementById('modal');

function abrirModal(permisos){

    if(permisos == 'crear'){
        document.getElementById('editar').style.cssText = "display: none";
        document.getElementById('crear').style.cssText = "display: block";
    }else{
        document.getElementById('editar').style.cssText = "display: block";
        document.getElementById('crear').style.cssText = "display: none";
    }

    modal.style.cssText = "display: flex;";
    window.setTimeout(()=>{
        modal.style.cssText += "opacity: 1; transition: 0.5s";
    }, 10);
}

function recuperarCampos(){
    var nuevoEvento = [];
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
    // añadimos aquí vaciarCampos ya que sino al ver un evento y añadir otro se verá:
    vaciarCampos();
});

function cerrarModal(){
    modal.style.cssText += 'opacity: 0; transition: 0.5s';
    window.setTimeout(()=>{
        modal.style.cssText = 'display: none';
    }, 500);
}

function vaciarCampos(){
    document.getElementById('titulo').value = '';
    document.getElementById('horaInicio').value = '';
    document.getElementById('fechaFin').value = '';
    document.getElementById('horaFin').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('color').value = '#00C217';
    document.getElementById('textColor').value = '#0018CC';
}

// creamos el metodo que nos ayudara a arreglar la fecha y hora:
function cortarFecha(fecha){
    // cortamos a partir de la T que separa la fecha de la hora:
    fecha = fecha.split("T");
    // si existía hora le vamos a quitar la zona horaria para que no se muestre:
    if(fecha[1]){
        fecha[1] = fecha[1].substr(0,8);
    }
    // retornamos la fecha:
    return fecha;
}

calendar.render();