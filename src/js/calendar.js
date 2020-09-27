// capturamos el div:
var calendarDiv = document.getElementById('calendar');

// construimos el objeto calendario:
var calendar = new FullCalendar.Calendar(calendarDiv, {
    initialView: 'dayGridMonth', // establecemos que la vista inicial sea todo el mes.
});

// cargamos el calendario:
calendar.render();