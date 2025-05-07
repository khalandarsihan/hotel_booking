import React from "react";
import { createRoot } from "react-dom/client";
import { FrappeProvider } from "frappe-react-sdk";
import AppRoutes from "./AppRoutes";
import "./styles/base.css";

// Main application render
const container = document.getElementById("hotel-booking-root");

if (container) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<FrappeProvider socketPort={window.socketPort}>
				<AppRoutes />
			</FrappeProvider>
		</React.StrictMode>
	);
}
