import React, { forwardRef, useRef } from "react";
import { formatDateDash, formatDotDate } from "../../util/formatDate";

export const InputText = ({
  name,
  columnWidth,
  placeholder,
  padding,
  value,
  onChange,
}) => {
  return (
    <p
      className={`w-full ${
        columnWidth < 120 ? "px-1.5 " + padding : "px-3 " + padding
      } `}
    >
      <input
        name={name}
        type="text"
        className="w-full pb-0.5 text-sm 
                   bg-transparent placeholder-neutral-400  
                   border-b-2 border-neutral-300
                   focus:outline-0 focus:placeholder-transparent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </p>
  );
};

export const InputDate = ({
  name,
  columnWidth,
  placeholder,
  date,
  onChange,
}) => {
  const day = formatDotDate(date);
  // console.log(day);
  const defaultDate = formatDateDash(day);
  // console.log(defaultDate);
  return (
    <p className={`${columnWidth < 120 ? "mx-1.5" : "mx-3"} `}>
      <input
        name={name}
        type="date"
        placeholder={placeholder}
        className="border-0 bg-transparent text-xs text-neutral-400 focus:outline-0"
        defaultValue={defaultDate}
        onChange={onChange}
      />
    </p>
  );
};
