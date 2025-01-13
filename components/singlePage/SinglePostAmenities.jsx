import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";

export default function SinglePostAmenities({ data, title }) {
  return (
    <>
      {data.length > 0 && (
        <>
          <h5 className="font-medium pb-5 text-2xl tracking-wide text-property-txt-700">
            {title}
          </h5>
          <ul className="flex flex-wrap mb-6">
            {data.map((place, index) => {
              // Ensure place.tags.name is valid before rendering the list item
              if (!place.tags.name) return null;

              return (
                <li
                  key={index}
                  className="flex items-center justify-between w-full md:w-2/4 py-1 md:odd:pe-4 md:odd:border-r-[1px] md:even:ps-4 gap-2 text-property-txt-700 border-property-txt-700/20"
                >
                  <div className="flex gap-2 items-center">
                    {title !== "Shops" ? (
                      <Image
                        src={
                          title === "Underground"
                            ? "/underground.webp"
                            : "/rail.webp"
                        }
                        alt={
                          title === "Underground"
                            ? "Underground icon"
                            : "Rail icon"
                        }
                        width={25}
                        height={25}
                        className="h-[25px]"
                      />
                    ) : (
                      <span className="bg-property-acc-100 p-0 rounded-full w-6 h-6 flex justify-center items-center">
                        <TiShoppingCart className="text-white" />
                      </span>
                    )}
                    {place.tags.name}
                  </div>{" "}
                  <span className="">{place.distance.toFixed(2)} miles</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
