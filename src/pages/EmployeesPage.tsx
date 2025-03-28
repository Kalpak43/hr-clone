import EmployeeCard from "@/components/EmployeeCard";
import { Switch } from "@/components/ui/switch";
import { orgTree } from "@/data";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import Tree from "react-d3-tree";
import EngageSheet from "@/components/EngageSheet";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmployeeModal from "@/components/EmployeeModal";

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

      <div className="absolute top-2 md:top-8 right-2 md:right-8 flex items-center gap-4">
        <div className=" flex items-center gap-2">
          <Switch
            checked={groupByDepartment}
            onCheckedChange={setGroupByDepartment}
            className="data-[state=checked]:bg-blue-400"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            Group by Department
          </label>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-400 hover:bg-blue-500" variant="default">
              <Plus className="" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-4xl">
            <EmployeeModal />
          </DialogContent>
        </Dialog>
      </div>
      <EngageSheet />
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
