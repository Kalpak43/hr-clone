import EmployeeCard from "@/components/EmployeeCard";
import { Switch } from "@/components/ui/switch";
import { orgTree } from "@/data";
import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import EngageSheet from "@/components/EngageSheet";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EmployeeModal from "@/components/EmployeeModal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchEmployees } from "@/features/employee/employeeThunk";
import { mergeEmployeesWithOrgTree } from "@/utils";

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
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employee.employees);
  const loading = useAppSelector((state) => state.employee.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTree, setFilteredTree] = useState<OrgNode>(orgTree);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [groupByDepartment, setGroupByDepartment] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Function to handle closing the dialog
  const handleClose = () => {
    setIsOpen(false);
  };

  const groupEmployeesByDepartment = useCallback((tree: any) => {
    const departmentMap = new Map();

    const traverse = (node: any) => {
      if (!node) return;

      // Handle root node case
      if (!node.department) {
        node.children?.forEach(traverse);
        return;
      }

      const deptName = node.department;
      if (!departmentMap.has(deptName)) {
        departmentMap.set(deptName, {
          name: deptName,
          children: [],
        });
      }

      // Create a new node object with preserved children
      const newNode = {
        ...node,
        children: node.children || [], // Preserve existing children
      };

      departmentMap.get(deptName).children.push(newNode);

      // Continue traversing children
      node.children?.forEach(traverse);
    };

    traverse(tree);

    // Only create department grouping if we have departments
    if (departmentMap.size > 0) {
      return {
        name: "Departments",
        children: Array.from(departmentMap.values()),
      };
    }

    // Return original tree if no departments
    return tree;
  }, []);

  // Initialize transformedTree after filteredTree is defined
  const [transformedTree, setTransformedTree] = useState(
    groupByDepartment ? groupEmployeesByDepartment(filteredTree) : filteredTree
  );

  useEffect(() => {
    console.log(transformedTree);
    console.log("transformed");
  }, [transformedTree]);

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Update filteredTree when employees change
  useEffect(() => {
    if (employees.length > 0) {
      const newTree = mergeEmployeesWithOrgTree(orgTree, employees);
      setFilteredTree({ ...newTree });
    }
  }, [employees]);

  // Update transformedTree when filteredTree or groupByDepartment changes
  useEffect(() => {
    const newTransformedTree = groupByDepartment
      ? groupEmployeesByDepartment(filteredTree)
      : filteredTree;

    setTransformedTree(newTransformedTree);
  }, [filteredTree, groupByDepartment]);

  const filterTree = (
    node: any,
    query: string,
    parentExpanded = false
  ): any => {
    if (!node) return null;

    const isMatch =
      node.name?.toLowerCase().includes(query.toLowerCase()) ||
      node.position?.toLowerCase().includes(query.toLowerCase()) ||
      node.email?.toLowerCase().includes(query.toLowerCase());

    const filteredChildren = node.children
      ?.map((child: any) => filterTree(child, query, isMatch || parentExpanded))
      .filter(Boolean);

    if (isMatch || filteredChildren?.length) {
      if (isMatch) expandedNodes.add(node.name); // Mark matched node for expansion
      return { ...node, children: filteredChildren || [] };
    }

    return null;
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (!query.trim()) {
      // Reset to original tree when search is cleared
      setFilteredTree(orgTree);
      return;
    }

    expandedNodes.clear(); // Reset expanded nodes on new search

    const newTree = filterTree(orgTree, query);
    if (newTree) {
      setFilteredTree(newTree);
    }

    setExpandedNodes(new Set(expandedNodes)); // Trigger re-render
  };

  // Render nodes with dynamic expansion
  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isExpanded =
      !nodeDatum.__rd3t?.collapsed ||
      !nodeDatum.children ||
      (nodeDatum.children && nodeDatum.children.length === 0);

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
        <foreignObject x={30} y={-15} width={350} height={300}>
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

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button
              className="bg-blue-400 hover:bg-blue-500"
              variant="default"
              onClick={() => setIsOpen(true)} // Open the dialog on button click
            >
              <Plus />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-4xl">
            {/* Pass handleClose to EmployeeModal if it needs to close the dialog */}
            <EmployeeModal onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
      <EngageSheet />
      {/* Org Tree */}
      {!loading && (
        <div className="w-full h-full">
          <Tree
            key={JSON.stringify(transformedTree)}
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
      )}
    </div>
  );
}

export default EmployeesPage;
