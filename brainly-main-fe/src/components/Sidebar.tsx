import { SidebarItem } from "./SidebarItem";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";

export function Sidebar({ setFilter }: { setFilter: (value: "all" | "youtube" | "twitter" | "note") => void }) {
  return (
    <div className="h-screen bg-white border w-72 fixed left-0 top-0 pl-6">
      <div className="flex pt-4 align-middle items-center">
        <div className="">
            <BrainIcon/>
        </div>
        <div className="pl-3">
            <h1 className="text-2xl font-medium">Brainly</h1>
        </div>
      </div>
      <div className="pt-4">
        <SidebarItem onClick={()=>setFilter("all")} text="All Content" />
        <SidebarItem onClick={()=>setFilter("twitter")} text="Twitter" icon={<XIcon />} />
        <SidebarItem onClick={()=>setFilter("youtube")} text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItem onClick={()=>setFilter("note")}text="Note" icon={<DocumentIcon />} />
        <SidebarItem text="Links" icon={<LinkIcon/>} />
        <SidebarItem text="Tags" icon={<TagIcon />} />
      </div>
    </div>
  );
}
