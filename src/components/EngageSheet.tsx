import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  FilePenLine,
  Medal,
  Newspaper,
  Plus,
  SendHorizonal,
  ThumbsUp,
  Vote,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeList } from "@/data";
import {
  AtSign,
  Check,
  Image,
  Paperclip,
  SmilePlus,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { cn } from "@/lib/utils";
import { format, formatDistance } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "./ui/progress";

function EngageSheet() {
  const [filter, setFilter] = useState<number>(-1);
  const [recents, setRecents] = useState<PostType[]>([]);

  useEffect(() => {
    console.log(recents);
  }, [recents]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="absolute bottom-0 right-4 bg-blue-400 hover:bg-blue-500"
          variant="default"
          size={"icon"}
        >
          <Newspaper className="" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-md pb-4">
        <SheetHeader className="pt-12 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="">Recents</p>
            <div className="flex items-center max-md:justify-between gap-2 text-gray-700">
              <Button
                variant={filter === 0 ? "outline" : "ghost"}
                className={filter === 0 ? " bg-gray-100" : ""}
                onClick={() => setFilter(filter === 0 ? -1 : 0)}
                size={"sm"}
              >
                <FilePenLine size={12} />
              </Button>
              <Button
                variant={filter === 1 ? "outline" : "ghost"}
                className={filter === 1 ? " bg-gray-100" : ""}
                onClick={() => setFilter(filter === 1 ? -1 : 1)}
                size={"sm"}
              >
                <Vote size={12} />
              </Button>
              <Button
                variant={filter === 2 ? "outline" : "ghost"}
                className={filter === 2 ? " bg-gray-100" : ""}
                onClick={() => setFilter(filter === 2 ? -1 : 2)}
                size={"sm"}
              >
                <Medal size={12} />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <SheetDescription className="px-4 overflow-y-auto space-y-4 divide-y">
          <div className="pb-4">
            {
              {
                0: (
                  <PostCard
                    handleClose={() => setFilter(-1)}
                    saveToPosts={(post) => {
                      setRecents((x) =>
                        [...x, post].sort((a, b) => b.created_at - a.created_at)
                      );
                    }}
                  />
                ),
                1: (
                  <PollCard
                    handleClose={() => setFilter(-1)}
                    saveToPosts={(post) => {
                      setRecents((x) =>
                        [...x, post].sort((a, b) => b.created_at - a.created_at)
                      );
                    }}
                  />
                ),
                2: (
                  <PraiseCard
                    handleClose={() => setFilter(-1)}
                    saveToPosts={(post) => {
                      setRecents((x) =>
                        [...x, post].sort((a, b) => b.created_at - a.created_at)
                      );
                    }}
                  />
                ),
              }[filter]
            }
          </div>
          <div className="space-y-4">
            {recents.map((recent) => {
              if (recent.type == "post")
                return (
                  <div className="">
                    <SavedPost post={recent} />
                    <p className="text-right text-xs">
                      Only visible to your {recent.postedTo}
                    </p>
                  </div>
                );
              if (recent.type == "poll")
                return (
                  <div>
                    <SavedPoll post={recent} />
                    <p className="text-right text-xs">
                      Only visible to your {recent.postedTo}
                    </p>
                  </div>
                );
              if (recent.type == "praise")
                return (
                  <div>
                    <SavedPraise post={recent} />{" "}
                    <p className="text-right text-xs">
                      Only visible to your {recent.postedTo}
                    </p>
                  </div>
                );
            })}
            <div>
              <SavedPost
                post={{
                  content: "Hi",
                  created_at: new Date().getTime(),
                  type: "post",
                  anonymus: false,
                  postedTo: "organization",
                }}
              />{" "}
              <p className="text-right text-xs">
                Only visible to your organization
              </p>
            </div>
            <div>
              <SavedPoll
                post={{
                  content: "Who will Win?",
                  options: ["KKR", "RCB", "MI"],
                  created_at: new Date().getTime(),
                  type: "poll",
                  anonymus: false,
                  postedTo: "organization",
                  expiresOn: new Date().getTime(),
                }}
              />{" "}
              <p className="text-right text-xs">
                Only visible to your department
              </p>
            </div>
            <div>
              <SavedPraise
                post={{
                  content: "Great Work",
                  mentions: [
                    {
                      name: "Alice Johnson",
                      image: "https://i.pravatar.cc/150?img=1",
                    },
                  ],
                  created_at: new Date().getTime(),
                  type: "praise",
                  anonymus: false,
                  postedTo: "organization",
                  badge: "/gold.svg",
                  project: "Project B",
                }}
              />
              <p className="text-right text-xs">Only visible to your team</p>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default EngageSheet;

export function PostCard({
  handleClose,
  saveToPosts,
}: {
  handleClose: () => void;
  saveToPosts: (post: PostType) => void;
}) {
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<GroupType>("organization");

  const handleSelect = (item: GroupType) => {
    setSelectedItem(item);
  };

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

  const [openPicker, setOpenPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close the picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpenPicker(false);
      }
    };

    if (openPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPicker]);

  return (
    <div className="border border-gray-300 rounded-md divide-y">
      <div className="p-4 flex flex-col  justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-gray-500">Posting to</p>
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[150px]" size="sm">
              <SelectValue placeholder="Origanization" />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectItem value="origanization">Origanization</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenPicker(true)}
          >
            <SmilePlus />
          </Button>
          {openPicker && (
            <div className="fixed inset-0 z-40 bg-[#00000080] flex items-center  justify-center">
              <div ref={pickerRef}>
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme={"light"}
                  searchPosition="none"
                  previewPosition="none"
                  className=""
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex  justify-end gap-4">
        <Button variant={"outline"} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={"default"}
          className="bg-blue-400 hover:bg-blue-500"
          onClick={() => {
            if (editorRef.current) {
              const newPost: PostType = {
                content: editorRef.current.innerHTML,
                image: image,
                created_at: new Date().getTime(),
                type: "post",
                anonymus: false,
                postedTo: selectedItem,
              };
              saveToPosts(newPost);

              handleClose();
            }
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export function SavedPost({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="border border-gray-300 rounded-md divide-y p-4 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 pb-2 border-b-0">
          <div className="w-6 aspect-square rounded-full border overflow-clip">
            <img src="/default.png" className="w-full h-full object-cover" />
          </div>
          <p className="text-black">Admin</p>
        </div>
        <div className="flex items-center justify-end border-b-0">
          <p className="text-xs">
            {formatDistance(new Date(post.created_at), new Date(), {
              addSuffix: true,
            })}
          </p>
          <FilePenLine size={16} className="inline ml-2 text-black" />
        </div>
      </div>
      <div className="space-y-2">
        <div
          className="text-black pb-6"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        {!!post.image?.trim() && (
          <div className="relative w-full h-52 rounded-xl border overflow-hidden">
            <img
              src={post.image}
              alt="Uploaded"
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className={liked ? "bg-blue-400 hover:bg-blue-500 text-white" : ""}
            onClick={() => setLiked((x) => !x)}
          >
            <ThumbsUp />
          </Button>
          <p>1</p>
        </div>

        <div className="flex items-end gap-2 w-full">
          <input
            type="text"
            className="w-full flex-1 py-2 ring-0 focus-visible:outline-0 border-b focus-visible:border-black text-black"
            placeholder="Comment..."
          />
          <Button size={"icon"} variant={"outline"}>
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PollCard({
  handleClose,
  saveToPosts,
}: {
  handleClose: () => void;
  saveToPosts: (post: PostType) => void;
}) {
  const [content, setContent] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [date, setDate] = useState<Date>(new Date());
  const [anonymous, setAnonymous] = useState(false);

  const [selectedItem, setSelectedItem] = useState<GroupType>("organization");

  const handleSelect = (item: GroupType) => {
    setSelectedItem(item);
  };

  return (
    <div className="border border-gray-300 rounded-md divide-y">
      <div className="p-4 flex flex-col  justify-between gap-4">
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
      </div>
      <div className="p-4 space-y-4">
        <section className="space-y-8">
          <input
            type="text"
            className="w-full px-4 py-2 ring-0 focus-visible:outline-0 border-b focus-visible:border-black text-black"
            placeholder="What is this poll about?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </section>
        <section className="flex items-center justify-end gap-4 flex-wrap text-gray-600 text-xs">
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
              checked={anonymous}
              onCheckedChange={() => {
                setAnonymous((x) => !x);
              }}
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
      <div className="p-4 flex  justify-end gap-4">
        <Button variant={"outline"} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={"default"}
          className="bg-blue-400 hover:bg-blue-500"
          onClick={() => {
            if (!!content.trim() && options.length > 0) {
              const newPoll: PostType = {
                content: content,
                type: "poll",
                options: options,
                created_at: new Date().getTime(),
                anonymus: anonymous,
                expiresOn: date.getTime(),
                postedTo: selectedItem,
              };
              saveToPosts(newPoll);
              handleClose();
            }
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export function SavedPoll({ post }: { post: PostType }) {
  const [votes, setVotes] = useState(Array(post.options!.length).fill(0));
  const totalVotes = votes.reduce((a, b) => a + b, 0);

  return (
    <div className="border border-gray-300 rounded-md divide-y p-4 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 pb-2 border-b-0">
          <div className="w-6 aspect-square rounded-full border overflow-clip">
            <img src="/default.png" className="w-full h-full object-cover" />
          </div>
          <p className="text-black">Admin</p>
        </div>
        <div className="flex items-center justify-end border-b-0">
          <p className="text-xs">
            {formatDistance(new Date(post.created_at), new Date(), {
              addSuffix: true,
            })}
            <Vote size={16} className="inline ml-2 text-black" />
          </p>
        </div>
      </div>
      <div className="space-y-2 pb-2">
        <p className="text-black">{post.content}</p>
        <div className="">
          {post.options!.map((option, index) => {
            const percentage =
              totalVotes > 0
                ? Math.round((votes[index] / totalVotes) * 100)
                : 0;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center w-14">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                    onClick={() => {
                      setVotes((prevVotes) => {
                        const newVotes = [...prevVotes];
                        if (newVotes[index] > 0) {
                          newVotes[index] -= 1; // Remove vote
                        } else {
                          newVotes[index] += 1; // Add vote
                        }
                        return newVotes;
                      });
                    }}
                  >
                    <Checkbox
                      checked={votes[index] > 0}
                      className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-white"
                    />
                  </Button>
                  <p className="text-gray-800 font-medium w-1/4 text-xs">
                    {option}
                  </p>
                </div>
                <Progress
                  value={percentage}
                  className="flex-1 h-1 rounded-full bg-gray-200"
                />
                <p className="text-gray-500 text-sm w-12 text-right">
                  {percentage}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs">
          <span>Valid Till: </span>
          <span className="text-black">
            {new Date(post.expiresOn!).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}

export function PraiseCard({
  handleClose,
  saveToPosts,
}: {
  handleClose: () => void;
  saveToPosts: (post: PostType) => void;
}) {
  const [selectedItem, setSelectedItem] = useState<GroupType>("organization");

  const handleSelect = (item: GroupType) => {
    setSelectedItem(item);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectEmployees, setSelectedEmployees] = useState<
    {
      name: string;
      image: string;
    }[]
  >([]);
  const [content, setContent] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [project, setProject] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter employeeList based on searchTerm
  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-gray-300 rounded-md divide-y">
      <div className="p-4 flex flex-col  justify-between gap-4">
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
      </div>
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
            <Textarea
              placeholder="What did the emolovee do to deserve the praise"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
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
                    selectedBadge === "/silver.svg"
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedBadge("/silver.svg")}
                >
                  <img src={"/silver.svg"} alt={`Badge silver`} />
                </button>
                <button
                  className={`w-16 aspect-square rounded-full border overflow-clip p-1 hover:bg-gray-100 ${
                    selectedBadge === "/bronze.svg"
                      ? "ring-2 ring-blue-500"
                      : ""
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
            <Select
              onValueChange={(e) => {
                console.log(e);
                setProject(e);
              }}
            >
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
      <div className="p-4 flex  justify-end gap-4">
        <Button variant={"outline"} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={"default"}
          className="bg-blue-400 hover:bg-blue-500"
          onClick={() => {
            if (!!content.trim() && selectedBadge) {
              const newPraise: PostType = {
                content: content,
                created_at: new Date().getTime(),
                mentions: selectEmployees,
                badge: selectedBadge,
                anonymus: false,
                type: "praise",
                postedTo: selectedItem,
                attachments: attachments,
                project: project,
              };

              saveToPosts(newPraise);
              handleClose();
            }
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export function SavedPraise({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="border border-gray-300 rounded-md divide-y p-4 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 pb-2 border-b-0">
          <div className="w-6 aspect-square rounded-full border overflow-clip">
            <img src="/default.png" className="w-full h-full object-cover" />
          </div>
          <p className="text-black">Admin</p>
        </div>
        <div className="flex items-center justify-end border-b-0">
          <p className="text-xs">
            {formatDistance(new Date(post.created_at), new Date(), {
              addSuffix: true,
            })}
            <Medal size={16} className="inline ml-2 text-black" />
          </p>
        </div>
      </div>
      <div className="space-y-4 pb-2">
        <p className="flex items-center flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 p-1 border rounded-full bg-gray-100">
            <div className="w-6 aspect-square rounded-full border overflow-clip">
              <img
                src={post.mentions![0].image}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-black">{post.mentions![0].name}</p>
          </div>{" "}
          <p>was awarded with</p>{" "}
          <div className="w-6 aspect-square rounded-full border overflow-clip">
            <img src={post.badge} className="w-full h-full object-cover" />
          </div>
          <p>badge</p>
        </p>
        <p className="text-black">{post.content}</p>
        {post.project && (
          <div className="text-xs">
            <p className="font-[600]">
              Project: <span className="text-black ">{post.project}</span>
            </p>
          </div>
        )}
        <div></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className={liked ? "bg-blue-400 hover:bg-blue-500 text-white" : ""}
            onClick={() => setLiked((x) => !x)}
          >
            <ThumbsUp />
          </Button>
          <p>1</p>
        </div>

        <div className="flex items-end gap-2 w-full">
          <input
            type="text"
            className="w-full flex-1 py-2 ring-0 focus-visible:outline-0 border-b focus-visible:border-black text-black"
            placeholder="Comment..."
          />
          <Button size={"icon"} variant={"outline"}>
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}
