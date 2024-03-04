import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const MonthlyWarningModal = forwardRef(
  ({ title, situation, information, cancel, confirm, setWarning }, ref) => {
    const dialog = useRef();
    // console.log(ref);
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
        setWarning(false);
      }
    };

    const handleCancel = (e) => {
      e.stopPropagation();
      setWarning(false);
    };

    const handleConfirm = (e) => {};
    return createPortal(
      <div onClick={handleCloseBackdrop}>
        <dialog
          ref={dialog}
          className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        >
          <>
            <h2 className="text-xl font-bold text-stone-700 my-4">{title}</h2>
            <p className="text-stone-600 mb-4">{situation}</p>
            <p className="text-stone-600 mb-4">{information}</p>
            <p className="flex justify-end">
              {/* <form
                onClick={handleCancel}
                method="dialog"
                className="mt-4 text-right"
              >
                <button>{cancel}</button>
              </form> */}
              <form
                onClick={handleConfirm}
                method="dialog"
                className="mt-4 text-right"
              >
                <button>{confirm}</button>
              </form>
            </p>
          </>
        </dialog>
      </div>,
      document.getElementById("modal-root")
    );
  }
);

export default MonthlyWarningModal;
