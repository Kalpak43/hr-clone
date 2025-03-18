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
} from "lucide-react";

function Sidebar() {
  const nav = [
    {
      title: "Main Menu",
      links: [
        {
          icon: <House className="" size={20} />,
          name: "dashboard",
        },
        {
          icon: <ClipboardList className="text-gray-500" size={20} />,
          name: "tasks",
        },
        {
          icon: <MessageSquareMore className="text-gray-500" size={20} />,
          name: "inbox",
        },
        {
          icon: <Calendar className="text-gray-500" size={20} />,
          name: "calendar",
        },
        {
          icon: <Folder className="text-gray-500" size={20} />,
          name: "projects",
        },
      ],
    },
    {
      title: "HR Management",
      links: [
        {
          icon: <Users className="text-gray-500" size={20} />,
          name: "employees",
        },
        {
          icon: <BookText className="text-gray-500" size={20} />,
          name: "attendance",
        },
        {
          icon: <CreditCard className="text-gray-500" size={20} />,
          name: "payroll",
        },
        {
          icon: <UserRoundPlus className="text-gray-500" size={20} />,
          name: "hiring",
        },
      ],
    },
    {
      title: "Analytics and Reports",
      links: [
        {
          icon: <Settings className="text-gray-500" size={20} />,
          name: "settings",
        },
        {
          icon: <CircleHelp className="text-gray-500" size={20} />,
          name: "help & support",
        },
      ],
    },
  ];

  return (
    <div className="w-1/6 p-4 space-y-4 divide-y  divide-gray-300 text-sm text-gray-700 h-full overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-[600] text-lg text-black">Efficio</h1>
        <PanelsTopLeft className="text-gray-500" size={20} />
      </div>
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/default.png"
            alt=""
            className="w-10 border border-gray-300 rounded-xl"
          />
          <div className="text-sm">
            <strong className="font-[500] text-black">Arnold Smith</strong>
            <p className="text-xs">arnoldsmith@gmail.com</p>
          </div>
        </div>
        <ChevronDown className="text-gray-500" />
      </div>
      <div className="px-2 pb-4 space-y-6 flex-1">
        {nav.map((n, i) => {
          return (
            <div key={i} className="space-y-4">
              <h3>{n.title}</h3>
              <div className="space-y-4">
                {n.links.map((link, j) => {
                  return (
                    <a
                      key={j + 100}
                      href={link.name}
                      className={`flex w-full gap-4 ${
                        link.name == "dashboard" && "text-black font-[600]"
                      }`}
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </a>
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
