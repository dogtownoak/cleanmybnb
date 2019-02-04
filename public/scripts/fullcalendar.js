// import moment = require("moment");

$(document).ready(function(){
    console.log("jQuery up and running: full calendar");
    
    $('.viewMonth').on('click', viewMonth)
    $('.viewAgendaDay').on('click', viewAgendaDay)
    $('.viewAgendaWeek').on('click', viewAgendaWeek)
    $('.viewListWeek').on('click', viewListWeek)
    
    
;

    let indexCleaningEventUrl = 'users/housingunits/cleaningevents/index'
    let getUserUrl = '/users/'

    $.ajax({
        method: 'GET',
        url: indexCleaningEventUrl,
        // json: true,
        // contentType : 'application/json',
        // data: JSON.stringify(signUpData),
        success: onSuccess,
        error: onError
    });
        function onError ( err ) {
            console.log( err );
            console.log("post error",err)
        }
        function onSuccess (cleaningEvents) {
            console.log(`CleaningEvents:`, cleaningEvents)

        
    $('#calendar').fullCalendar({
        defaultView: 'month',
            
        // sample callback function
        eventClick: function(calEvent, jsEvent, view) {
            console.log(`Cleaning Event Clicked:`, calEvent)
            console.log(calEvent.title)

            let card2 =(
                `<p>Calendar Event Title: ${calEvent.title}</p>
                <button data-id=${calEvent._id} class="ui big button teal assignCleanerButton">Assign Cleaner</button>
                <button data-id=${calEvent._id} class="ui big button teal deleteCleanerButton">Delete Cleaner</button>
                    </div>`
            )
            $('.calCEModalWrapper').append(card2)



            if (event.url) {
                window.open(event.url);
                return false;
            }
            // alert('Event: ' + calEvent.title);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);
        
            // change the border color just for fun
            $(this).css('border-color', 'red');
        
        },
        header: {
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
            },
        selectable: true,
        selectableHelper: true,
        selectHelper: true,
        editable: true,
        eventStartEditable: true,
        eventDurationEditable: true,
        eventResourceEditable: true,       
        eventLimit: true,
        droppable: true,
        nowIndicator: true,
        events: cleaningEvents

        
    
    })
}

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

    let updateCleaningEventUrl = '/users/housingunits/cleaningevents/update'

    $('.calCEModalWrapper').on('click', '.assignCleanerButton', function() {
        cleaningEventId = $(this).data()
        console.log(cleaningEventId)
        console.log("assign cleaner clicked")
        addCleanerCleaningEvent()
        if(localStorage.cleaner === true ){
            console.log("I'm a cleaner")
            addCleanerCleaningEvent()
        } else {
            console.log("Hey you are not a cleaner!")
        }
    })
    
    $('.calCEModalWrapper').on('click', '.deleteCleanerButton', function() {
        cleaningEventId = $(this).data()
        console.log(cleaningEventId)
        console.log("delete cleaner clicked")
        deleteCleanerCleaningEvent()
        if(localStorage.cleaner === true ){
            console.log("I'm a cleaner")
        } else {
            console.log("Hey you are not a cleaner!")
        }
    })

    // function addCleanerCleaningEvent(){
    //     console.log("cleaner ajax function")
    //     let cleanerUpdate = {
    //         _id: cleaningEventId.id,
    //         cleanerId: localStorage.userId
    //     }
    
    //     $.ajax({
    //         method: 'PATCH',
    //         url: updateCleaningEventUrl,
    //         json: true,
    //         contentType : 'application/json',
    //         data: JSON.stringify(cleanerUpdate),
    //         success: onSuccess,
    //         error: onError
    //     });
    //         function onError ( err ) {
    //         console.log( err );
    //         console.log("PATCH update error",err)
    //         }
    //         function onSuccess (updatedCleaningEvent) {
    //         console.log(`Cleaner on Cleaning Event Updated:`, updatedCleaningEvent)
    //         }   
    //         };

    function addCleanerCleaningEvent(){
        console.log("cleaner ajax function")
        
        let userId = localStorage.userId 
                $.ajax({
                    method: 'GET',
                    url: getUserUrl + userId,
                    success: onSuccess,
                    error: onError
                });
                    function onError ( err ) {
                        console.log( err );
                        console.log("post error",err)
                    }
                    function onSuccess (user) {
                        console.log(`Cleaning User added to Cleaning Event:`, user)
                        $('#cleanerAssigned').html(`Cleaner: ${user[0].name}`)
                        // location.reload()
    
                    let cleanerUpdate = {
                                        _id: cleaningEventId.id,
                                        cleanerId: userId,
                                        title: `Cleaner Assigned ${user[0].name}, cell: ${user[0].cellPhone}, company: ${user[0].company}`,
                                        backgroundColor: "#549499"
                                        }
                    console.log(cleanerUpdate)
                    console.log("PATCH update cleaner")
                    $.ajax({
                        method: 'PATCH',
                        url: updateCleaningEventUrl,
                        json: true,
                        contentType : 'application/json',
                        data: JSON.stringify(cleanerUpdate),
                        success: onSuccess,
                        error: onError
                    });
                    function onError ( err ) {
                    console.log( err );
                    console.log("PATCH update error",err)
                    }
                    function onSuccess (updatedCleaningEvent) {
                    console.log(`Cleaner on Cleaning Event Updated:`, updatedCleaningEvent)
                        location.reload()
                    }   
                    }
    }
    
    function deleteCleanerCleaningEvent(){
        console.log("cleaner delete ajax")
        let cleanerUpdate = {
            _id: cleaningEventId.id,
            cleanerId: null,
            backgroundColor: "#ED6665",
            title: "Cancelation: Cleaner Needed"
        }
    
        $.ajax({
            method: 'PATCH',
            url: updateCleaningEventUrl,
            json: true,
            contentType : 'application/json',
            data: JSON.stringify(cleanerUpdate),
            success: onSuccess,
            error: onError
        });
            function onError ( err ) {
            console.log( err );
            console.log("PATCH update error",err)
            }
            function onSuccess (updatedCleaningEvent) {
            console.log(`Cleaner on Cleaning Event Updated:`, updatedCleaningEvent)
            location.reload()
            }
    }










})