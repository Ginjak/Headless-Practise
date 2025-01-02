import Link from "next/link";
export default function Property({ properties }) {
  return (
    <>
      {properties.posts.map((property) => (
        <Link href={`/properties/${property.slug}`} key={property.ID}>
          <h2>{property.post_title}</h2>
        </Link>
      ))}
    </>
  );
}
