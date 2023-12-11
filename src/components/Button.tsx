import React from "react";
import Loader from "./Loader";

type Props = {
  label?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
};

const Button = (props: Props) => {
  return (
    <button
      id={props.id}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`m-2 px-[10px] py-[8px] rounded-lg font-bold text-black flex flex-row justify-center items-center gap-2 shadow-md hover:shadow-lg 
      ${props.disabled ? "bg-gray-400" : "bg-white"} ${
        props.disabled ? "cursor-not-allowed" : "cursor-pointer"
      }
      `}
    >
      {props.label}
      {props.loading && <Loader />}
    </button>
  );
};

export default Button;
