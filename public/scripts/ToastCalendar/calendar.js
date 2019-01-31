

$(document).ready(function(){
    console.log("jQuery up and running for calendar");


    let dateTest = "2019-01-02"
    let result =moment(dateTest).format('dddd')
    console.log(result)


var Calendar = tui.Calendar;

// default keys and styles
var themeConfig = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#135de6',
    'common.dayname.color': '#333',
    'common.today.color': '#135de6',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',
    

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'white',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px 17px 17px',

    // week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'inherit',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#333',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeftTimezoneLabel.height': '20px',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.pastTime.color': '#333',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

    // week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};

$('.changeViewDay').on('click',
(e) => {
e.preventDefault()
 calendar.changeView('day', true)});

 $('.changeViewWeek').on('click',
(e) => {
e.preventDefault()
 calendar.changeView('week', true)});

 $('.changeViewMonth').on('click',
(e) => {
e.preventDefault()
 calendar.changeView('month', true)});

 $('.moveForward').on('click',
 (e) => {
 e.preventDefault()
  calendar.next()});

  $('.moveBack').on('click',
  (e) => {
  e.preventDefault()
   calendar.prev()});

   $('.createScheduleOpen').on('click',
  (e) => {
  e.preventDefault()
  openCreationPopup(schedule)
});


 
var calendar = new Calendar('#calendar', {
    defaultView: 'week',
    taskView: false,
    scheduleView: true,
    theme: themeConfig,
    template: {
    // monthGridHeader: function(model) {
    //     var date = new Date(model.date);
    //     var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>' +'Test Header';
    //     return template;
    // },
    milestoneTitle: function() {
        return 'Milestone';
    },
    monthMoreTitleDate: function() {
        return 'TitleDate';
    },
    task: function(schedule) {
        return '&nbsp;&nbsp;#' + schedule.title + "taskFunction";
    },
    taskTitle: function() {
        return '<label><input type="checkbox" />Task</label>' + "taskTitleFunction";
    },
    allday: function(schedule) {
        return schedule.title + ' <i class="fa fa-refresh"></i>';
    },
    alldayTitle: function() {
        return 'All Day';
    },
    time: function(schedule) {
        return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start + " time in UTC";
        
    },
    monthMoreTitleDate: function(date) {
        date = new Date(date);
        return tui.util.formatDate('MM-DD', date) + '(' + daynames[date.getDay()] + ')';
    },
    monthMoreClose: function() {
        return '<i class="fa fa-close"></i>';
    },
    // monthGridHeader: function(model) {
    //     var date = new Date(model.date);
    //     var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
    //     // var today = model.isToday ? 'TDY' : '';
    //     // if (today) {
    //     //     template += '<span class="tui-full-calendar-weekday-grid-date-decorator">' + today + '</span>';
    //     // }
    //     // if (tempHolidays[date.getDate()]) {
    //     //     template += '<span class="tui-full-calendar-weekday-grid-date-title">' + tempHolidays[date.getDate()] + '</span>';
    //     // }
    //     return template;
    // },
    monthGridHeaderExceed: function(hiddenSchedules) {
        return '<span class="calendar-more-schedules">+' + hiddenSchedules + '</span>';
    },

    // monthGridFooter: function() {
    //     return '<div class="calendar-new-schedule-button">New Schedule</div>';
    // },

    monthGridFooterExceed: function(hiddenSchedules) {
        return '<span class="calendar-footer-more-schedules">+ See ' + hiddenSchedules + ' more events</span>';
    },
    // weekDayname: function(dayname) {
    //     return '<span class="calendar-week-dayname-name">' + dayname.dayName + '</span><br><span class="calendar-week-dayname-date">' + dayname.date + '</span>';
    // },
    monthDayname: function(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    },
    timegridDisplayPrimayTime: function(time) {
        var meridiem = time.hour < 12 ? 'am' : 'pm';
        var hourPacific = time.hour < 13 ? time.hour : (time.hour -12)

        return hourPacific + '' + meridiem;
    },
    timegridDisplayTime: function(time) {
        return time.hour + ':' + time.minutes;
    },
    goingDuration: function(model) {
        var goingDuration = model.goingDuration;
        var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
        var minutes = goingDuration % SIXTY_MINUTES;

        return 'GoingTime ' + hour + ':' + minutes;
    },
    comingDuration: function(model) {
        var goingDuration = model.goingDuration;
        var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
        var minutes = goingDuration % SIXTY_MINUTES;

        return 'ComingTime ' + hour + ':' + minutes;
    },
    popupDetailRepeat: function(model) {
        return model.recurrenceRule;
    },
    popupDetailBody: function(model) {
        return model.body;
    }
    },
        week: {
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: false,
            hourStart: 5,
            hourEnd: 24
            },
        month: {
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: false
            }
        // calendars: []
        // useCreationPopup: false,
        // useDetailPopup: false
        
    
});




// Create Schedules
calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'Cleaning Event 1',
        category: 'time',
        dueDateClass: '',
        start: '2019-01-28T10:00:00',
        end: '2019-01-28T11:30:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'Cleaning Event 2',
        category: 'time',
        dueDateClass: '',
        start: '2019-01-29T12:30:00',
        end: '2019-01-29T13:30:00'
        // isReadOnly: true    // schedule is read-only
    }
]);


calendar.on('beforeCreateSchedule', function(event) {
    var guide = event.guide;
    // use guideEl$'s left, top to locate your schedule creation popup
    var guideEl$ = guide.guideElement ?
         guide.guideElement : guide.guideElements[Object.keys(guide.guideElements)[0]];

    // after that call this to hide the creation guide
    guide.clearGuideElement();
})

console.log(calendar.getViewName())

calendar.on('clickDayname', function(event) {
    console.log(event.date)
    if (calendar.getViewName() === 'week') {
        calendar.setDate(new Date(event.date));
        calendar.changeView('day', true);
    }
});

calendar.on('beforeUpdateSchedule', function(event) {
    var schedule = event.schedule;
    var startTime = event.start;
    var endTime = event.end;
    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        start: startTime,
        end: endTime
    });
});


calendar.on('clickMore', function(event) {
    console.log('clickMore', event.date, event.target);
});

calendar.on({
    'clickSchedule': function(e) {
        console.log('clickSchedule', e);
    },
    'beforeCreateSchedule': function(e) {
        console.log('beforeCreateSchedule', e);
        // open a creation popup
        
        // If you dont' want to show any popup, just use `e.guide.clearGuideElement()`
        
        // then close guide element(blue box from dragging or clicking days)
        e.guide.clearGuideElement();
    },
    'beforeUpdateSchedule': function(e) {
        console.log('beforeUpdateSchedule', e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
    },
    'beforeDeleteSchedule': function(e) {
        console.log('beforeDeleteSchedule', e);
        cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    }
});

})