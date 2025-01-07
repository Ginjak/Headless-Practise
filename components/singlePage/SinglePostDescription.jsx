export default function SinglePostDescription({ title, description }) {
  return (
    <>
      <h5 className="font-medium pb-5 text-2xl tracking-wide">{title}</h5>
      <p className="text-white/80">{description}</p>
    </>
  );
}
