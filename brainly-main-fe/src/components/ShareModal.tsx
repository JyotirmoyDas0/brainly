import { CrossIcon } from "../icons/CrossIcon";
import { SquareStackIcon } from "../icons/SquareStackIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function ShareModal({ open, onClose }) {
  const shareMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      return res.data;
    },

    onSuccess: async (data) => {
      const hash = data.link.split("/").pop();

      const shareUrl = `${window.location.origin}/share/${hash}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard")
      onClose();
    },

    onError: () => {
      toast.error("Failed to generate share link");
    },
  });

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/60 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 rounded max-w-110">
              <div className="flex justify-between p-2">
                <div className="font-medium">Share Your Second Brain</div>
                <div onClick={onClose}>
                  <CrossIcon />
                </div>
              </div>
              <div className="p-2 pb-4">
                Share your entire collection of notes, documents, tweets and
                videos with others. They will be able to import your content
                into their own brain.
              </div>
              <div className="p-2">
                <Button
                  variant="primary"
                  startIcon={<SquareStackIcon />}
                  text="Share Brain"
                  fullWidth={true}
                  loading={shareMutation.isPending}
                  onClick={()=>shareMutation.mutate()}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
