import EmployeeCard from "@/components/EmployeeCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { orgTree } from "@/data";
import {
  AtSign,
  FilePenLine,
  Image,
  Medal,
  Plus,
  Search,
  SmilePlus,
  Vote,
} from "lucide-react";
import { useState } from "react";
import Tree from "react-d3-tree";

// Custom "Not Found" Card
const NotFoundCard = () => (
  <div className="p-4 bg-white border border-red-300 rounded-lg shadow-md">
    <h2 className="text-lg font-bold text-red-500">No Employee Found</h2>
    <p className="text-sm text-gray-500">
      Try searching with a different name or position.
    </p>
  </div>
);

function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTree, setFilteredTree] = useState(orgTree);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [groupByDepartment, setGroupByDepartment] = useState(false);

  const filterTree = (
    node: any,
    query: string,
    parentExpanded = false
  ): any => {
    if (!node) return null;

    const isMatch =
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      node.position.toLowerCase().includes(query.toLowerCase()) ||
      node.email.toLowerCase().includes(query.toLowerCase());

    const filteredChildren = node.children
      ?.map((child: any) => filterTree(child, query, isMatch || parentExpanded))
      .filter(Boolean);

    if (isMatch || filteredChildren?.length) {
      if (isMatch) expandedNodes.add(node.name); // Mark matched node for expansion
      return { ...node, children: filteredChildren || [] };
    }

    return null;
  };

  const groupEmployeesByDepartment = (tree: any) => {
    const departmentMap = new Map();

    const traverse = (node: any) => {
      if (!node) return;

      if (!departmentMap.has(node.department)) {
        departmentMap.set(node.department, {
          name: node.department,
          children: [],
        });
      }

      departmentMap
        .get(node.department)
        .children.push({ ...node, children: [] });

      node.children?.forEach(traverse);
    };

    traverse(tree);

    return {
      name: "Departments",
      children: Array.from(departmentMap.values()),
    };
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(!query.trim() ? "" : query);
    if (!query.trim()) return;
    expandedNodes.clear(); // Reset expanded nodes on new search

    let newTree;
    if (!query) {
      newTree = groupByDepartment
        ? groupEmployeesByDepartment(orgTree)
        : orgTree;
    } else {
      newTree = filterTree(orgTree, query);
      if (!newTree) newTree = { name: "No results found", children: [] };
    }

    setFilteredTree(newTree);
    setExpandedNodes(new Set(expandedNodes)); // Trigger re-render
  };

  // Render nodes with dynamic expansion
  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isExpanded =
      !nodeDatum.__rd3t?.collapsed ||
      !nodeDatum.children ||
      (nodeDatum.children && nodeDatum.children.length == 0);

    const isDepartment =
      !nodeDatum.position && !nodeDatum.email && !nodeDatum.contact;
    return (
      <g onClick={toggleNode} style={{ cursor: "pointer" }}>
        {/* Circle for the node */}
        <circle
          r={15}
          fill={
            nodeDatum.name &&
            nodeDatum.name.toLowerCase().includes(searchTerm.toLowerCase())
              ? "orange"
              : "lightblue"
          }
        />

        {/* Employee Details */}
        <foreignObject x={30} y={-15} width={300} height={300}>
          {isDepartment ? (
            <div className="p-3 bg-purple-100 border border-purple-400 rounded-lg shadow-md text-center">
              <h3 className="text-md font-bold text-purple-700">
                {nodeDatum.name}
              </h3>
            </div>
          ) : nodeDatum.name === "No results found" ? (
            <NotFoundCard />
          ) : (
            <EmployeeCard
              name={nodeDatum.name}
              title={nodeDatum.position}
              contact={nodeDatum.contact}
              email={nodeDatum.email}
              profile={nodeDatum.image}
              isExpanded={isExpanded}
            />
          )}
        </foreignObject>
      </g>
    );
  };

  const transformedTree = groupByDepartment
    ? groupEmployeesByDepartment(filteredTree)
    : filteredTree;

  return (
    <div className="py-4 space-y-4 text-sm overflow-y-auto h-full relative">
      {/* Search Input */}
      <div className="absolute top-8 left-8 max-md:inset-x-0 max-md:m-2  border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center">
        <Search size={16} className="text-gray-600 mr-2" />
        <input
          type="text"
          className="text-sm pl-2 min-w-xs rounded-md focus:outline-none w-full"
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="absolute top-2 md:top-8 right-2 md:right-8 flex items-center">
        <label className="mr-2 text-sm font-medium text-gray-700">
          Group by Department
        </label>
        <Switch
          checked={groupByDepartment}
          onCheckedChange={setGroupByDepartment}
          className="data-[state=checked]:bg-blue-400"
        />
      </div>
      <EngageModal />
      {/* Org Tree */}
      <div className="w-full h-full">
        <Tree
          data={transformedTree}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
          separation={{ siblings: 4, nonSiblings: 5 }}
          collapsible={true}
          translate={{ x: 400, y: 200 }}
          zoom={0.8}
          initialDepth={expandedNodes.size > 0 ? undefined : 1} // Auto-expand if search is active
        />
      </div>
    </div>
  );
}

export default EmployeesPage;

export function EngageModal() {
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-0 right-4 bg-blue-400 hover:bg-blue-500"
          variant="default"
        >
          <Plus className="" />
          Engage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
            <Button
              variant={filter === "all" ? "outline" : "ghost"}
              className={filter === "all" ? " bg-gray-100" : ""}
              onClick={() => setFilter("all")}
              size={"sm"}
            >
              <FilePenLine size={12} />
              <span>Post</span>
            </Button>
            <Button
              variant={filter === "read" ? "outline" : "ghost"}
              className={filter === "read" ? " bg-gray-100" : ""}
              onClick={() => setFilter("read")}
              size={"sm"}
            >
              <Vote size={12} />
              <span>Poll</span>
            </Button>
            <Button
              variant={filter === "unread" ? "outline" : "ghost"}
              className={filter === "unread" ? " bg-gray-100" : ""}
              onClick={() => setFilter("unread")}
              size={"sm"}
            >
              <Medal size={12} />
              <span>Praise</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogDescription>
          <PostCard />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export function PostCard() {
  const [selectedItem, setSelectedItem] = useState<
    "Origanization" | "Department" | "Team"
  >("Origanization");

  const handleSelect = (item: "Origanization" | "Department" | "Team") => {
    setSelectedItem(item);
  };
  return (
    <div className="border border-gray-300 rounded-md divide-y">
      <div className="p-4 space-y-4">
        <Textarea placeholder="Type your post here..." />
        <div className="flex items-center gap-2">
          <Button variant="outline" size={"icon"}>
            <AtSign />
          </Button>
          <Button variant="outline" size={"icon"}>
            <Image />
          </Button>
          <Button variant="outline" size={"icon"}>
            <SmilePlus />
          </Button>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-gray-500">Posting to</p>
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[150px] text-black">
              <SelectValue placeholder="Origanization" />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectItem value="Origanization">Origanization</SelectItem>
              <SelectItem value="Department">Department</SelectItem>
              <SelectItem value="Team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Cancel</Button>
          <Button variant={"default"} className="bg-blue-400 hover:bg-blue-500">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
