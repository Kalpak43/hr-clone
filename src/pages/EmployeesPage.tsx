import EmployeeCard from "@/components/EmployeeCard";
import { orgTree } from "@/data";
import Tree from "react-d3-tree";

function EmployeesPage() {
  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => (
    <g onClick={toggleNode} style={{ cursor: "pointer" }}>
      {/* Node shape */}
      <circle r={15} fill="lightblue" />

      {/* Card beside node */}
      <foreignObject x={30} y={-15} width={300} height={300}>
        <EmployeeCard
          name={nodeDatum.name}
          title={nodeDatum.position}
          contact={nodeDatum.contact}
          email={nodeDatum.email}
          profile={nodeDatum.image}
        />
      </foreignObject>
    </g>
  );

  return (
    <div className="hero h-full">
      <div className="w-full h-full">
        <Tree
          data={orgTree}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
          separation={{ siblings: 4, nonSiblings: 5 }}
          collapsible={true}
          translate={{ x: 400, y: 200 }} // Set initial position
          zoom={0.8} // Set initial zoom level
          initialDepth={1} // Expand only the first level initially
        />
      </div>
    </div>
  );
}

export default EmployeesPage;
