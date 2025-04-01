import { Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Stepper } from "./ui/Stepper";
import { Button } from "./ui/button";
import { FormikProps, useFormik } from "formik";
import { createEmployeeSchema, saveEmployeeData } from "@/utils";
import CircleImageInput from "./CircleImageInput";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { employeeList } from "@/data";
import { useAppDispatch } from "@/app/hooks";
import { fetchEmployees } from "@/features/employee/employeeThunk";

const steps = ["Basic Details", "Job Details", "Work Details"];

function EmployeeModal({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      profile: null,
      work_email: "",
      email: "",
      first_name: "",
      last_name: "",
      display_name: "",
      phone_number: "",
      gender: "",
      DOB: "",
      job_title: "",
      department: "",
      type: "",
      level: "mid",
      DOJ: "2025-03-30",
      location: "office",
      salary: 0,
      frequency: "monthly",
      supervisor: "",
      shift: "day",
      leaves: {
        annual: 5,
        sick: 6,
      },
      password: "Test!123",
    },
    validationSchema: createEmployeeSchema[currentStep],
    onSubmit: async (values) => {
      // setLoading(true);
      // try {
      //   await onSubmit(values); // Call the submit function
      // } finally {
      //   setLoading(false);
      // }

      console.log(values);
    },
  });

  const handleNext = async () => {
    // setCurrentStep((prev) => prev + 1);
    const isValid = await formik.validateForm();
    console.log(isValid);
    if (Object.keys(isValid).length === 0) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Set touched for the fields to display validation messages
      formik.setTouched({
        first_name: true,
        last_name: true,
        display_name: true,
        password: true,
        work_email: true,
        phone_number: true,
        DOB: true,
        job_title: true,
        department: true,
        type: true,
        level: true,
        DOJ: true,
        location: true,
        salary: true,
        frequency: true,
        supervisor: true,
        gender: true,
      });
    }
  };

  const handlePrev = () => {
    currentStep >= 0 && setCurrentStep((x) => x - 1);
  };

  const handleSubmit = async () => {
    console.log("SOOMETHINK");
    setLoading(true);
    const data = await saveEmployeeData(formik.values as FEmployee);
    if (data?.success && data.employee) {
      // dispatch(addEmployee(data.employee));
      // toast.success("Employee added Successfully");
      // setActiveStep((prev) => prev + 1);
      // handleClose();
      toast.success("Employee Registered successfully");
    }

    if (data?.error) {
      toast.error("There was an error in adding employee");
    }
    setLoading(false);
    dispatch(fetchEmployees());

    onClose();
  };

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
      <Stepper
        steps={steps}
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <section className="border border-gray-300 rounded-md p-4 bg-white space-y-8">
        <div>
          {
            {
              0: (
                <BasicDetailsField formik={formik as FormikProps<FEmployee>} />
              ),
              1: <JobDetailsField formik={formik as FormikProps<FEmployee>} />,
              2: <WorkDetailsField formik={formik as FormikProps<FEmployee>} />,
            }[currentStep]
          }
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="bg-blue-400 hover:bg-blue-500"
          >
            Back
          </Button>
          <Button
            onClick={currentStep === 2 ? handleSubmit : handleNext}
            className="bg-blue-400 hover:bg-blue-500"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : currentStep === 2 ? (
              "Save"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default EmployeeModal;

export function BasicDetailsField({
  formik,
}: {
  formik: FormikProps<FEmployee>;
}) {
  useEffect(() => {
    const { first_name, last_name } = formik.values;
    if (first_name || last_name) {
      formik.setFieldValue(
        "display_name",
        `${first_name.trim()} ${last_name.trim()}`.trim()
      );
    }
  }, [formik.values.first_name, formik.values.last_name]);

  const setImage = (image: string | File) => {
    if (image instanceof File) {
      formik.setFieldValue("profile", image);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        <CircleImageInput value={formik.values.profile} setValue={setImage} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="first_name" className="text-xs">
          First Name
        </label>
        <Input
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.first_name && formik.errors.first_name
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <p className="mt-1 text-xs text-red-500">
            {formik.errors.first_name}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="last_name" className="text-xs">
          Last Name
        </label>
        <Input
          id="last_name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.last_name && formik.errors.last_name
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <p className="mt-1 text-xs text-red-500">{formik.errors.last_name}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-xs">
          Gender
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("gender", value)}
          value={formik.values.gender}
        >
          <SelectTrigger id="gender" className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.gender && formik.errors.gender && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.gender}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="work_email" className="text-xs">
          Email
        </label>
        <Input
          id="work_email"
          name="work_email"
          value={formik.values.work_email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.work_email && formik.errors.work_email
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.work_email && formik.errors.work_email && (
          <p className="mt-1 text-xs text-red-500">
            {formik.errors.work_email}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="work_email" className="text-xs">
          Phone
        </label>
        <Input
          id="phone_number"
          name="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.phone_number && formik.errors.phone_number
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.phone_number && formik.errors.phone_number && (
          <p className="mt-1 text-xs text-red-500">
            {formik.errors.phone_number}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="work_email" className="text-xs">
          Date of Birth
        </label>
        <Input
          id="DOB"
          name="DOB"
          type="date"
          value={formik.values.DOB}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.touched.DOB && formik.errors.DOB ? "border-red-500" : ""
          }`}
        />
        {formik.touched.DOB && formik.errors.DOB && (
          <p className="mt-1 text-xs text-red-500">{formik.errors.DOB}</p>
        )}
      </div>
    </div>
  );
}

export function JobDetailsField({
  formik,
}: {
  formik: FormikProps<FEmployee>;
}) {
  const departmentToJobTitles = {
    executive: ["CEO", "CTO", "CFO"],
    technology: ["Software Developer", "System Analyst", "Data Scientist"],
    engineering: [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
    ],
    finance: ["Accountant", "Financial Analyst", "Auditor"],
    operations: [
      "Operations Manager",
      "Logistics Coordinator",
      "Quality Assurance",
    ],
    humanResources: ["HR Manager", "Recruiter", "Training Coordinator"],
  };

  const [jobTitles, setJobTitles] = useState<string[]>([]);

  // Handle Department Change
  const handleDepartmentChange = (value: string) => {
    formik.setFieldValue("department", value);
    formik.setFieldValue("jobTitle", ""); // Reset job title
    setJobTitles(
      departmentToJobTitles[value as keyof typeof departmentToJobTitles] || []
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="department" className="text-xs">
          Department
        </label>
        <Select
          onValueChange={handleDepartmentChange}
          value={formik.values.department}
        >
          <SelectTrigger id="department" className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(departmentToJobTitles).map((department) => (
              <SelectItem key={department} value={department}>
                {department.charAt(0).toUpperCase() + department.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.department && formik.errors.department && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.department}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="job_title" className="text-xs">
          Job Title
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("job_title", value)}
          value={formik.values.job_title}
          disabled={!formik.values.department}
        >
          <SelectTrigger id="job_title" className="w-full">
            <SelectValue placeholder="Select Job Title" />
          </SelectTrigger>
          <SelectContent>
            {jobTitles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.job_title && formik.errors.job_title && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.job_title}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="supervisor" className="text-xs">
          Supervisor
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("supervisor", value)}
          value={formik.values.supervisor}
        >
          <SelectTrigger id="supervisor" className="w-full">
            <SelectValue placeholder="Select Job Title" />
          </SelectTrigger>
          <SelectContent>
            {employeeList.map((e) => (
              <SelectItem key={e.name} value={e.name}>
                {e.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.supervisor && formik.errors.supervisor && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.supervisor}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="type" className="text-xs">
          Type
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("type", value)}
          value={formik.values.type}
        >
          <SelectTrigger id="type" className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.type && formik.errors.type && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.type}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="location" className="text-xs">
          Location
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("location", value)}
          value={formik.values.location}
        >
          <SelectTrigger id="location" className="w-full">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.location && formik.errors.location && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.location}</p>
        )}
      </div>
    </div>
  );
}

export function WorkDetailsField({
  formik,
}: {
  formik: FormikProps<FEmployee>;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label htmlFor="shift" className="text-xs">
          Shift
        </label>
        <Select
          onValueChange={(value) => formik.setFieldValue("shift", value)}
          value={formik.values.shift}
        >
          <SelectTrigger id="shift" className="w-full">
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="night">Night</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.shift && formik.errors.shift && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.shift}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="annual" className="text-xs">
          Annual Leaves
        </label>
        <Input
          id="annual"
          name="leaves.annual"
          type="number"
          value={formik.values.leaves.annual}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="sick" className="text-xs">
          Sick Leaves
        </label>
        <Input
          id="sick"
          name="leaves.sick"
          type="number"
          value={formik.values.leaves.sick}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    </div>
  );
}
