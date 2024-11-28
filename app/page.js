import Sections from "../components/Sections";
import { fetchFrontPageID, pageContentById } from "@/lib/api";

export default async function HomePage() {
  try {
    // Fetch front page ID and page content on the server side
    const frontPageID = await fetchFrontPageID();

    // Ensure the front page ID is valid
    if (!frontPageID) {
      console.log("No front page ID found.");
      return (
        <div>
          <h1>No front page set</h1>
        </div>
      );
    }

    // Fetch the page content using the front page ID
    const homePageData = await pageContentById(frontPageID);

    if (!homePageData) {
      console.log("Home page data not found.");
      return (
        <div>
          <h1>Page content not found</h1>
        </div>
      );
    }

    console.log("Fetched home page data:", homePageData); // For debugging purposes

    return (
      <main>
        <Sections data={homePageData} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching page data:", error);
    return (
      <div>
        <h1>Error fetching page data</h1>
      </div>
    );
  }
}
