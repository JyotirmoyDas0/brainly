import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { XIcon } from "../icons/XIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  id: string;
  onDelete: (id: string) => void;
}

export function Card(props: CardProps) {
  function handleDelete() {
      props.onDelete(props.id);
  }


  return (
    <div>
      <div
        className="p-4 bg-white rounded-md
       border-slate-200 max-w-72 border min-h-48 min-w-72"
      >
        <div className="flex justify-between items-center">
          <div className="flex text-md items-center">
            <div className="text-gray-500 pr-2">
              {props.type === "youtube" ? <YoutubeIcon /> : <XIcon />}
            </div>
            {props.title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <a href={props.link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <div onClick={handleDelete}>
                <DeleteIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          {props.type === "youtube" && (
            <iframe
              className="w-full"
              src={
                props.link.includes("youtu.be")
                  ? props.link.replace(
                      "https://youtu.be/",
                      "https://www.youtube.com/embed/",
                    )
                  : props.link.replace("watch?v=", "embed/")
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {props.type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={props.link}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
