import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.oluwasetemi.dev",
});

const token = JSON.parse( localStorage.getItem("user") || "null" )?.token;

fetch("/tasks", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});