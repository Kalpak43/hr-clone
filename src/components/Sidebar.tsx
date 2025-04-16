import {
  BookText,
  Calendar,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Folder,
  House,
  Loader2,
  LogOut,
  MessageSquareMore,
  PanelsTopLeft,
  Settings,
  ShieldMinus,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authThunk";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/supbase";
import { roleToJobTitles } from "@/data";
import { fetchAllowedRoutes } from "@/features/routes/routeThunk";

const getRoleFromJobTitle = (jobTitle: string): string => {
  for (const [role, titles] of Object.entries(roleToJobTitles)) {
    if (titles.includes(jobTitle)) {
      return role;
    }
  }
  return "employee"; // default role
};

function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const allowedRoutes = useAppSelector((state) => state.routes.allowedRoutes);

  useEffect(() => {
    const getTitle = async () => {
      if (user) {
        if (isAdmin) {
          setDisplayName("Admin");
          setRole("admin");
        } else {
          const { data } = await supabase
            .from("employees")
            .select("job_title, first_name, last_name")
            .eq("uuid", user.id)
            .single();

          if (data) {
            // You can store the job title in your state management if needed
            // e.g., dispatch(setJobTitle(data.job_title));
            setRole(getRoleFromJobTitle(data.job_title));

            setDisplayName(data.first_name + " " + data.last_name);
          }
        }
      }
    };

    getTitle();
  }, [user]);

  useEffect(() => {
    // @ts-ignore
    if (role) dispatch(fetchAllowedRoutes({ role }));
  }, [role]);

  const nav = [
    {
      title: "Main Menu",
      links: [
        {
          icon: <House className="" size={20} />,
          name: "dashboard",
          path: "/",
        },
        {
          icon: <ClipboardList size={20} />,
          name: "tasks",
          path: "/tasks",
        },
        {
          icon: <MessageSquareMore size={20} />,
          name: "inbox",
          path: "/inbox",
        },
        {
          icon: <Calendar size={20} />,
          name: "calendar",
          path: "/calendar",
        },
        {
          icon: <Folder size={20} />,
          name: "projects",
          path: "/projects",
        },
      ],
    },
    {
      title: "HR Management",
      links: [
        {
          icon: <Users size={20} />,
          name: "employees",
          path: "/employees",
        },
        {
          icon: <BookText size={20} />,
          name: "attendance",
          path: "/attendance",
        },
        {
          icon: <CreditCard size={20} />,
          name: "payroll",
          path: "/payroll",
        },
        {
          icon: <UserRoundPlus size={20} />,
          name: "hiring",
          path: "/hiring",
        },
      ],
    },
    {
      title: "Analytics and Reports",
      links: [
        {
          icon: <Settings size={20} />,
          name: "settings",
          path: "/settings",
        },
        {
          icon: <ShieldMinus size={20} />,
          name: "manage access",
          path: "/manage-access",
        },
        {
          icon: <CircleHelp size={20} />,
          name: "help & support",
          path: "/help",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    // @ts-ignore
    await dispatch(logout());
    toast("Logged out successfully");
  };

  const filteredNav = nav
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => allowedRoutes.includes(link.path)),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <div
      id="menu"
      className="max-lg:hidden max-lg:fixed max-xl:inset-y-0 max-xl:w-2/3 bg-white z-50 md:w-1/4 lg:w-1/5 xl:w-1/6 p-4 space-y-4 divide-y  divide-gray-300 text-sm text-gray-700 h-full overflow-y-auto flex flex-col justify-between"
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
            className="w-8 border border-gray-300 rounded-full"
          />
          <div className="text-sm overflow-hidden">
            <strong className="font-[500] text-black">
              {isAdmin ? (
                "Admin"
              ) : (
                <>
                  {displayName} <span className="text-xs">({role})</span>
                </>
              )}
            </strong>
            <p className="text-xs">{user?.email}</p>
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
        {filteredNav.map((n, i) => {
          return (
            <div key={i} className="space-y-4">
              <h3>{n.title}</h3>
              <div className="space-y-2">
                {n.links.map((link, j) => {
                  return (
                    <Link
                      key={j + 100}
                      to={link.path}
                      onClick={() => {
                        const menu = document.getElementById("menu");
                        if (menu) {
                          setTimeout(() => {
                            menu.classList.toggle("show");
                          }, 100);
                        }
                      }}
                      className={`flex w-full gap-4 hover:bg-gray-200 py-2 px-1 rounded-md ${
                        link.path == location.pathname &&
                        "text-black font-[600]"
                      }`}
                    >
                      <span
                        className={
                          link.path == location.pathname
                            ? "text-black"
                            : "text-gray-500"
                        }
                      >
                        {link.icon}
                      </span>
                      <span className="capitalize">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {user ? (
        <div className="">
          <button
            className="flex gap-6 items-center w-full hover:bg-gray-200 py-2 px-1 rounded-md"
            onClick={handleLogout}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto w-fit" />
            ) : (
              <>
                <LogOut className="text-gray-700 " size={20} />
                <span>Log Out</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <Link
          to={"/login"}
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              setTimeout(() => {
                menu.classList.toggle("show");
              }, 100);
            }
          }}
          className={`flex w-full gap-4 hover:bg-gray-200 py-2 px-1 rounded-md`}
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
