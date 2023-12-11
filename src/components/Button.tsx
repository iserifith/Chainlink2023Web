import React from "react";
import Loader from "./Loader";

type Props = {
  label?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="m-2 px-[10px] py-[8px] rounded-lg font-bold text-black flex flex-row justify-center items-center gap-2 shadow-md hover:shadow-lg"
    >
      {props.label}
      {props.loading && <Loader />}
    </button>
  );
};

export default Button;
