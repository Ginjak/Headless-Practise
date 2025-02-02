export default function SinglePostDescription({ title, description }) {
  return (
    <>
      <h5 className="font-medium  pb-3 md:pb-5 text-xl md:text-2xl tracking-wide text-property-txt-700">
        {title}
      </h5>
      <p className="text-property-txt-700">{description}</p>
    </>
  );
}
