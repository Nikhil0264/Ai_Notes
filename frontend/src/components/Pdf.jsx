import React from "react";

function Pdf({ fileUrl, title }) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b font-semibold">{title}</div>

      <iframe
        src={fileUrl}
        title={title}
        className="flex-1 w-full"
      />
    </div>
  );
}

export default Pdf;
