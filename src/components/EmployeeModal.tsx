import { Info } from "lucide-react";
import React from "react";
import { Stepper } from "./Stepper";

const steps = ["Basic Details", "Job Details", "Work Details"];

function EmployeeModal() {
  return (
    <div className="space-y-8">
      <div className="flex max-md:flex-col max-md:items-start gap-2 items-start justify-between">
        <p className="py-2">
          Register Employee{" "}
          <span className="ml-4">
            <Info className="inline text-gray-700" size={16} />
          </span>
        </p>
      </div>
      <div>
        <Stepper steps={steps} />
      </div>
    </div>
  );
}

export default EmployeeModal;
