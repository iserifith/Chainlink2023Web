import React from "react";
import Loader from "./Loader";

type Props = {
  label?: string;
  loading?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="m-2 shadow-lg px-[10px] py-[8px] rounded-lg font-bold text-black flex flex-row justify-center items-center gap-2"
    >
      {props.label}
      {props.loading && <Loader />}
    </button>
  );
};

export default Button;
