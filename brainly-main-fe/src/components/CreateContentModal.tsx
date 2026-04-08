import { BACKEND_URL } from "../config";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ContentType = "youtube" | "twitter" | "note";

export function CreateContentModal({ open, onClose, initialData }) {
  const isEdit= !!initialData;
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("youtube");
  const queryClient = useQueryClient();

  useEffect(() => {
  if (initialData) {
    if (titleRef.current) titleRef.current.value = initialData.title;
    if (linkRef.current) linkRef.current.value = initialData.link;
    if (descriptionRef.current) descriptionRef.current.value = initialData.description;
    if (tagRef.current) tagRef.current.value = initialData.tags.join(",");
    setType(initialData.type);
  }
}, [initialData]);

  const addMutation = useMutation({
    mutationFn: async ({ title, link, type, description, tags }: any) => {
      if(isEdit){
              return axios.put(
        `${BACKEND_URL}/api/v1/content/${initialData?._id}`,
        { title, link, type, description, tags },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      }
      else{
      return axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type, description, tags },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
    }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      if(isEdit) toast.success("Contents Updated");
      else toast.success("Contents Added")
      onClose();
    },

    onError: () => {
      toast.error("Failed to add content");
    },
  });

  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const description = descriptionRef.current?.value;
    const tag = tagRef.current?.value;
    const tags = tag
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!title) {
      toast.error("Title is required");
      return;
    }

    if (type === "note" && !description) {
      toast.error("Description required for notes");
      return;
    }

    if (type !== "note" && !link) {
      toast.error("Link required");
      return;
    }

    addMutation.mutate({ title, link, type, description, tags });
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
              <div className="p-2 m-4">
                <Input ref={titleRef} placeholder={"Title"} />
                {type != "note" && <Input ref={linkRef} placeholder={"Link"} />}
                {type==="note" && <textarea ref={descriptionRef as any} placeholder={"Description"} className="border p-2 w-full"></textarea>}
                <Input ref={tagRef} placeholder={"Tags (e.g react, dsa)"} />
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
                <Button
                  text="Note"
                  variant={type === "note" ? "primary" : "secondary"}
                  onClick={() => {
                    setType("note");
                  }}
                ></Button>
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  onClick={addContent}
                  variant="primary"
                  text={isEdit?"Update":"Submit"}
                  loading={addMutation.isPending}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
