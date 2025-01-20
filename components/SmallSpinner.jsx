export default function SmallSpinner({ text, className }) {
  return (
    <div
      className={`absolute inset-0 flex justify-center items-center bg-property-pr-300/20 ${className}`}
    >
      <div className="w-8 h-8 border-4 border-t-4 border-property-acc-100 border-t-transparent rounded-full animate-spin"></div>
      <p className="ms-2">{text}</p>
    </div>
  );
}
