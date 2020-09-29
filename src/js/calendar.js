var calendarDiv = document.getElementById('calendar');


var calendar = new FullCalendar.Calendar(calendarDiv, {
    locales: 'es', 
    initialView: 'dayGridMonth', 
    headerToolbar: { 
        left: 'prev,crearEntrada', 
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
    customButtons: { 
        crearEntrada: {
            text: 'Nuevo evento', 
            click: ()=>{ 
                abrirModal('crear'); 
                vaciarCampos(); 
            }
        }
    }, 
    events: "./eventos.php", 
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
    editable: true
    
});

calendar.render();