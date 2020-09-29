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
        establecerValores(info);

        abrirModal('editar');
    },
    editable: true,
    eventDrop: (info)=>{
        establecerValores(info);
        sendForm('editar');
    }
    
});

calendar.render();