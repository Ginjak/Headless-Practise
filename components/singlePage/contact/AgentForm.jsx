"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BsEnvelopeAt } from "react-icons/bs";

export default function AgentForm({ data, postLink }) {
  const [isMounted, setIsMounted] = useState(false);
  const propertyDetails = `${data?.address_line} ${data?.borough} ${data?.city}`;
  const agentEmail = `${data?.team_member?.team_member_email}`;
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const charLimit = 700;

  console.log("testing data", data);
  console.log("property details", propertyDetails);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      property: propertyDetails,
      propertySlug: postLink,
      name: "",
      surname: "",
      phone: "",
      email: "",
      postcode: "",
      message: "",
      moreDetails: false,
      viewProperty: false,
      recipientEmail: agentEmail,
    },
  });

  // useEffect(() => {
  //   setIsMounted(true);
  //   console.log("data", data);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  const onSubmit = async (formData) => {
    try {
      // Send data to the Next.js API route
      const response = await fetch("/api/propertyForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Form data", formData);
        setSubmitStatus("Message sent successfully!");
        reset();
        setCharCount(0); // Reset character count
      } else {
        setSubmitStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setSubmitStatus("There was an error submitting the form.");
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (value.length <= charLimit) {
      setMessage(value);
      setCharCount(value.length);
      setLimitReached(false);
    } else {
      setLimitReached(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder=""
              className={`appearance-none mb-2 peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 ${
                errors.name ? "border-red-500" : "border-property-txt-700/50"
              } appearance-none focus:outline-none focus:ring-0 ${
                errors.name
                  ? "focus:border-red-500"
                  : "focus:border-property-pr-300"
              }`}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="surname"
              id="surname"
              {...register("surname", { required: "Last name is required" })}
              placeholder=""
              className={`mb-2 peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 ${
                errors.surname ? "border-red-500" : "border-property-txt-700/50"
              } appearance-none focus:outline-none focus:ring-0 ${
                errors.surname
                  ? "focus:border-red-500"
                  : "focus:border-property-pr-300"
              }`}
            />
            <label
              htmlFor="surname"
              className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
            {errors.surname && (
              <p className="text-sm text-red-500">{errors.surname.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              placeholder=""
              className={`mb-2 peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 ${
                errors.phone ? "border-red-500" : "border-property-txt-700/50"
              } appearance-none focus:outline-none focus:ring-0 ${
                errors.phone
                  ? "focus:border-red-500"
                  : "focus:border-property-pr-300"
              }`}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              {...register("email", { required: "Email is required" })}
              placeholder=""
              className={`mb-2 peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 ${
                errors.email ? "border-red-500" : "border-property-txt-700/50"
              } appearance-none focus:outline-none focus:ring-0 ${
                errors.email
                  ? "focus:border-red-500"
                  : "focus:border-property-pr-300"
              }`}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="postcode"
            id="postcode"
            {...register("postcode", { required: "Postcode is required" })}
            placeholder=""
            className={`mb-2 peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 ${
              errors.postcode ? "border-red-500" : "border-property-txt-700/50"
            } appearance-none focus:outline-none focus:ring-0 ${
              errors.postcode
                ? "focus:border-red-500"
                : "focus:border-property-pr-300"
            }`}
          />
          <label
            htmlFor="postcode"
            className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Postcode
          </label>
          {errors.postcode && (
            <p className="text-sm text-red-500">{errors.postcode.message}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <textarea
            name="message"
            id="message"
            rows="4"
            value={message} // Bind the state value
            {...register("message", {
              maxLength: {
                value: charLimit,
                message: `Message cannot exceed ${charLimit} characters`,
              },
            })}
            onChange={(e) => {
              handleMessageChange(e);
            }}
            placeholder=""
            className="peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 border-property-txt-700/50 appearance-none focus:outline-none focus:ring-0 focus:property-pr-300 "
          />

          <label
            htmlFor="message"
            className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your message (optional)
          </label>
          <div className="text-sm text-property-txt-700/60 py-2">
            {charCount}/{charLimit} characters
          </div>
          {limitReached && (
            <p className="text-sm text-red-500">
              Character limit reached! Please shorten your message.
            </p>
          )}
        </div>
        <p className="text-property-txt-700 mb-3 text-sm font-medium">
          I would like:
        </p>
        <div className="flex gap-3">
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="moreDetails"
                {...register("moreDetails")}
                className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
              />
            </div>
            <label
              htmlFor="moreDetails"
              className="ml-2 text-sm text-property-txt-700"
            >
              More details about property
            </label>
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="viewProperty"
                {...register("viewProperty")}
                className="appearance-none w-5 h-5 border-2 border-property-acc-100 rounded-sm bg-white text-property-txt-700 focus:ring-2 focus:ring-property-acc-100 focus:ring-offset-2 focus:ring-offset-gray-100 checked:bg-property-acc-100 checked:ring-property-acc-100 checked:border-property-acc-100 focus:outline-none"
              />
            </div>
            <label
              htmlFor="viewProperty"
              className="ml-2 text-sm text-property-txt-700"
            >
              View property
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-12 w-full rounded-lg bg-property-acc-100 hover:bg-property-acc-300 text-property-bg-100 py-3 px-4 transition-all duration-200 uppercase font-bold tracking-wider flex items-center justify-center gap-2"
        >
          <BsEnvelopeAt className="text-property-bg-100 text-2xl font-bold" />
          Send email
        </button>
      </form>
    </>
  );
}
