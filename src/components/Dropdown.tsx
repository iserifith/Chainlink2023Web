import React, { useState } from "react";

type Item = {
  label: string;
  value: any;
};

type Props = {
  label?: string;
  loading?: boolean;
  onChange: (val: any) => any;
  disabled?: boolean;
  id?: string;
  items: Item[];
  value?: any;
};

const Dropdown = ({
  //   label = "Dropdown",
  //   loading = false,
  //   onClick,
  //   disabled = false,
  //   id,
  // }: Props) => {
  //   return (
  //     <button
  //       id={id}
  //       disabled={disabled}
  //       onClick={onClick}
  //       className={`m-2 px-[10px] py-[8px] rounded-lg font-bold text-black flex flex-row justify-center items-center gap-2 shadow-md hover:shadow-lg
  //       ${disabled ? "bg-gray-400" : "bg-white"} ${
  //         disabled ? "cursor-not-allowed" : "cursor-pointer"
  //       }
  //       `}
  //     >
  //       {label}
  //       {loading && <Loader />}
  //     </button>
  //   );
  label,
  loading,
  onChange,
  id,
  items,
  value,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="flex flex-row justify-between border-gray-300 border-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center  w-full"
        type="button"
      >
        <span>{value ? value : label}</span>
        <svg
          className="w-2.5 h-2.5 ms-3 justify-end"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 fixed"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange(item.value);
                  toggleDropdown();
                }}
              >
                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Dropdown;
