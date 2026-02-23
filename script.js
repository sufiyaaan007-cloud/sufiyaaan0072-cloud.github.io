// Initialize Icons
lucide.createIcons();

// Virtual Router: Switching between sections
function showPage(pageId) {
    // Hide all views
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected view
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Modal Toggle
function toggleBooking() {
    const modal = document.getElementById('bookingModal');
    modal.classList.toggle('active');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Booking Form Logic
const form = document.getElementById('appointmentForm');
form.onsubmit = async (e) => {
    e.preventDefault();
    
    // 1. Prepare Data
    const name = document.getElementById('userName').value;
    const service = document.getElementById('userService').value;
    const date = document.getElementById('userDate').value;
    const time = document.getElementById('userTime').value;

    // 2. Send to Email (Formspree)
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        // 3. Trigger WhatsApp Notification
        const ownerPhone = "918800000000"; // Set Client's Phone here
        const text = *New Booking Received*%0A*Name:* ${name}%0A*Service:* ${service}%0A*Date:* ${date}%0A*Time:* ${time};
        const waUrl = https://wa.me/${ownerPhone}?text=${text};
        
        alert("Booking request sent! Opening WhatsApp for instant confirmation...");
        window.open(waUrl, '_blank');
        toggleBooking();
    } else {
        alert("Submission error. Please check the form action ID.");
    }
};
