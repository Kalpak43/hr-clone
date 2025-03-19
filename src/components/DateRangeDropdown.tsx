import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const DateRangeDropdown = () => {
  const [selectedRange, setSelectedRange] = useState("This Week");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-xs">
        <Button variant="outline">
          {selectedRange} <ChevronDown />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-xs">
        <DropdownMenuItem onClick={() => setSelectedRange("This Week")}>
          This Week
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedRange("This Month")}>
          This Month
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSelectedRange("This Year")}>
          This Year
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateRangeDropdown;
