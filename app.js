select: function (info) {
  const title = prompt("Enter event title:");
  if (!title) {
    calendar.unselect();
    return;
  }

  const recurrence = prompt(
    "Recurrence?\n\nnone / daily / weekly / monthly",
    "none"
  );

  const endRepeat =
    recurrence && recurrence.toLowerCase() !== "none"
      ? prompt("Repeat until date (YYYY-MM-DD) or leave blank:")
      : null;

  const startDate = new Date(info.startStr);
  const repeatUntil = endRepeat ? new Date(endRepeat) : null;

  const addSingleEvent = (date) => {
    calendar.addEvent({
      title,
      start: date.toISOString().split("T")[0],
      allDay: true,
    });
  };

  const mode = (recurrence || "none").toLowerCase();

  if (mode === "none") {
    addSingleEvent(startDate);
  } else {
    let current = new Date(startDate);

    while (!repeatUntil || current <= repeatUntil) {
      addSingleEvent(current);

      if (mode === "daily") current.setDate(current.getDate() + 1);
      else if (mode === "weekly") current.setDate(current.getDate() + 7);
      else if (mode === "monthly") current.setMonth(current.getMonth() + 1);
      else break;

      if (!repeatUntil) break;
    }
  }

  saveEvents();
  calendar.unselect();
},
