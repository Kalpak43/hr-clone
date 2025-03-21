import { Button } from "@/components/ui/button";
import { email as initialEmails } from "@/data";
import { Logs, Mail, MailOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function InboxPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState<EmailType[]>(initialEmails);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(!query.trim() ? "" : query);
    if (!query.trim()) return;
  };

  return (
    <div className="hero h-full relative">
      <div className=" grid grid-cols-3 gap-4 h-full">
        <div className="h-full relative">
          <div className="absolute inset-0 border border-gray-300 rounded-md p-4 flex flex-col gap-4">
            <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center">
              <Search size={16} className="text-gray-600 mr-2" />
              <input
                type="text"
                className="text-sm pl-2 min-w-xs rounded-md focus:outline-none w-full"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
              <Button
                variant={"outline"}
                //   variant={activeTab === 0 ? "outline" : "ghost"}
                //   className={activeTab === 0 ? " bg-gray-100" : ""}
                //   onClick={() => setActiveTab(0)}
                size={"sm"}
              >
                <Logs size={12} />
                <span>All</span>
              </Button>
              <Button
                variant={"outline"}
                //   onClick={() => setActiveTab(1)}
                //   className={activeTab === 1 ? " bg-gray-100" : ""}
                size={"sm"}
              >
                <MailOpen size={12} />
                <span>Read</span>
              </Button>
              <Button
                variant={"outline"}
                //   onClick={() => setActiveTab(1)}
                //   className={activeTab === 1 ? " bg-gray-100" : ""}
                size={"sm"}
              >
                <Mail size={12} />
                <span>Unread</span>
              </Button>
            </div>

            <div className="space-y-2 max-h-full flex-1 overflow-y-auto">
              {email.map((e) => (
                <MailCard
                  email={e}
                  key={e.id}
                  onClick={() =>
                    setEmail((prevEmails) =>
                      prevEmails.map((pe) =>
                        pe.id === e.id ? { ...pe, read: true } : pe
                      )
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md col-span-2">
          <MailCardExtended />
        </div>
      </div>
    </div>
  );
}

export default InboxPage;

export function MailCard({
  email,
  onClick,
}: {
  email: EmailType;
  onClick: () => void;
}) {
  return (
    <Link
      to={`/inbox/${email.id}`}
      className="block border border-gray-300 bg-gray-50 p-4 rounded-md space-y-2 divide-y relative hover:bg-gray-100 hover:border-gray-500"
      onClick={onClick}
    >
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="font-[600] text-blue-400">{email.title}</p>
          <p className="text-xs text-gray-500">
            {new Date(email.createdAt).toLocaleDateString()}{" "}
            {new Date(email.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="pb-2">
        <Button
          // onClick={handleClockInOut}
          className={`cursor-pointer w-full ${"bg-green-500 hover:bg-green-600"}`}
          size={"sm"}
          // disabled
        >
          {email.status}
        </Button>
        <p className="text-gray-500 text-xs text-right">
          Approved By{" "}
          <span className="font-[600] text-black">{email.approvedBy}</span>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 aspect-square rounded-full border overflow-clip">
            <img
              src={"https://i.pravatar.cc/150?img=9"}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xs text-gray-700 font-[600]">{email.createdBy}</p>
        </div>
        <span className="">
          {email.read ? (
            <MailOpen size={12} className="text-green-500" />
          ) : (
            <Mail size={12} className="text-red-500" />
          )}
        </span>
      </div>
    </Link>
  );
}

export function MailCardExtended() {
  const { mailID } = useParams<{ mailID: string }>();
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>();

  useEffect(() => {
    if (mailID) {
      setSelectedEmail(initialEmails.find((e) => e.id === Number(mailID)));
    }
  }, [mailID]);

  return (
    <div className="flex flex-col h-full rounded-md overflow-hidden">
      {selectedEmail ? (
        <>
          <div className="border-b bg-gray-100 p-4 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-gray-500">
                Subject:{" "}
                <span className="font-[600] text-black text-xl">
                  {selectedEmail.title}
                </span>
              </p>
              <p className="text-gray-500">
                From:{" "}
                <span className="font-[600] text-black">
                  {selectedEmail.createdBy}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">
                Date:{" "}
                <span className="font-[600] text-black">
                  {new Date(selectedEmail.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-500">
                Time:{" "}
                <span className="font-[600] text-black">
                  {new Date(selectedEmail.createdAt).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
          <div className="border-b p-4 divide-y space-y-2 flex-1">
            <div className=" pb-2">
              <p className="text-gray-500">Request For:</p>
              <p className="text-black font-[600]">
                {selectedEmail.requestFor}
              </p>
            </div>
            <div className=" pb-2">
              <p className="text-gray-500">Reason for Request:</p>
              <p className="text-black">{selectedEmail.content}</p>
            </div>
          </div>
          <div className=" p-4 bg-gray-100 flex items-center justify-between">
            <div className="flex items-end gap-2 w-full">
              <textarea
                name=""
                id=""
                className="border border-gray-300 bg-gray-50 rounded-md p-2 flex-1"
                placeholder={
                  !!selectedEmail.status
                    ? "No comment Added"
                    : "Add a comment here..."
                }
                value={selectedEmail.comment}
                disabled={!!selectedEmail.status}
              />
              {selectedEmail.status ? (
                <>
                  {selectedEmail.status === "approved" && (
                    <Button>Approved</Button>
                  )}
                  {selectedEmail.status === "rejected" && (
                    <Button>Rejected</Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant={"outline"}
                    className="border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-green-200 text-green-500 hover:text-green-600 hover:bg-green-50"
                  >
                    Accept
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No Mail Selected for viewing</p>
      )}
    </div>
  );
}
