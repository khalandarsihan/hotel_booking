import frappe

def get_context(context):
    """
    Add context data for the new booking page
    """
    context.title = "New Booking - Hotel Booking Management System"
    context.socketio_port = frappe.conf.get("socketio_port", 9000)
    
    # Set booking form mode
    context.is_edit_mode = False
    
    # Get user info
    if frappe.session.user != "Guest":
        context.user = frappe.get_doc("User", frappe.session.user)
    
    return context