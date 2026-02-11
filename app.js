document.addEventListener("DOMContentLoaded", () => {
  // Sidebar tab switch logic
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

// Calendar init
function initializeCalendar() {
  const calendarEl = document.getElementById("calendar");

  if (!calendarEl.dataset.initialized) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      height: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
      events: [
        {
          title: "Inspection - EXC-001",
          start: "2026-02-14",
          color: "#28a745",
        },
        {
          title: "Maintenance - LDR-002",
          start: "2026-02-17",
          color: "#ffc107",
        },
        {
          title: "Site Visit - Downtown",
          start: "2026-02-19",
          color: "#007bff",
        },
      ],
    });
    calendar.render();
    calendarEl.dataset.initialized = "true";
  }
}