import React from "react";
import HeroOne from "./HeroOne";
import HeroTwo from "./HeroTwo";
import NewsletterOne from "./NewsletterOne";
// import { v4 as uuidv4 } from "uuid";

const MemoizedHeroOne = React.memo(HeroOne);
const MemoizedHeroTwo = React.memo(HeroTwo);
const MemoizedNewsletterOne = React.memo(NewsletterOne);

export default function Sections({ data }) {
  const sections = Object.values(data.meta.sections);

  return (
    <>
      {sections.map((section, index) => {
        console.log("section", section);
        // const uniqueId = uuidv4();
        let componentToRender;

        // Switch statement based on the value of section.select_option
        switch (section.select_option) {
          case "Hero 1":
            componentToRender = <MemoizedHeroOne data={section} />;
            break;
          case "Hero 2":
            componentToRender = <MemoizedHeroTwo data={section} />;
            break;
          case "Newsletter 1":
            componentToRender = <MemoizedNewsletterOne data={section} />;
            break;
          default:
            componentToRender = null;
        }

        return <section key={index}>{componentToRender}</section>;
      })}
    </>
  );
}
