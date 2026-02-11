document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      pages.forEach((p) => p.classList.remove("active"));

      const pageId = item.getAttribute("data-page") + "-page";
      document.getElementById(pageId)?.classList.add("active");
      item.classList.add("active");

      if (pageId === "calendar-page") {
        setTimeout(() => initializeCalendar(), 100);
      }
    });
  });
});

let calendar;

function initializeCalendar() {
  const calendarEl = document.getElementById("calendar");

  if (!calendarEl.dataset.initialized) {
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      editable: true,
      selectable: true,
      height: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
      events: JSON.parse(localStorage.getItem("calendarEvents") || "[]"),
      select: function (info) {
        const title = prompt("Enter event title:");
        if (title) {
          const newEvent = {
            title,
            start: info.startStr,
            end: info.endStr,
            allDay: info.allDay,
          };
          calendar.addEvent(newEvent);
          saveEvents();
        }
        calendar.unselect();
      },
      eventClick: function (info) {
        if (confirm(`Delete event "${info.event.title}"?`)) {
          info.event.remove();
          saveEvents();
        }
      },
      eventDrop: saveEvents,
      eventResize: saveEvents,
    });

    calendar.render();
    calendarEl.dataset.initialized = "true";
  }
}

function saveEvents() {
  const events = calendar.getEvents().map(e => ({
    title: e.title,
    start: e.startStr,
    end: e.endStr,
    allDay: e.allDay
  }));
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}