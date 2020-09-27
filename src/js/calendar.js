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
    }, // eventos recibe un array con objetos que contienen los detalles de cada evento anotado en el calendario:
    events: [
        {
            title: 'Evento de prueba 1', // le ponemos un título.
            description: 'Esta es una descripción de prueba', // añadimos la descripción, pero esta solo se muestra al hacer click el evento. 
            start: '2020-09-20 12:00:00', // definimos cuando comienza para situarlo en el calendario
            end: '2020-09-25 12:00:00', // y si dura mas de un día podemos definir cuando acaba. Sino lo omitimos
            color: 'yellow', // color del evento, acepta también hexadecimales.
            textColor: 'red', // color del texto, acepta igualmente hexadecimales.
        },
        {
            title: 'Evento de prueba 2',
            descripcion: 'Este es otro evento de un solo día',
            start: '2020-09-26', // para establecer eventos durante todo el día no ponemos la hora.
            color: 'red',
            textColor: 'yellow'
        },
        {
            title: 'Evento de prueba 3',
            description: 'Este evento dura un tiempo determinado',
            start: '2020-09-27 08:00:00', // al tener hora de inicio ya se muestra de otra forma
            end: '2020-09-27 10:00:00', // recuerda que si aquí hay un día siguiente el evento cubrirá todo el día
            color: 'blue',
            textColor: 'green'
        }
        
    ]
});

calendar.render();