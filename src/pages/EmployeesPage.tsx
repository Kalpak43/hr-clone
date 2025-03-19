import EmployeeCard from "@/components/EmployeeCard";
import { orgTree } from "@/data";
import { Search } from "lucide-react";
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

  // Recursive search function to filter employees and track expansion
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

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    expandedNodes.clear(); // Reset expanded nodes on new search

    if (!query) {
      setFilteredTree(orgTree);
    } else {
      const newTree = filterTree(orgTree, query);
      setFilteredTree(newTree || { name: "No results found", children: [] });
    }

    setExpandedNodes(new Set(expandedNodes)); // Trigger re-render
  };

  // Render nodes with dynamic expansion
  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isExpanded =
      !nodeDatum.__rd3t?.collapsed ||
      !nodeDatum.children ||
      (nodeDatum.children && nodeDatum.children.length == 0);
    return (
      <g onClick={toggleNode} style={{ cursor: "pointer" }}>
        {/* Circle for the node */}
        <circle
          r={15}
          fill={
            nodeDatum.name.toLowerCase().includes(searchTerm.toLowerCase())
              ? "orange"
              : "lightblue"
          }
        />

        {/* Employee Details */}
        <foreignObject x={30} y={-15} width={300} height={300}>
          {nodeDatum.name === "No results found" ? (
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
    <div className="hero h-full relative">
      {/* Search Input */}
      <div className="absolute top-8 left-8 border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center">
        <Search size={16} className="text-gray-600 mr-2" />
        <input
          type="text"
          className="text-sm pl-2 min-w-xs rounded-md focus:outline-none"
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Org Tree */}
      <div className="w-full h-full">
        <Tree
          data={filteredTree}
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
