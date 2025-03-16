document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section ID from the data attribute
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Hide all sections and show the selected one
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Mobile sidebar toggle
    const toggleSidebar = () => {
        const sidebar = document.querySelector('.admin-sidebar');
        sidebar.classList.toggle('active');
    };
    
    // Add mobile menu button if it exists
    const menuButton = document.querySelector('.menu-toggle');
    if (menuButton) {
        menuButton.addEventListener('click', toggleSidebar);
    }
    
    // Select all checkbox functionality
    const selectAllCheckbox = document.querySelector('.select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Notification dropdown toggle
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Toggle notification dropdown
            console.log('Notification bell clicked');
        });
    }
    
    // Admin profile dropdown toggle
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function() {
            // Toggle profile dropdown
            console.log('Admin profile clicked');
        });
    }
    
    // Add event listeners for action buttons
    const actionButtons = document.querySelectorAll('.action-buttons button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('title');
            const row = this.closest('tr');
            const userId = row.querySelector('.user-id')?.textContent || 
                          row.querySelector('.product-id')?.textContent;
            
            console.log(`${action} action on ${userId}`);
            
            // Handle delete confirmation
            if (action === 'Delete') {
                if (confirm('Are you sure you want to delete this item?')) {
                    console.log(`Confirmed delete for ${userId}`);
                    // Here you would typically make an API call to delete the item
                    // For demo purposes, let's just remove the row
                    row.remove();
                }
            }
        });
    });
    
    // Handle logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear admin session
            sessionStorage.removeItem('adminLoggedIn');
            
            // Redirect to login page
            window.location.href = 'admin-login.html';
        });
    }
}); 