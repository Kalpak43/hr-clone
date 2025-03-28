import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Stepper } from "./ui/Stepper";
import { Button } from "./ui/button";
import { FormikProps, useFormik } from "formik";
import { createEmployeeSchema } from "@/utils";
import CircleImageInput from "./CircleImageInput";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const steps = ["Basic Details", "Job Details", "Work Details"];

function EmployeeModal() {
  const [currentStep, setCurrentStep] = useState(0);

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
      level: "",
      DOJ: "",
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
            onClick={currentStep === 2 ? () => alert("Saved") : handleNext}
            className="bg-blue-400 hover:bg-blue-500"
          >
            {currentStep === 2 ? "Save" : "Next"}
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
      <CircleImageInput value={formik.values.profile} setValue={setImage} />
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
      <div className="flex flex-col">
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={(value) => formik.setFieldValue("gender", value)}
          value={formik.values.gender}
        >
          <SelectTrigger id="gender">
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
    </div>
  );
}

export function JobDetailsField({
  formik,
}: {
  formik: FormikProps<FEmployee>;
}) {
  return <div>JobDetailsField</div>;
}

export function WorkDetailsField({
  formik,
}: {
  formik: FormikProps<FEmployee>;
}) {
  return <div>WorkDetailsField</div>;
}
