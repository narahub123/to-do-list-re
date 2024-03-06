import React from "react";

const DropIndicator = ({ beforeId, afterId, column }) => {
  // console.log("afterId", afterId);
  return (
    <div
      data-before={beforeId || "-1"}
      data-after={afterId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full
                bg-violet-400 opacity-0"
    />
  );
};

export default DropIndicator;
