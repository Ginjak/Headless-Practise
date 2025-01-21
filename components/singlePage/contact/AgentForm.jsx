"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosBed } from "react-icons/io";
import { TbBathFilled } from "react-icons/tb";
import { PiArmchairFill } from "react-icons/pi";
import PropertyInfo from "./PropertyInfo";

export default function AgentForm() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      email: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering the form on the initial server-side render
  if (!isMounted) {
    return null; // or a loading spinner if you prefer
  }

  const onSubmit = (data) => {
    console.log("Form data", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            {...register("email", { required: "Email is required" })}
            placeholder=" "
            className="peer block py-2.5 px-0 w-full text-sm text-property-txt-700 bg-transparent border-0 border-b-2 border-property-txt-700/50 appearance-none focus:outline-none focus:ring-0 focus:property-pr-300"
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-property-txt-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-property-txt-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...register("city", { required: "City is required" })}
            placeholder="Enter city"
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div>
          <button type="submit">Apply Filters</button>
        </div>
      </form>
    </>
  );
}
