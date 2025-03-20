import {
  BookText,
  Calendar,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Folder,
  House,
  LogOut,
  MessageSquareMore,
  PanelsTopLeft,
  Settings,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router";

function Sidebar() {
  const location = useLocation();

  const nav = [
    {
      title: "Main Menu",
      links: [
        {
          icon: <House className="" size={20} />,
          name: "/",
        },
        {
          icon: <ClipboardList size={20} />,
          name: "tasks",
        },
        {
          icon: <MessageSquareMore size={20} />,
          name: "inbox",
        },
        {
          icon: <Calendar size={20} />,
          name: "calendar",
        },
        {
          icon: <Folder size={20} />,
          name: "projects",
        },
      ],
    },
    {
      title: "HR Management",
      links: [
        {
          icon: <Users size={20} />,
          name: "employees",
        },
        {
          icon: <BookText size={20} />,
          name: "attendance",
        },
        {
          icon: <CreditCard size={20} />,
          name: "payroll",
        },
        {
          icon: <UserRoundPlus size={20} />,
          name: "hiring",
        },
      ],
    },
    {
      title: "Analytics and Reports",
      links: [
        {
          icon: <Settings size={20} />,
          name: "settings",
        },
        {
          icon: <CircleHelp size={20} />,
          name: "help & support",
        },
      ],
    },
  ];

  return (
    <div
      id="menu"
      className="max-lg:hidden max-xl:fixed max-xl:inset-y-0 max-xl:w-2/3 bg-white z-50 md:w-1/4 lg:w-1/5 xl:w-1/6 p-4 space-y-4 divide-y  divide-gray-300 text-sm text-gray-700 h-full overflow-y-auto flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-[600] text-lg text-black">Efficio</h1>
        <div className="flex gap-2 items-center">
          <Button size={"icon"} variant={"ghost"} onClick={() => {}}>
            <PanelsTopLeft className="text-gray-500" size={20} />
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              const menu = document.getElementById("menu");
              if (menu) {
                menu.classList.toggle("show");
              }
            }}
            className="lg:hidden"
          >
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/default.png"
            alt=""
            className="w-10 border border-gray-300 rounded-xl"
          />
          <div className="text-sm overflow-hidden">
            <strong className="font-[500] text-black">Arnold Smith</strong>
            <p className="text-xs">arnoldsmith@gmail.com</p>
          </div>
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="w-5 h-5 aspect-square"
        >
          <ChevronDown className="text-gray-500" />
        </Button>
      </div>
      <div className="px-2 pb-4 space-y-6 flex-1 overflow-y-auto">
        {nav.map((n, i) => {
          return (
            <div key={i} className="space-y-4">
              <h3>{n.title}</h3>
              <div className="space-y-2">
                {n.links.map((link, j) => {
                  return (
                    <Link
                      key={j + 100}
                      to={link.name}
                      onClick={() => {
                        const menu = document.getElementById("menu");
                        if (menu) {
                          setTimeout(() => {
                            menu.classList.toggle("show");
                          }, 100);
                        }
                      }}
                      className={`flex w-full gap-4 hover:bg-gray-200 py-2 px-1 rounded-md ${
                        link.name ==
                          (location.pathname != "/"
                            ? location.pathname.slice(1)
                            : location.pathname) && "text-black font-[600]"
                      }`}
                    >
                      <span
                        className={
                          link.name ==
                          (location.pathname != "/"
                            ? location.pathname.slice(1)
                            : location.pathname)
                            ? "text-black"
                            : "text-gray-500"
                        }
                      >
                        {link.icon}
                      </span>
                      <span className="capitalize">
                        {link.name == "/" ? "Dashboard" : link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        <a href="/" className="flex gap-6 items-center">
          <LogOut className="text-gray-700 " size={20} />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
