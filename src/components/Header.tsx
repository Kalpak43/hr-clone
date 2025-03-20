import {
  Bell,
  Book,
  Command,
  Menu,
  OctagonAlert,
  Search,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [hide, setHide] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); // Prevents default browser search
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="px-4 py-3 border-b border-gray-300 flex items-center justify-between text-sm relative">
      <div className="flex">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="lg:hidden"
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              menu.classList.toggle("show");
            }
          }}
        >
          <Menu />
        </Button>
        <div
          className={`max-md:absolute inset-x-0 max-md:mx-4 relative border border-gray-300 bg-gray-50 rounded-md ${
            hide ? "max-md:hidden" : ""
          }`}
        >
          <Search
            size={16}
            className="absolute inset-y-0 h-fit my-auto left-0 ml-4 text-gray-600"
          />

          <input
            ref={inputRef}
            type="text"
            className="py-2 text-sm pl-10 min-w-xs w-full rounded-md"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 h-fit my-auto right-0 text-gray-600 flex gap-2 mr-2">
            <button className="max-md:hidden border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center">
              <Command size={12} />
            </button>
            <button className="max-md:hidden border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center">
              <span className="text-xs">K</span>
            </button>
            <button
              className="md:hidden w-6 h-6 flex items-center justify-center"
              onClick={() => setHide(true)}
            >
              <X />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => setHide(false)}
          className="md:hidden"
        >
          <Search size={16} />
        </Button>
        <Button size={"icon"} variant={"outline"}>
          <OctagonAlert size={16} />
        </Button>
        <Button size={"icon"} variant={"outline"}>
          <Book size={16} />
        </Button>
        <Button size={"icon"} variant={"outline"}>
          <Bell size={16} />
        </Button>
      </div>
    </header>
  );
}

export default Header;
