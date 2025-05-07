import React from "react";
import { createRoot } from "react-dom/client";
import { FrappeProvider } from "frappe-react-sdk";
import AppWrapper from "./components/AppWrapper";
import Dashboard from "./pages/Dashboard";
import BookingCalendar from "./pages/BookingCalendar";
import RoomManagement from "./pages/RoomManagement.jsx";
import PropertyDetails from "./pages/PropertyDetails";

// Function to render with FrappeProvider wrapper
const renderWithProvider = (component, container) => {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<FrappeProvider socketPort={window.socketPort}>
				<AppWrapper>{component}</AppWrapper>
			</FrappeProvider>
		</React.StrictMode>
	);
};

// Dashboard Page
const dashboardContainer = document.getElementById("dashboard-root");
if (dashboardContainer) {
	renderWithProvider(<Dashboard />, dashboardContainer);
}

// Booking Calendar Page
const calendarContainer = document.getElementById("booking-calendar-root");
if (calendarContainer) {
	renderWithProvider(<BookingCalendar />, calendarContainer);
}

// Room Management Page
const roomContainer = document.getElementById("room-management-root");
if (roomContainer) {
	renderWithProvider(<RoomManagement />, roomContainer);
}

// Property Details Page
const propertyContainer = document.getElementById("property-details-root");
if (propertyContainer) {
	// Get property ID from URL parameters
	const propertyId = new URLSearchParams(window.location.search).get("id");
	if (propertyId) {
		renderWithProvider(<PropertyDetails propertyId={propertyId} />, propertyContainer);
	} else {
		const root = createRoot(propertyContainer);
		root.render(<div className="text-red-500 p-4">Error: No property ID provided</div>);
	}
}
