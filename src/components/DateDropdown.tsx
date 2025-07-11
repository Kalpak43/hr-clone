import { useEffect, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function DateDropdown({
  onChange,
}: {
  onChange?: (date: Date) => void;
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (date && onChange) onChange(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2  w-fit p-2 border border-gray-300 rounded-md"
        >
          <Calendar className="w-5 h-5" />
          <span>{format(date, "d MMMM yyyy")}</span>
          <ChevronDown className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
        />
      </PopoverContent>
    </Popover>
  );
}
