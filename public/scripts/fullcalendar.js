// import moment = require("moment");

$(document).ready(function(){
    console.log("jQuery up and running: full calendar");
    
    $('.viewMonth').on('click', viewMonth)
    $('.viewAgendaDay').on('click', viewAgendaDay)
    $('.viewAgendaWeek').on('click', viewAgendaWeek)
    $('.viewListWeek').on('click', viewListWeek)
    
  
    $('#calendar').fullCalendar({
        defaultView: 'month',
        // sample callback function
        eventClick: function(calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.title);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);
        
            // change the border color just for fun
            $(this).css('border-color', 'red');
        
        },
        header: {
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
            },
        selectable: true,
        selectableHelper: true,
        editable: true,
        eventStartEditable: true,
        eventDurationEditable: true,
        eventResourceEditable: true,       
        eventLimit: true,
        droppable: true,

        events: [
            {
                title  : 'Cleaning',
                start  : '2019-01-19',
                end    : '2019-01-20'
            },
            {
                title  : 'Checkout',
                start  : '2019-01-18T11:30:00',
                end    : '2019-01-18T12:30:00'
            },
            {
                title  : 'Cleaning',
                start  : '2019-01-18T11:30:00',
                end    : '2019-01-18T12:30:00'
            },
            {
                title  : 'Checkout',
                start  : '2019-01-18T11:30:00',
                end    : '2019-01-18T12:30:00'
            },
            {
                title  : 'Cleaning',
                start  : '2019-01-18T11:30:00',
                end    : '2019-01-18T12:30:00'
            },
            {
                title  : 'Checkout',
                start  : '2019-01-09T12:30:00',
                allDay : false // will make the time show
            },
            {
                title : "Cleaning Event Request 1",
                start : "2019-01-29T11:46:31Z",
                end : "2019-01-29T16:46:31Z",
                url : "https://google.com",
            }
        ]
    
    })

    function viewMonth(e){
        e.preventDefault()
        $('#calendar').fullCalendar('changeView', 'month'); 
    }
    function viewAgendaDay(e){
        e.preventDefault()
        $('#calendar').fullCalendar('changeView', 'agendaDay'); 
    }
    function viewAgendaWeek(e){
        e.preventDefault()
        $('#calendar').fullCalendar('changeView', 'agendaWeek'); 
    }
    function viewListWeek(e){
        e.preventDefault()
        $('#calendar').fullCalendar('changeView', 'listWeek'); 
    }





})