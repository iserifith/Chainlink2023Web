import React from "react";
import Loader from "./Loader";

type Props = {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`border-2 ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white h-10 px-4 rounded-lg text-sm focus:outline-none`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default TextInput;
