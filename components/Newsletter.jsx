// Must hard code the color of a toast icon!!!!

"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Newsletter({ type }) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setFormData({ email: "" });
      toast.success("Thank you for subscribing!");
      setLoading(false);
    }, 1000);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Response text:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderFormStyles = () => {
    switch (type) {
      case "one":
        return {
          container: "xs:max-w-80 md:max-w-96 lg:max-w-md w-full",
          wraper:
            "flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-lg shadow-sm relative xs:h-14",
          input: `py-3 px-4 sm:pr-32 block w-full border-2 border-transparent shadow-sm rounded-lg text-base text-secondary-dark focus:border-secondary-ligth focus:ring-secondary-ligth dark:bg-primary dark:border-white dark:focus:border-secondary-ligther  focus:outline-0 transition-all placeholder:text-base dark:placeholder:text-white dark:text-white h-14 ${
            loading ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""
          }`,
          button: `py-3 px-4 inline-flex justify-center items-center text-base font-semibold rounded-lg border border-transparent bg-secondary-dark text-white hover:bg-secondary focus:outline-none focus:bg-secondary  disabled:opacity-50 disabled:pointer-events-none xs:absolute top-1 right-1 h-14 xs:h-12 transition-all dark:bg-secondary dark:hover:bg-opacity-90 dark:focus:bg-opacity-90 dark:h-10 dark:top-2 dark:right-2 ${
            loading
              ? "cursor-not-allowed opacity-80 hover:bg-secondary-dark dark:bg-secondary dark:hover:bg-secondary dark:opacity-80"
              : ""
          }`,
        };
      case "two":
        return {
          container: "max-w-80 w-full bg-green-100 p-4 rounded",
          input:
            "py-3 px-4 block w-full border-2 border-transparent shadow-sm rounded-lg text-base text-secondary-dark focus:border-secondary-light focus:ring-secondary-light dark:bg-primary dark:border-white dark:focus:border-secondary-lighter focus:outline-0 transition-all placeholder:text-base dark:placeholder:text-white dark:text-white",
          button:
            "py-3 px-4 inline-flex justify-center items-center text-base font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none absolute top-1 right-1 h-12 transition-all",
        };
      case "three":
        return {
          container: "max-w-80 w-full bg-red-100 p-4 rounded",
          input:
            "py-3 px-4 block w-full border-2 border-transparent shadow-sm rounded-lg text-base text-secondary-dark focus:border-secondary-light focus:ring-secondary-light dark:bg-primary dark:border-white dark:focus:border-secondary-lighter focus:outline-0 transition-all placeholder:text-base dark:placeholder:text-white dark:text-white",
          button:
            "py-3 px-4 inline-flex justify-center items-center text-base font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none absolute top-1 right-1 h-12 transition-all",
        };
      default:
        return {
          container: "max-w-80 w-full",
          input:
            "py-3 px-4 block w-full border-2 border-transparent shadow-sm rounded-lg text-base text-secondary-dark focus:border-secondary-light focus:ring-secondary-light dark:bg-primary dark:border-white dark:focus:border-secondary-lighter focus:outline-0 transition-all placeholder:text-base dark:placeholder:text-white dark:text-white",
          button:
            "py-3 px-4 inline-flex justify-center items-center text-base font-semibold rounded-lg border border-transparent bg-secondary-dark text-white hover:bg-secondary focus:outline-none focus:bg-secondary disabled:opacity-50 disabled:pointer-events-none absolute top-1 right-1 h-12 transition-all dark:bg-secondary dark:hover:bg-opacity-90 dark:focus:bg-opacity-90 dark:h-10 dark:top-2 dark:right-2",
        };
    }
  };

  const styles = renderFormStyles();

  return (
    <div className={styles.container}>
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#09BC8A",
            },
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="sr-only">
          Newsletter
        </label>
        <div className={styles.wraper}>
          <input
            type="email"
            placeholder="Your email address..."
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" className={styles.button}>
            {loading ? <SmallSpinner /> : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}
