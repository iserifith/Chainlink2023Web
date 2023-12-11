// create a Popup component with its useState hook. Style it with tailwindcss.
// accepts string as props
// default type is success
// other types are error, warning, info

import React, { useState, useEffect } from "react";

type Props = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  show: boolean;
  setShow: (show: boolean) => void;
};

const Popup = ({ message, type = "success", show, setShow }: Props) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  if (!show) return null;

  let bgColor = "bg-green-200";
  switch (type) {
    case "error":
      bgColor = "bg-red-200";
      break;
    case "warning":
      bgColor = "bg-yellow-200";
      break;
    case "info":
      bgColor = "bg-blue-200";
      break;
    default:
      bgColor = "bg-green-200";
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className={`w-96 rounded-md shadow-lg ${bgColor}`}>
        <div className="flex justify-between items-center px-4 py-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShow(false);
            }}
          >
            x
          </div>
        </div>
        <div className="px-4 py-2">{message}</div>
      </div>
    </div>
  );
};

const usePopup = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );

  const openPopup = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setMessage(message);
    setType(type);
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
  };

  return {
    openPopup,
    closePopup,
    renderPopup: () => (
      <Popup message={message} type={type} show={show} setShow={setShow} />
    ),
  };
};

export { Popup, usePopup };
