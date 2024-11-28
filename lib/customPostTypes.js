import axios from "axios";

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const username = process.env.WORDPRESS_USERNAME;
const password = process.env.WORDPRESS_PASSWORD;

const auth = Buffer.from(`${username}:${password}`).toString("base64");

const axiosInstance = axios.create({
  baseURL: WORDPRESS_API_URL,
  headers: {
    Authorization: `Basic ${auth}`,
  },
});

// Return all page slug into array
