import frappe

def get_context(context):
    """
    Add context data for the financial accounts page
    """
    context.title = "Financial Management - Hotel Booking Management System"
    context.socketio_port = frappe.conf.get("socketio_port", 9000)
    
    # Get user info
    if frappe.session.user != "Guest":
        context.user = frappe.get_doc("User", frappe.session.user)
    
    return context