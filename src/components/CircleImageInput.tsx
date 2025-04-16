import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const CircleImageInput = ({
  value,
  setValue,
}: {
  value: File | string | null;
  setValue: (x: File | string) => void;
}) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setValue(value);
      if (typeof value === "string") {
        setImage(value);
        return;
      }

      if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          reader.result && setImage(reader.result as string);
        };
        reader.readAsDataURL(value);

        return;
      }
    }
  }, [value]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setValue(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        reader.result && setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <label htmlFor="icon-button-file" className="relative">
        <img
          src={image || "/profile-default.png"}
          alt="Profile"
          style={{ width: 70, height: 70, cursor: "pointer" }}
          className="border rounded-full"
        />

        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
          className="opacity-0 absolute inset-0"
        />
      </label>
      <small>Profile</small>
      {/* <IconButton color="primary" aria-label="upload picture" component="span">
        <CameraAltIcon />
      </IconButton> */}
    </div>
  );
};

export default CircleImageInput;
