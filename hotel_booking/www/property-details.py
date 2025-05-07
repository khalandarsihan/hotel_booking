import frappe

def get_context(context):
    """
    Add context data for the property details page
    """
    context.title = "Property Details - Hotel Booking Management System"
    context.socketio_port = frappe.conf.get("socketio_port", 9000)
    
    # Get property ID from URL parameters
    property_id = frappe.form_dict.get('id')
    if property_id:
        context.property_id = property_id
        
        # In a real app, you would fetch property details here
        # property_data = frappe.get_doc("Property", property_id)
        # context.property_data = property_data
    
    # Get user info
    if frappe.session.user != "Guest":
        context.user = frappe.get_doc("User", frappe.session.user)
    
    return context