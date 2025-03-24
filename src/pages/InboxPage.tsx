import { Button } from "@/components/ui/button";
import { email as initialEmails } from "@/data";
import { Logs, Mail, MailOpen, MailWarning, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function InboxPage() {
  const [email, setEmail] = useState<EmailType[]>(
    initialEmails.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })
  );

  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  function handleEmailUpdate(
    id: number,
    comment: string,
    status: "approved" | "rejected"
  ) {
    setEmail((prevEmails) =>
      prevEmails.map(
        (email) =>
          email.id === id
            ? {
                ...email,
                comment: comment, // Update the comment
                status: status, // Update the status
                approvedBy: "Admin", // Set approvedBy for "approved"
              }
            : email // Keep other emails unchanged
      )
    );
  }

  return (
    <div className="hero h-full relative">
      <div className="grid xl:grid-cols-3 gap-4 h-full relative">
        <div className="h-full relative">
          <div className="absolute inset-0 border border-gray-300 rounded-md p-4 flex flex-col gap-4">
            <MailSearch />

            <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
              <Button
                variant={filter === "all" ? "outline" : "ghost"}
                className={filter === "all" ? " bg-gray-100" : ""}
                onClick={() => setFilter("all")}
                size={"sm"}
              >
                <Logs size={12} />
                <span>All</span>
              </Button>
              <Button
                variant={filter === "read" ? "outline" : "ghost"}
                className={filter === "read" ? " bg-gray-100" : ""}
                onClick={() => setFilter("read")}
                size={"sm"}
              >
                <MailOpen size={12} />
                <span>Read</span>
              </Button>
              <Button
                variant={filter === "unread" ? "outline" : "ghost"}
                className={filter === "unread" ? " bg-gray-100" : ""}
                onClick={() => setFilter("unread")}
                size={"sm"}
              >
                <Mail size={12} />
                <span>Unread</span>
              </Button>
            </div>

            <div className="space-y-2 max-h-full flex-1 overflow-y-auto ">
              {email
                .filter((e) => {
                  if (filter === "all") return true;
                  if (filter === "read") return e.read;
                  if (filter === "unread") return !e.read;
                })
                .map((e) => (
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

        <MailCardExtended emails={email} updateStatus={handleEmailUpdate} />
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
          className={`cursor-pointer w-full capitalize bg-blue-300  disabled:opacity-100 ${
            email.status == "approved" && "bg-green-500 hover:bg-green-600"
          } ${email.status == "rejected" && "bg-red-400 hover:bg-red-600"}`}
          size={"sm"}
          disabled
        >
          {email.status ? email.status : "Review"}
        </Button>
        {email.status && (
          <p className="text-gray-500 text-xs text-right">
            {email.status === "approved" ? "Approved" : "Rejected"} By{" "}
            <span className="font-[600] text-black">{email.approvedBy}</span>
          </p>
        )}
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

export function MailCardExtended({
  emails,
  updateStatus,
}: {
  emails: EmailType[];
  updateStatus: (
    id: number,
    comment: string,
    status: "approved" | "rejected"
  ) => void;
}) {
  const { mailID } = useParams<{ mailID: string }>();
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>();
  const [comment, setComment] = useState(selectedEmail?.comment ?? "");

  useEffect(() => {
    if (mailID) {
      setSelectedEmail(emails.find((e) => e.id === Number(mailID)));
    }
  }, [mailID]);

  return (
    <>
      <div
        className={`${!mailID && "hidden"} bg-[#00000080] absolute inset-0 z-30 xl:hidden`}
      ></div>
      <div
        className={`max-xl:absolute inset-0 md:max-xl:top-1/2 z-40 bg-white border border-gray-300 rounded-md xl:col-span-2 ${
          !mailID && "hidden"
        }`}
      >
        <Link to={"/inbox"} className="absolute top-0 right-0 m-2">
          <X size={20} />
        </Link>
        <div className="flex flex-col justify-center items-center w-full h-full rounded-md overflow-hidden">
          {selectedEmail ? (
            <>
              <div className="border-b w-full bg-gray-100 p-4 flex max-md:flex-col max-md:items-start items-center justify-between">
                <div className="md:space-y-2">
                  <p className="text-gray-500">
                    Subject:{" "}
                    <span className="font-[600] text-black text-lg md:text-xl">
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
                <div className="md:space-y-2">
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
              <div className="border-b w-full p-4 divide-y space-y-2 flex-1">
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
              <div className=" p-4 w-full bg-gray-100 flex items-center justify-between">
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!!selectedEmail.status}
                  />
                  {selectedEmail.status ? (
                    <Button
                      className={`capitalized disabled:opacity-100 ${
                        selectedEmail.status == "approved" &&
                        "bg-green-500 hover:bg-green-600"
                      } ${
                        selectedEmail.status == "rejected" &&
                        "bg-red-400 hover:bg-red-600"
                      }`}
                      disabled
                    >
                      {selectedEmail.status}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant={"outline"}
                        className="border-red-200 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          updateStatus(Number(mailID), comment, "rejected");
                        }}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={"outline"}
                        className="border-green-200 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => {
                          updateStatus(Number(mailID), comment, "approved");
                        }}
                      >
                        Accept
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <MailWarning className="mb-2 text-gray-500" size={30} />
              <p>No Mail Selected for viewing</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function MailSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [email, _] = useState<EmailType[]>(
    initialEmails.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  );

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter emails based on the search term
  const filteredEmails = email.filter(
    (mail) =>
      mail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative">
      <Search size={16} className="text-gray-600 mr-2" />
      <input
        type="text"
        className="text-sm pl-2 min-w-xs rounded-md focus:outline-none w-full"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() =>
          setTimeout(() => {
            setIsFocused(true);
          }, 100)
        }
        onBlur={() =>
          setTimeout(() => {
            setIsFocused(false);
          }, 100)
        }
      />
      {isFocused && (
        <div className="absolute top-full inset-x-0 z-40 mt-2 max-h-[400px] overflow-y-auto">
          {searchTerm && filteredEmails.length > 0 ? (
            <div className="border border-gray-300 rounded-md bg-white shadow-sm">
              {filteredEmails.map((mail) => (
                <Link
                  key={mail.id}
                  to={`/inbox/${mail.id}`}
                  className="block p-3 border-b border-gray-200 last:border-none hover:bg-gray-100 cursor-pointer"
                >
                  <h3 className="font-medium text-gray-800">{mail.title}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {mail.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    Created By: {mail.createdBy} |{" "}
                    {mail.createdAt.toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-gray-500 text-center p-4 border border-gray-300 rounded-md bg-white">
              No results found for "{searchTerm}".
            </div>
          ) : (
            <div className="text-gray-500 text-center p-4 border border-gray-300 rounded-md bg-white">
              Start typing to search emails.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
