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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
    queryKey: ["contents"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return res.data.content;
    },
  });

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={async () => {
            setModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["contents"] });
          }}
        />
        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />
        <div className="flex justify-between items-center py-3 px-4">
          <div className="text-2xl font-medium">All Notes</div>
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
          {data?.map(({ _id, type, link, title }) => (
            <Card
              key={_id}
              id={_id}
              type={type}
              link={link}
              title={title}
              onDelete={() => deleteMutation.mutate(_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
