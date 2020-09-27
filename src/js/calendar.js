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
    }, // añadimos la propiedad buttonText y traducimos los botones o ponemos lo que queramos:
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Listado'
    }
});

calendar.render();