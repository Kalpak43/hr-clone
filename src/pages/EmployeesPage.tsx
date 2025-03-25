import EmployeeCard from "@/components/EmployeeCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { employeeList, orgTree } from "@/data";
import {
  AtSign,
  Check,
  FilePenLine,
  Image,
  Medal,
  Paperclip,
  Plus,
  Search,
  SmilePlus,
  Trash,
  Vote,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
  const [groupByDepartment, setGroupByDepartment] = useState(false);

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

  const groupEmployeesByDepartment = (tree: any) => {
    const departmentMap = new Map();

    const traverse = (node: any) => {
      if (!node) return;

      if (!departmentMap.has(node.department)) {
        departmentMap.set(node.department, {
          name: node.department,
          children: [],
        });
      }

      departmentMap
        .get(node.department)
        .children.push({ ...node, children: [] });

      node.children?.forEach(traverse);
    };

    traverse(tree);

    return {
      name: "Departments",
      children: Array.from(departmentMap.values()),
    };
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(!query.trim() ? "" : query);
    if (!query.trim()) return;
    expandedNodes.clear(); // Reset expanded nodes on new search

    let newTree;
    if (!query) {
      newTree = groupByDepartment
        ? groupEmployeesByDepartment(orgTree)
        : orgTree;
    } else {
      newTree = filterTree(orgTree, query);
      if (!newTree) newTree = { name: "No results found", children: [] };
    }

    setFilteredTree(newTree);
    setExpandedNodes(new Set(expandedNodes)); // Trigger re-render
  };

  // Render nodes with dynamic expansion
  const renderCustomNode = ({ nodeDatum, toggleNode }: any) => {
    const isExpanded =
      !nodeDatum.__rd3t?.collapsed ||
      !nodeDatum.children ||
      (nodeDatum.children && nodeDatum.children.length == 0);

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
        <foreignObject x={30} y={-15} width={300} height={300}>
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

  const transformedTree = groupByDepartment
    ? groupEmployeesByDepartment(filteredTree)
    : filteredTree;

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

      <div className="absolute top-2 md:top-8 right-2 md:right-8 flex items-center">
        <label className="mr-2 text-sm font-medium text-gray-700">
          Group by Department
        </label>
        <Switch
          checked={groupByDepartment}
          onCheckedChange={setGroupByDepartment}
          className="data-[state=checked]:bg-blue-400"
        />
      </div>
      <EngageModal />
      {/* Org Tree */}
      <div className="w-full h-full">
        <Tree
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
    </div>
  );
}

export default EmployeesPage;

export function EngageModal() {
  const [filter, setFilter] = useState<number>(0);
  const [_, setSelectedItem] = useState<
    "Origanization" | "Department" | "Team"
  >("Origanization");

  const handleSelect = (item: "Origanization" | "Department" | "Team") => {
    setSelectedItem(item);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-0 right-4 bg-blue-400 hover:bg-blue-500"
          variant="default"
        >
          <Plus className="" />
          Engage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center max-md:justify-between gap-2 text-gray-700 w-full">
            <Button
              variant={filter === 0 ? "outline" : "ghost"}
              className={filter === 0 ? " bg-gray-100" : ""}
              onClick={() => setFilter(0)}
              size={"sm"}
            >
              <FilePenLine size={12} />
              <span>Post</span>
            </Button>
            <Button
              variant={filter === 1 ? "outline" : "ghost"}
              className={filter === 1 ? " bg-gray-100" : ""}
              onClick={() => setFilter(1)}
              size={"sm"}
            >
              <Vote size={12} />
              <span>Poll</span>
            </Button>
            <Button
              variant={filter === 2 ? "outline" : "ghost"}
              className={filter === 2 ? " bg-gray-100" : ""}
              onClick={() => setFilter(2)}
              size={"sm"}
            >
              <Medal size={12} />
              <span>Praise</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogDescription>
          <div className="border border-gray-300 rounded-md divide-y">
            {
              {
                0: <PostCard />,
                1: <PollCard />,
                2: <PraiseCard />,
              }[filter]
            }
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <p className="text-gray-500">Posting to</p>
                <Select onValueChange={handleSelect}>
                  <SelectTrigger className="w-[150px]" size="sm">
                    <SelectValue placeholder="Origanization" />
                  </SelectTrigger>
                  <SelectContent className="text-black">
                    <SelectItem value="Origanization">Origanization</SelectItem>
                    <SelectItem value="Department">Department</SelectItem>
                    <SelectItem value="Team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={"outline"}>Cancel</Button>
                <Button
                  variant={"default"}
                  className="bg-blue-400 hover:bg-blue-500"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export function PostCard() {
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<string>("");

  // Update the highlightMentions function to preserve spaces better
  const highlightMentions = (text: string) => {
    return text.replace(
      /@(\w+)/g,
      '<span class="text-blue-400 font-[700] font-medium">@$1</span>'
    );
  };

  // Modify the handleInput function to be more responsive
  const handleInput = () => {
    if (editorRef.current) {
      let newText = editorRef.current.innerText;
      // Check if the new text exceeds the character limit
      if (newText.length > 500) {
        // Truncate the content to the maximum allowed characters
        newText = newText.slice(0, 500);

        // Update the content inside the contentEditable
        editorRef.current.innerText = newText;

        // Move the cursor to the end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      // Update the state if necessary
      setContent(newText);
    }
  };

  // Insert mention when the @ button is clicked
  const insertMention = () => {
    if (editorRef.current) {
      // Focus the editor first
      editorRef.current.focus();

      // Get current selection
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Insert @ symbol at cursor position
        range.deleteContents();
        range.insertNode(document.createTextNode("@"));

        // Move cursor after the @ symbol
        range.setStartAfter(range.endContainer);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // If no selection, just append @ at the end
        editorRef.current.textContent += "@";

        // Move cursor to the end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      setContent("@");

      editorRef.current.focus();
    }
  };

  useEffect(() => {
    if (editorRef) {
      editorRef.current?.focus();
    }
  }, []);

  // Replace the useEffect with this improved version
  useEffect(() => {
    if (editorRef.current) {
      // Store current selection info
      const selection = window.getSelection();
      let selectionState = null;

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // Store information about the current selection
        selectionState = {
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset,
        };
      }

      // Get current content and cursor position
      const currentHtml = editorRef.current.innerHTML;
      const currentText = editorRef.current.innerText;

      // Only update if content has changed

      // Apply highlighting
      const newHtml = highlightMentions(currentText);

      // Only update DOM if the highlighted HTML would be different
      if (newHtml !== currentHtml) {
        // Remember scroll position
        const scrollTop = editorRef.current.scrollTop;

        // Update the HTML
        editorRef.current.innerHTML = newHtml;

        // Restore scroll position
        editorRef.current.scrollTop = scrollTop;

        // Try to restore selection if we had one
        if (selection && selectionState) {
          try {
            // Create a new range
            const newRange = document.createRange();

            // Find appropriate text nodes to place cursor
            // This is simplified and might need adjustment
            const allTextNodes: Node[] = [];
            const walker = document.createTreeWalker(
              editorRef.current,
              NodeFilter.SHOW_TEXT,
              null
            );

            let node: Node | null = walker.nextNode();
            while (node) {
              allTextNodes.push(node);
              node = walker.nextNode();
            }

            if (allTextNodes.length > 0) {
              // Place cursor at the end of the last text node
              const lastTextNode = allTextNodes[allTextNodes.length - 1];
              newRange.setStart(
                lastTextNode,
                lastTextNode.textContent?.length || 0
              );
              newRange.collapse(true);

              // Apply the selection
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          } catch (e) {
            console.error("Failed to restore selection:", e);
          }
        }
      }

      // Update our state to match current text
      if (content !== currentText) {
        setContent(currentText);
      }
    }
  }, [content]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior

      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

          // Insert a line break at the current cursor position
          const br = document.createElement("br");
          range.deleteContents();
          range.insertNode(br);

          // Create a second <br> for spacing (optional)
          const secondBr = document.createElement("br");
          range.insertNode(secondBr);

          // Move the cursor after the newly inserted <br>
          range.setStartAfter(secondBr);
          range.collapse(true);

          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    const emojiChar = emoji.native; // Get the emoji character

    if (editorRef.current) {
      // Insert the emoji at the current caret position
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      if (range) {
        range.deleteContents();
        range.insertNode(document.createTextNode(emojiChar));
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);

        // Update content state
        setContent(editorRef.current.textContent || "");
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <section className="max-h-[500px] overflow-y-auto max-w-full">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className={`textbox min-h-[200px] relative overflow-y-auto w-full rounded-md bg-background px-3 py-2 text-sm text-black ring-offset-background placeholder:text-muted-foreground before:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            !!content.trim() && "before:hidden"
          }`}
          role="textbox"
          aria-multiline="true"
          style={{
            display: "block", // Ensures block behavior for content
            whiteSpace: "pre-wrap", // Wrap text and preserve spaces
            wordWrap: "break-word", // Break long words to prevent overflow
            overflowWrap: "break-word", // Ensures compatibility for wrapping
            width: "100%", // Ensure the width does not expand
            maxWidth: "100%", // Prevent horizontal growth
            boxSizing: "border-box", // Respect padding and border within width
          }}
        />
        {!!image.trim() && (
          <div className="relative w-full h-52 rounded-xl border overflow-hidden">
            <img
              src={image}
              alt="Uploaded"
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        )}
      </section>
      <div className="flex items-center gap-2">
        <Button variant="outline" size={"icon"} onClick={insertMention}>
          <AtSign />
        </Button>
        <Button variant="outline" size={"icon"} className="relative">
          <Image />

          <input
            type="file"
            accept="image/*"
            id="imageInput"
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            onChange={handleImageChange}
          />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <SmilePlus />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full overflow-y-auto p-2">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme={"light"}
              searchPosition="none" // Hide search bar
              previewPosition="none" // Hide preview section
              className=""
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function PollCard() {
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4 space-y-4">
      <section className="space-y-8">
        <input
          type="text"
          className="w-full px-4 py-2 ring-0 focus-visible:outline-0 border-b focus-visible:border-black text-black"
          placeholder="What is this poll about?"
        />
        <div className="px-2 space-y-2 max-h-[200px] overflow-y-auto">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="w-full px-4 py-2 ring-0 focus-visible:outline-0 border-b focus-visible:border-black text-black"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.splice(index, 1);
                  setOptions(newOptions);
                }}
              >
                <Trash />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setOptions([...options, ""])}
        >
          <Plus />
          Add Option
        </Button>
      </section>
      <section className="flex items-center gap-4 justify-between text-gray-600 text-xs">
        <div className="flex items-center gap-2">
          <p>Poll Expires on </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-fit justify-start text-left font-normal text-xs",
                  !date && "text-muted-foreground"
                )}
                size={"sm"}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notify"
            className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-white"
          />
          <label
            htmlFor="notify"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Notify Employees
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notify"
            className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-white"
          />
          <label
            htmlFor="notify"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Anonymus Poll
          </label>
        </div>
      </section>
    </div>
  );
}

export function PraiseCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectEmployees, setSelectedEmployees] = useState<
    {
      name: string;
      image: string;
    }[]
  >([]);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter employeeList based on searchTerm
  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <section className="space-y-4">
        <div className="space-y-2">
          <div className="border border-gray-300 bg-gray-50 rounded-md p-2 flex items-center relative">
            <input
              type="text"
              className="text-sm pl-2 min-w-xs rounded-md focus:outline-none w-full"
              placeholder="Search Employee..."
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
              <div className="search-panel absolute top-full inset-x-0 z-40 mt-2 max-h-[200px] overflow-y-auto border border-gray-300 rounded-md bg-white shadow-sm p-4">
                {filteredEmployees.length > 0 ? (
                  <ul>
                    {filteredEmployees.map((employee, i) => (
                      <li key={i}>
                        <Button
                          className="w-full justify-start"
                          variant={"ghost"}
                          onClick={() => {
                            setSelectedEmployees((prev) =>
                              prev.some((emp) => emp.name === employee.name)
                                ? prev
                                : [...prev, employee]
                            );
                            setSearchTerm("");
                          }}
                        >
                          <span className="w-6 border rounded-full aspect-square">
                            <img
                              src={employee.image}
                              alt={employee.name}
                              className="rounded-full"
                            />
                          </span>
                          {employee.name}
                          {selectEmployees.some(
                            (emp) => emp.name === employee.name
                          ) && (
                            <span>
                              <Check className="text-blue-400" />
                            </span>
                          )}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No employees found.</p>
                )}
              </div>
            )}
          </div>
          <div>
            {selectEmployees.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {selectEmployees.map((employee, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 border p-1 rounded-full bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedEmployees((prev) =>
                        prev.filter((emp) => emp.name !== employee.name)
                      );
                    }}
                  >
                    <div className="w-6 aspect-square rounded-full border overflow-clip">
                      <img
                        src={employee.image}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-700 font-[600]">
                      {employee.name}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Textarea placeholder="What did the emolovee do to deserve the praise" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-16 aspect-square rounded-full border overflow-clip">
            <img src={selectedBadge ?? "/default-badge.svg"} alt="" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Select Badge</Button>
            </PopoverTrigger>
            <PopoverContent className="grid grid-cols-3 gap-2 p-4 w-[300px]">
              <button
                className={`w-16 aspect-square rounded-full border overflow-clip p-1 hover:bg-gray-100 ${
                  selectedBadge === "/gold.svg" ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedBadge("/gold.svg")}
              >
                <img src={"/gold.svg"} alt={`Badge Gold`} />
              </button>
              <button
                className={`w-16 aspect-square rounded-full border overflow-clip p-1 hover:bg-gray-100 ${
                  selectedBadge === "/silver.svg" ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedBadge("/silver.svg")}
              >
                <img src={"/silver.svg"} alt={`Badge silver`} />
              </button>
              <button
                className={`w-16 aspect-square rounded-full border overflow-clip p-1 hover:bg-gray-100 ${
                  selectedBadge === "/bronze.svg" ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedBadge("/bronze.svg")}
              >
                <img src={"/bronze.svg"} alt={`Badge bronze`} />
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <p className="text-black">Project (Optional)</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Project A">Project A</SelectItem>
              <SelectItem value="Project B">Project B</SelectItem>
              <SelectItem value="Project C">Project C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-blue-400 hover:text-blue-500 relative"
            disabled={attachments.length >= 5}
          >
            <Paperclip />
            Add Attachment
            <input
              type="file"
              multiple
              accept="image/*, application/pdf"
              onChange={(e) => {
                if (e.target.files)
                  setAttachments([
                    ...attachments,
                    ...Array.from(e.target.files),
                  ]);

                e.target.value = "";
              }}
              className="opacity-0 absolute inset-0"
              disabled={attachments.length >= 5}
            />
          </Button>
          <p className="text-xs">Max number of files allowed: 5.</p>
          <div>
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border rounded-md p-2 text-xs"
                  >
                    <span className="">{file.name}</span>
                    <button
                      onClick={() => {
                        const newAttachments = [...attachments];
                        newAttachments.splice(index, 1);
                        setAttachments(newAttachments);
                      }}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
