"use client";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({ isOpen, onClose, onSubmit, children }) {
  const modalRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle fade-in and fade-out effect
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true); // Ensure the modal is rendered
      setTimeout(() => setIsVisible(true), 10); // Add slight delay for fade-in
    } else {
      setIsVisible(false); // Trigger fade-out
      const timeout = setTimeout(() => setShouldRender(false), 300); // Matches transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, onClose]);

  // Close modal if clicked outside modal content (on overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex justify-center items-center transition-opacity duration-300 sm:px-3 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className={`bg-property-bg-100 p-6 sm:rounded-lg shadow-lg relative max-w-md w-full transform transition-transform duration-300 h-screen sm:h-auto ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal content from closing it
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
          aria-label="Close modal"
        >
          <IoCloseSharp className="text-property-txt-700/80 text-2xl hover:text-property-txt-700 transition-colors duration-200" />
        </button>

        {/* Modal content */}
        <div>{children}</div>

        {/* Modal actions */}
        {onClose && onSubmit && (
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
