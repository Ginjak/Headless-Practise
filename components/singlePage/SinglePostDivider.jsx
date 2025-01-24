export default function SinglePostDivider({ className }) {
  return (
    <div
      className={`w-full bg-property-txt-700/30 h-[1px] ${
        className ? className : ""
      }`}
    ></div>
  );
}
