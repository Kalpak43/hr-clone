import { Mail, Minus, Phone, Plus } from "lucide-react";

function EmployeeCard({
  name,
  title,
  contact,
  email,
  profile,
  isExpanded,
}: {
  name: string;
  title: string;
  contact: string;
  email: string;
  profile: string;
  isExpanded: boolean;
}) {
  return (
    <div className="border border-gray-300 bg-gray-100 rounded-md p-4 flex items-start gap-4 min-w-[350px] relative">
      <div className="w-10 aspect-square rounded-full border overflow-clip">
        <img src={profile} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-1">
        <p>
          <strong>{name}</strong>
        </p>
        <p>
          <i>{title}</i>
        </p>
        <hr />
        <p>
          <Phone size={12} className="inline mr-2 -mt-1" />
          {contact}
        </p>
        <p>
          <Mail size={12} className="inline mr-2 -mt-1" />
          {email}
        </p>
      </div>
      <p className="absolute top-0 right-0 m-2">
        {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
      </p>
    </div>
  );
}

export default EmployeeCard;
