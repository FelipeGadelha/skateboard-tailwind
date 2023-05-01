interface IBackdrop {
  isOpen: boolean, 
  onClose: () => void
} 
function Backdrop({ isOpen, onClose }: IBackdrop) {
  return (
    <div
      onClick={onClose}
      className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 
        ${isOpen ? "block" : "hidden"}
      `}
    ></div>
  )
}

export default Backdrop
