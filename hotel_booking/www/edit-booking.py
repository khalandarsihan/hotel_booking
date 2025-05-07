import frappe

def get_context(context):
    """
    Add context data for the edit booking page
    """
    context.title = "Edit Booking - Hotel Booking Management System"
    context.socketio_port = frappe.conf.get("socketio_port", 9000)
    
    # Set booking form mode
    context.is_edit_mode = True
    
    # Get booking ID from URL parameters
    booking_id = frappe.form_dict.get('id')
    if booking_id:
        context.booking_id = booking_id
        
        # In a real app, you would fetch booking details here
        # booking_data = frappe.get_doc("Booking", booking_id)
        # context.booking_data = booking_data
    
    # Get user info
    if frappe.session.user != "Guest":
        context.user = frappe.get_doc("User", frappe.session.user)
    
    return context