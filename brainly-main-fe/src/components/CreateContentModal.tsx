import { BACKEND_URL } from "../config";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ContentType = "youtube" | "twitter";


export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("youtube");
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ title, link, type }: any) => {
      return axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      onClose();
    },

    onError: () => {
      toast.error("Failed to add content");
    },
  });

  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      toast.error("Please fill all fields");
      return;
    }

    addMutation.mutate({ title, link, type });
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/60 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 rounded">
              <div className="flex justify-end">
                <div className="cursor-pointer" onClick={onClose}>
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={linkRef} placeholder={"Link"} />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  text="Youtube"
                  variant={type === "youtube" ? "primary" : "secondary"}
                  onClick={() => {
                    setType("youtube");
                  }}
                ></Button>
                <Button
                  text="Twitter"
                  variant={type === "twitter" ? "primary" : "secondary"}
                  onClick={() => {
                    setType("twitter");
                  }}
                ></Button>
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={addContent} variant="primary" text="Submit" loading={addMutation.isPending} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
