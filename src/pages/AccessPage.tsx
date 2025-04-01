import { Info, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/supbase";
import { initialRoutes, roleToJobTitles } from "@/data";

// const insertRoutesToSupabase = async () => {
//   const routeEntries = initialRoutes.flatMap((route) =>
//     route.roles.map((role) => ({
//       route: route.path,
//       role: role,
//     }))
//   );

//   // Fetch existing entries from Supabase
//   const { data: existingEntries, error: fetchError } = await supabase
//     .from("route_access")
//     .select("route, role");

//   if (fetchError) {
//     console.error("Error fetching existing entries:", fetchError);
//     return;
//   }

//   // Convert existing entries into a Set for quick lookup
//   const existingSet = new Set(
//     existingEntries.map((entry) => `${entry.route}-${entry.role}`)
//   );

//   // Filter out entries that already exist
//   const newEntries = routeEntries.filter(
//     (entry) => !existingSet.has(`${entry.route}-${entry.role}`)
//   );

//   if (newEntries.length === 0) {
//     console.log("No new routes to insert. Everything is up to date.");
//     return;
//   }

//   // Insert only the new entries
//   const { data, error } = await supabase
//     .from("route_access")
//     .insert(newEntries);

//   if (error) {
//     console.error("Error inserting routes:", error);
//   } else {
//     console.log("Routes inserted successfully:", data);
//   }
// };

function AccessPage() {
  const [selectedRole, setSelectedRole] = useState("dev");
  const [routes, setRoutes] = useState(initialRoutes);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch allowed routes for the selected role
  useEffect(() => {
    const fetchAllowedRoutes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("route_access")
        .select("route")
        .eq("role", selectedRole);

      if (error) {
        console.error("Error fetching allowed routes:", error);
        setLoading(false);
        return;
      }

      const allowedRoutes = data.map((entry) => entry.route);

      // Update the routes state to reflect fetched permissions
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) => ({
          ...route,
          roles: allowedRoutes.includes(route.path) ? [selectedRole] : [],
        }))
      );

      setLoading(false);
    };

    fetchAllowedRoutes();
  }, [selectedRole]);

  // Toggle role access for a specific route
  const toggleRoleAccess = async (routePath: string) => {
    const isCurrentlyAllowed = routes
      .find((route) => route.path === routePath)
      ?.roles.includes(selectedRole);

    if (isCurrentlyAllowed) {
      // Remove access
      const { error } = await supabase
        .from("route_access")
        .delete()
        .match({ route: routePath, role: selectedRole });

      if (error) {
        console.error("Error removing access:", error);
        return;
      }
    } else {
      // Add access
      const { error } = await supabase
        .from("route_access")
        .insert([{ route: routePath, role: selectedRole }]);

      if (error) {
        console.error("Error granting access:", error);
        return;
      }
    }

    // Refresh the allowed routes
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.path === routePath
          ? {
              ...route,
              roles: isCurrentlyAllowed ? [] : [selectedRole],
            }
          : route
      )
    );
  };

  const filteredRoutes = routes.filter((route) =>
    route.path.includes(searchTerm)
  );

  return (
    <div className="hero">
      <div className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
          <p className="py-2">
            Manage Access{" "}
            <span className="ml-4">
              <Info className="inline text-gray-700" size={16} />
            </span>
          </p>
          <div className="flex items-center gap-4">
            <SearchRoute
              searchTerm={searchTerm}
              handleSearch={(x) => setSearchTerm(x)}
            />
            <Select onValueChange={setSelectedRole} defaultValue={selectedRole}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(roleToJobTitles).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto border rounded">
          {
            <Table className="w-full text-left text-sm">
              <TableHeader>
                <TableRow className="bg-gray-100 divide-x">
                  <TableHead className="px-4 py-2">Routes</TableHead>
                  <TableHead className="px-4 py-2 text-center">
                    Can View
                    {loading && (
                      <Loader2
                        className="animate-spin inline ml-2 w-fit"
                        size={10}
                      />
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoutes.map((route) => (
                  <TableRow
                    key={route.path}
                    className="hover:bg-gray-50 divide-x"
                  >
                    <TableCell className="px-4 py-2 border-gray-200">
                      {route.path}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-center border-gray-200">
                      <Checkbox
                        checked={route.roles.includes(selectedRole)}
                        onCheckedChange={() => toggleRoleAccess(route.path)}
                        className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-white"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        </div>
      </div>
    </div>
  );
}

export default AccessPage;

export function SearchRoute({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (term: string) => void;
}) {
  return (
    <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative min-w-3xs">
      <Search size={16} className="text-gray-600 mr-2" />
      <input
        type="text"
        className="text-sm pl-2 rounded-md focus:outline-none w-full"
        placeholder="Search Route..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
