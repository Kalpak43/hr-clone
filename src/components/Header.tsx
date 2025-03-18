import { Bell, Book, Command, OctagonAlert, Search } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="px-4 py-3 border-b border-gray-300 flex items-center justify-between text-sm">
      <div className="relative border border-gray-300 bg-gray-50 rounded-md">
        <Search
          size={16}
          className="absolute inset-y-0 h-fit my-auto left-0 ml-4 text-gray-600"
        />

        <input
          type="text"
          className="py-2 text-sm pl-10 min-w-xs rounded-md"
          placeholder="Search..."
        />
        <div className="absolute inset-y-0 h-fit my-auto right-0 text-gray-600 flex gap-2 mr-4">
          <button className="border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center">
            <Command size={12} />
          </button>
          <button className="border border-gray-300 rounded-md w-6 h-6 flex items-center justify-center">
            <span className="text-xs">K</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
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
