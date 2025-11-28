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

  return (
    <dialog open className="modal">
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

      <form method="dialog" className="modal-backdrop" onClick={onCancel}>
        <button>close</button>
      </form>
    </dialog>
  );
}
