import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?:boolean;
  loading?:boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center cursor-pointer";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      className={
        variantClasses[props.variant] +
        " " +
        defaultStyles +
        (props.fullWidth ? " w-full justify-center" : "") +
        (props.loading ? " opacity-50 cursor-not-allowed" : "")
      }
    >
      {!props.loading && props.startIcon && (
        <div className="pr-2">{props.startIcon}</div>
      )}

      {props.loading ? "Loading..." : props.text}
    </button>
  );
};
