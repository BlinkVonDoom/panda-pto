$('document').ready(function () {
    let calendar = document.getElementById("calendar-table");
    let gridTable = document.getElementById("table-body");
    let currentDate = new Date();
    let selectedDate = currentDate;
    let selectedDayBlock = null;
    let globalEventObj = {};

    let calendarDates = []

    function fetchDates() {
        $.ajax({
            url: '/calendars/fetch_dates',
            type: 'GET',
            success: function (data) {
                console.log('test', data)
                return calendarDates.push(data)
            }
        })
    }

    fetchDates()

    function createCalendar(date, side) {
        let currentDate = date;
        let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        let monthTitle = document.getElementById("month-name");
        let monthName = currentDate.toLocaleString("en-US", {
            month: "long"
        });
        let yearNum = currentDate.toLocaleString("en-US", {
            year: "numeric"
        });
        monthTitle.innerHTML = `${monthName} ${yearNum}`;

        if (side == "left") {
            gridTable.className = "animated fadeOutRight";
        } else {
            gridTable.className = "animated fadeOutLeft";
        }

        gridTable.innerHTML = "";

        let newTr = document.createElement("tr");
        let currentTr = gridTable.appendChild(newTr);

        for (let i = 1; i < startDate.getDay(); i++) {
            let emptyDivCol = document.createElement("td");
            currentTr.appendChild(emptyDivCol);
        }

        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        lastDay = lastDay.getDate();

        for (let i = 1; i <= lastDay; i++) {
            // let reqDate = currentDate.getFullYear() + "-" + currentDate.getMonth() + 1 + "-" + i

            if (currentTr.getElementsByTagName("td").length >= 7) {
                currentTr = gridTable.appendChild(addNewRow());
            }
            let currentDay = document.createElement("td");
            currentDay.setAttribute("class", "calendar-date")
            let dayId = i;
            if (i < 10) { dayId = '0' + i }
            let monthId = parseInt(currentDate.getMonth() + 1)
            if (monthId < 10) { monthId = '0' + monthId }

            let reqDate = currentDate.getFullYear() + "-" + monthId + "-" + dayId

            currentDay.setAttribute("id", reqDate)
            if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

                document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });

                selectedDayBlock = currentDay;
                setTimeout(() => {
                    currentDay.classList.add("blue");
                    currentDay.classList.add("lighten-3");
                }, 900);
            }

            let displayInfo = i + '<br/>'
            currentDay.innerHTML = displayInfo;
            currentTr.appendChild(currentDay);
        }

        for (let i = currentTr.getElementsByTagName("td").length; i < 7; i++) {
            let emptyDivCol = document.createElement("td");
            currentTr.appendChild(emptyDivCol);
        }

        setTimeout(() => {
            if (side == "left") {
                gridTable.className = "animated fadeInLeft";
            } else {
                gridTable.className = "animated fadeInRight";
            }
        }, 270);

        function addNewRow() {
            let node = document.createElement("tr");
            return node;
        }
    }

    createCalendar(currentDate);
    console.log('createCalendar', calendarDates)

    let todayDayName = document.getElementById("todayDayName");
    todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short"
    });

    let prevButton = document.getElementById("prev");
    let nextButton = document.getElementById("next");

    prevButton.onclick = changeMonthPrev;
    nextButton.onclick = changeMonthNext;

    function changeMonthPrev() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        createCalendar(currentDate, "left");
    }
    function changeMonthNext() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        createCalendar(currentDate, "right");
    }

    function addEvent(title) {
        if (!globalEventObj[selectedDate.toDateString()]) {
            globalEventObj[selectedDate.toDateString()] = {};
        }
        globalEventObj[selectedDate.toDateString()][title] = title;
    }

    function showEvents() {
        let sidebarEvents = document.getElementById("sidebarEvents");
        let objWithDate = globalEventObj[selectedDate.toDateString()];

        sidebarEvents.innerHTML = "";

        if (objWithDate) {
            let eventsCount = 0;
            for (key in globalEventObj[selectedDate.toDateString()]) {
                let eventContainer = document.createElement("div");
                let eventHeader = document.createElement("div");
                eventHeader.className = "eventCard-header";

                let eventDescription = document.createElement("div");
                eventDescription.className = "eventCard-description";

                eventHeader.appendChild(document.createTextNode(key));
                eventContainer.appendChild(eventHeader);

                eventDescription.appendChild(document.createTextNode(objWithDate[key]));
                eventContainer.appendChild(eventDescription);

                let markWrapper = document.createElement("div");
                markWrapper.className = "eventCard-mark-wrapper";
                let mark = document.createElement("div");
                mark.classList = "eventCard-mark";
                markWrapper.appendChild(mark);
                eventContainer.appendChild(markWrapper);

                eventContainer.className = "eventCard";

                sidebarEvents.appendChild(eventContainer);

                eventsCount++;
            }
            let emptyFormMessage = document.getElementById("emptyFormTitle");
            emptyFormMessage.innerHTML = `${eventsCount} events now`;
        } else {
            let emptyMessage = document.createElement("div");
            emptyMessage.className = "empty-message";
            emptyMessage.innerHTML = "Sorry, no events to selected date";
            sidebarEvents.appendChild(emptyMessage);
            let emptyFormMessage = document.getElementById("emptyFormTitle");
            emptyFormMessage.innerHTML = "No Requests for Today";
        }
    }
})