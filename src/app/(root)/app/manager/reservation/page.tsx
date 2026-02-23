import React from "react";
import ReservationCalendar from "./_components/ReservationCalendar";
import CalendarProvider from "@/providers/CalendarProvider";

const UserReservationPage = () => {
  return (
    <div className="p-2">
      <CalendarProvider>
        <ReservationCalendar />
      </CalendarProvider>
    </div>
  );
};

export default UserReservationPage;
