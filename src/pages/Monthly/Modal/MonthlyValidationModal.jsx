import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const MonthlyValidationModal = (
  { title, situation, information, buttonCaption, setOutOfRange, setExceedEnd },
  ref
) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  }); // useImperativeHandle() ends

  const handleCloseBackdrop = (e) => {
    if (e.target === dialog.current && e.target !== dialog) {
      dialog.current.close();
      setOutOfRange(false);
      setExceedEnd(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
    setOutOfRange(false);
    setExceedEnd(false);
  };

  return createPortal(
    <div onClick={handleCloseBackdrop}>
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      >
        <div onClick={handleModalClick}>
          <h2 className="text-xl font-bold text-stone-700 my-4">{title}</h2>
          <p className="text-stone-600 mb-4">{situation}</p>
          <p className="text-stone-600 mb-4">{information}</p>
          <form method="dialog" className="mt-4 text-right">
            <button>{buttonCaption}</button>
          </form>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal-root")
  );
};

export default forwardRef(MonthlyValidationModal);
