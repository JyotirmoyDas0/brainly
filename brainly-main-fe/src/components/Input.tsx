interface InputProps {
  placeholder: string;
  ref?:any;
}

export function Input(props: InputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        className="px-4 py-2 border rounded m-2"
        ref={props.ref}
      />
    </div>
  );
}
