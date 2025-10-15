import React, { useState } from "react";

const events = [
  { date: "2025-10-05", title: "Meeting with Team", description: "Discuss project details." },
  { date: "2025-10-10", title: "Birthday", description: "Celebrate colleague’s birthday." },
];

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    const clickedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(clickedDate);
  };

  const selectedEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>
        {today.toLocaleString("default", { month: "long" })} {currentYear}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        {dates.map((day) => {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const hasEvent = events.some((e) => e.date === dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#4CAF50" : hasEvent ? "#e0ffe0" : "#f0f0f0",
                color: isSelected ? "white" : "black",
                border: "1px solid #ddd",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div>
        {selectedEvents.length > 0 ? (
          <div>
            <h3>Events on {selectedDate}</h3>
            {selectedEvents.map((e, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4>{e.title}</h4>
                <p>{e.description}</p>
              </div>
            ))}
          </div>
        ) : (
          selectedDate && <p>No events on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarWithEvents;
