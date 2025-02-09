"use client";
import { useState } from "react";
import { HiArrowCircleUp } from "react-icons/hi";
import SinglePostDivider from "../singlePage/SinglePostDivider";

const AccordionSingleItem = ({ title, children, wraperClassName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault(); // Prevent default behavior
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={wraperClassName}>
      <button
        className="w-full flex justify-between items-center text-left text-sm font-medium text-property-txt-700 mb-2"
        onClick={handleToggle}
      >
        {title}
        <span
          className={`transition-transform  duration-700 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <HiArrowCircleUp className="text-lg" />
        </span>
      </button>
      <SinglePostDivider className="my-2" />
      <div
        className={`grid overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export default AccordionSingleItem;
