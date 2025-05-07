import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Formats price values consistently across the application
 * - Displays "Free" when price is 0 or 0.0
 * - Otherwise displays price with ₹ symbol
 *
 * @param {number|string} price - The price value to format
 * @param {string} currency - Currency symbol (default: ₹)
 * @return {string} Formatted price string
 */
export const formatPrice = (price, currency = "₹") => {
	// Convert price to number if it's a string
	const numericPrice = typeof price === "string" ? parseFloat(price) : price;

	// Check if price is 0, 0.0, etc.
	if (numericPrice === 0 || Number.isNaN(numericPrice)) {
		return "Free";
	}

	// Return price with currency symbol
	return `${currency}${numericPrice.toLocaleString()}`;
};

/**
 * Format a date string into a user-friendly format
 *
 * @param {string|Date} date - The date to format
 * @param {string} format - Format type ('short', 'long', 'full')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "short") => {
	const dateObj = date instanceof Date ? date : new Date(date);

	if (isNaN(dateObj.getTime())) {
		return "Invalid date";
	}

	switch (format) {
		case "short":
			return dateObj.toLocaleDateString();
		case "long":
			return dateObj.toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		case "full":
			return dateObj.toLocaleDateString(undefined, {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		default:
			return dateObj.toLocaleDateString();
	}
};
