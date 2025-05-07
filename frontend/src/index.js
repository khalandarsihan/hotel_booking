import React from "react";
import { createRoot } from "react-dom/client";
import { FrappeProvider } from "frappe-react-sdk";
import AppRoutes from "./AppRoutes";
import Dashboard from "./pages/Dashboard";
import RoomManagement from "./pages/RoomManagement";
import BookingsPage from "./pages/BookingsPage";
import PropertyDetails from "./pages/PropertyDetails";
import PropertiesPage from "./pages/PropertiesPage";
import BookingCalendar from "./pages/BookingCalendar";
import BookingDetail from "./pages/BookingDetail";
import BookingForm from "./pages/BookingForm";
import "./styles/base.css";

// Get the main container
const container = document.getElementById("hotel-booking-root");

// Initialize with the main router if main container exists
if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<FrappeProvider socketPort={window.socketPort}>
				<AppRoutes />
			</FrappeProvider>
		</React.StrictMode>
	);
} else {
	// Handle individual page rendering based on page-specific root elements
	const dashboardRoot = document.getElementById("dashboard-root");
	const bookingsRoot = document.getElementById("bookings-root");
	const roomsRoot = document.getElementById("room-management-root");
	const propertiesRoot = document.getElementById("properties-root");
	const propertyDetailsRoot = document.getElementById("property-details-root");
	const bookingCalendarRoot = document.getElementById("booking-calendar-root");
	const bookingDetailsRoot = document.getElementById("booking-details-root");
	const newBookingRoot = document.getElementById("new-booking-root");
	const editBookingRoot = document.getElementById("edit-booking-root");

	// Mount the appropriate component based on which root element exists
	if (dashboardRoot) {
		const root = createRoot(dashboardRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<Dashboard />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (bookingsRoot) {
		const root = createRoot(bookingsRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<BookingsPage />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (roomsRoot) {
		const root = createRoot(roomsRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<RoomManagement />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (propertiesRoot) {
		const root = createRoot(propertiesRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<PropertiesPage />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (propertyDetailsRoot) {
		const root = createRoot(propertyDetailsRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<PropertyDetails propertyId={window.propertyId} />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (bookingCalendarRoot) {
		const root = createRoot(bookingCalendarRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<BookingCalendar />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (bookingDetailsRoot) {
		const root = createRoot(bookingDetailsRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<BookingDetail bookingId={window.bookingId} />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (newBookingRoot) {
		const root = createRoot(newBookingRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<BookingForm />
				</FrappeProvider>
			</React.StrictMode>
		);
	} else if (editBookingRoot) {
		const root = createRoot(editBookingRoot);
		root.render(
			<React.StrictMode>
				<FrappeProvider socketPort={window.socketPort}>
					<BookingForm isEdit={true} booking={{ id: window.bookingId }} />
				</FrappeProvider>
			</React.StrictMode>
		);
	}
}
