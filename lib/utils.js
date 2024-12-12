import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const writeToLocalStorage = (key, value) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error writing to local storage:", error);
    }
  };
  
  export const removeFromLocalStorage = (key) => {
    try {
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error remove from local storage:", error);
    }
  };

  export const notify = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  export const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        notify("text copied to clipboard", "success");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  export const readFromLocalStorage = (key, initialValue) => {
    try {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return initialValue;
    }
  };