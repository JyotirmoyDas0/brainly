import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import "../index.css";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ShareModal } from "../components/ShareModal";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter,setFilter]=useState<"all" | "youtube" | "twitter" | "note">("all");
  type Content = {
  _id: string;
  title: string;
  link: string;
  description: string;
  type: "youtube" | "twitter" | "note";
  tags: string[];
};

const [editData, setEditData] = useState<Content | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  const { data } = useQuery({
    queryKey: ["contents", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        return res.data.content;
      }
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/content/search?q=${debouncedQuery}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      return res.data.content;
    },
  });

  return (
    <div>
      <Sidebar setFilter={setFilter}/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={async () => {
            setModalOpen(false);
            setEditData(null);
            queryClient.invalidateQueries({ queryKey: ["contents"] });
          }}
          initialData={editData}
        />
        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
        <div className="flex justify-between items-center py-3 ">
          <div className="text-2xl font-medium">All Notes</div>
          <div className="px-4 max-w-xl flex items-center gap-2">
            <input
              placeholder="Search notes, links, tags..."
              className="border p-2 w-full rounded-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="px-3 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => {
                setModalOpen(true);
              }}
            ></Button>
            <Button
              onClick={() => {
                setShareModalOpen(true);
              }}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap py-4">
          {!data && <div>Loading</div>}
          {data?.length === 0 && (
            <div className="text-gray-500">No Content</div>
          )}
          {data?.filter((item:any)=>filter==="all" || item.type ===filter).map(({ _id, type, link, title, description, tags }) => (
            <Card
              key={_id}
              id={_id}
              type={type}
              link={link}
              title={title}
              description={description}
              tags={tags}
              onDelete={() => deleteMutation.mutate(_id)}
              onEdit={(data)=>{
                setEditData(data);
                setModalOpen(true)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
