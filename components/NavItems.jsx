import Link from "next/link";

export default function NavItems({ items, isChild = false, level = 1 }) {
  const domainName = process.env.NEXT_DOMAIN_NAME;

  return (
    <ul className={isChild ? "nested-container relative" : "mx-auto px-3 flex"}>
      {items.map((item) => {
        const formattedUrl = item.url.replace(domainName, "");

        // Add dynamic classes based on the current level
        const itemClasses = `level-${level} ${item.class || ""}`;

        return (
          <li key={item.id} className={itemClasses}>
            <Link
              href={formattedUrl}
              className={
                isChild
                  ? "nested-item-styles"
                  : "p-3 hover:bg-secondary transition-all"
              }
            >
              {item.title.rendered}
            </Link>

            {/* Recursively render child items with the correct level */}
            {item.children && item.children.length > 0 && (
              <NavItems
                items={item.children}
                isChild={true}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
