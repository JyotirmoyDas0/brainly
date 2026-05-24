import { type ReactElement } from "react";  // type-only import

export function SidebarItem({
  text,
  icon,
  onClick
}: {
  text: string;
  icon?: ReactElement;
  onClick?: () => void;  // make optional — Sidebar uses it without onClick on Links/Tags
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center text-gray-500 py-4 pl-4 cursor-pointer 
      hover:bg-gray-100 hover:text-black rounded max-w-48 duration-150"
    >
      <div>{icon}</div>
      <div className="pl-4">{text}</div>
    </div>
  );
}