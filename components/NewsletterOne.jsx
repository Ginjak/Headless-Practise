import React from "react";

export default function NewsletterOne({ data }) {
  const { newsletter_1_title: title, newsletter_1_text: text } = data;
  return (
    <div className="dark:bg-secondary-dark flex relative items-center overflow-hidden newsletter-one px-3 py-10 md:py-16">
      <div className="bg-secondary-ligther dark:bg-primary mx-auto 2xl:container flex flex-col rounded-3xl px-3 py-10 md:py-16 items-center ">
        <h2 className="font-heading text-primary dark:text-white text-4xl md:text-6xl font-bold leading-none mb-3 max-w-4xl text-center">
          {title}
        </h2>
        <p className="text-lg text-primary-ligth dark:text-white mb-8 max-w-3xl text-center">
          {text}
        </p>
        <form className="max-w-80 w-full">
          <label htmlFor="hs-trailing-button-add-on" className="sr-only">
            Newsletter
          </label>
          <div className="flex rounded-lg shadow-sm relative h-14">
            <input
              type="email"
              placeholder="Your email address..."
              id="hs-trailing-button-add-on"
              name="hs-trailing-button-add-on"
              className="py-3 px-4 block w-full border-2 border-transparent shadow-sm rounded-lg text-base text-secondary-dark focus:border-secondary-ligth focus:ring-secondary-ligth dark:bg-primary dark:border-white dark:focus:border-secondary-ligther  focus:outline-0 transition-all placeholder:text-base dark:placeholder:text-white dark:text-white"
            />

            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center text-base font-semibold rounded-lg border border-transparent bg-secondary-dark text-white hover:bg-secondary focus:outline-none focus:bg-secondary  disabled:opacity-50 disabled:pointer-events-none absolute top-1 right-1 h-12 transition-all dark:bg-secondary dark:hover:bg-opacity-90 dark:focus:bg-opacity-90 dark:h-10 dark:top-2 dark:right-2"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
