var calendarDiv = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarDiv, {
    locales: 'es', // añadimos esta línea en nuestro calendario
    initialView: 'dayGridMonth', 
});

calendar.render();