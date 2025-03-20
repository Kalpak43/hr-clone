import { Calendar as SCalendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

export default function HolidayCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [holidays, setHolidays] = useState<{ date: Date; name: string }[]>([]);

  useEffect(() => {
    async function fetchHolidays() {
      try {
        const apiKey = "IIsS7b74H6nOk7hsIwX3YX3YUrE3p9ZJ"; // Replace with your API key
        const country = "IN"; // Change to your country code
        const year = new Date().getFullYear();

        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}&type=national`
        );

        const data = await response.json();

        if (data.response && data.response.holidays) {
          console.log(data.response.holidays);
          const holidayData = data.response.holidays.map(
            (holiday: { date: { iso: string }; name: string }) => ({
              date: new Date(holiday.date.iso),
              name: holiday.name,
            })
          );
          setHolidays(holidayData);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    }

    fetchHolidays();
  }, []);

  return (
    <SCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border w-full"
      modifiers={{
        weekend: (date) => [0, 6].includes(date.getDay()),
        holiday: (date) =>
          holidays.some(
            (holiday) =>
              date.getDate() === holiday.date.getDate() &&
              date.getMonth() === holiday.date.getMonth() &&
              date.getFullYear() === holiday.date.getFullYear()
          ),
      }}
      modifiersStyles={{
        weekend: {
          fontWeight: "bold",
          color: "rgb(239, 68, 68)",
        },
        holiday: {
          backgroundColor: "rgba(255, 165, 0, 0.2)", // Light orange background for holidays
          fontWeight: "bold",
          color: "rgb(255, 69, 0)",
        },
      }}
    />
  );
}
