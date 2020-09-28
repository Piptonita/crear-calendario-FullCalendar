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
        abrirModal();

        var fecha = document.getElementById('fechaInicio');
        fecha.value = info.dateStr; 
        
    }
});

// capturamos el botón de crear evento y establecemos una acción:
botonCrear = document.getElementById('crear');
botonCrear.addEventListener('click', ()=> {
    // aquí entonces llamamos a la función que se encargará de recuperar los campos del calendario:
    recuperarCampos();
    // Añadimos el evento al calendario:
    calendar.addEvent(recuperarCampos());
    // y para finalizar cerramos el modal:
    cerrarModal();
    // y vaciamos los campos:
    vaciarCampos();

});

var modal = document.getElementById('modal');

function abrirModal(){
    modal.style.cssText = "display: flex;";
    window.setTimeout(()=>{
        modal.style.cssText += "opacity: 1; transition: 0.5s";
    }, 10);
}

// creamos la función que captura los campos:
function recuperarCampos(){
    // creamos un objeto:
    var nuevoEvento = [];
    // recuperamos el valor de todos los campos 
    nuevoEvento.title = document.getElementById('titulo').value;
    // este campo combina la fecha y hora:
    if(document.getElementById('horaInicio').value != ''){
        nuevoEvento.start = document.getElementById('fechaInicio').value + " " + document.getElementById('horaInicio').value;
    }else{
        nuevoEvento.start = document.getElementById('fechaInicio').value;
    }
    nuevoEvento.end = document.getElementById('fechaFin').value + " " + document.getElementById('horaFin').value;
    nuevoEvento.description = document.getElementById('descripcion').value;
    nuevoEvento.color = document.getElementById('color').value;
    nuevoEvento.textColor = document.getElementById('textColor').value;
    // retornamos los datos:
    console.log(nuevoEvento);
    return nuevoEvento;
}

// creamos independientemente el botón para cerrar el formulario:
var botonCerrar = document.getElementById('cancelar');
botonCerrar.addEventListener('click', ()=>{
    cerrarModal();
});

// creamos también una función para cerrar el modal:
function cerrarModal(){
    // hacemos el modal invisible:
    modal.style.cssText += 'opacity: 0; transition: 0.5s';
    // y un temporizador para esperar a que termine y lo ocultamos:
    window.setTimeout(()=>{
        modal.style.cssText = 'display: none';
    }, 500);
}

// y creamos otra función para vaciar campos:
function vaciarCampos(){
    // establecemos los campos value a '':
    document.getElementById('titulo').value = '';
    document.getElementById('horaInicio').value = '';
    document.getElementById('fechaFin').value = '';
    document.getElementById('horaFin').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('color').value = '#00C217';
    document.getElementById('textColor').value = '#0018CC';
}

calendar.render();