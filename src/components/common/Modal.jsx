import { createPortal } from "react-dom";

export default function Modal({
  visible,
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm
}) {
  if (!visible) return null;

  const portalRoot = document.getElementById("modal-root");
  if (!portalRoot) return null;

  return createPortal(
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>

        <div className="modal-action">
          <button className="btn" onClick={onCancel}>{cancelText}</button>
          <button className="btn btn-error text-white" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onCancel}></div>
    </div>,
    portalRoot
  );
}
