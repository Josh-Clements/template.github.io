// Tab Switching Functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content sections
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and its content
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');

        // Toggle action buttons visibility
        const actionButtons = document.querySelector('.action-buttons');
        if (tab.dataset.tab === 'room-info' || tab.dataset.tab === 'settings') {
            actionButtons.style.display = 'flex';
        } else {
            actionButtons.style.display = 'none';
        }
    });
});

// Password Protection Toggle
const passwordProtection = document.getElementById('password-protection');
const passwordForm = document.getElementById('password-form');

passwordProtection.addEventListener('change', () => {
    passwordForm.style.display = passwordProtection.checked ? 'block' : 'none';
});

// Save Changes Handler
document.getElementById('save-button').addEventListener('click', async () => {
    const saveButton = document.getElementById('save-button');
    saveButton.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Changes saved successfully!');
    } catch (error) {
        alert('Error saving changes. Please try again.');
    } finally {
        saveButton.classList.remove('loading');
    }
});

// Delete Room Confirmation
document.getElementById('delete-room').addEventListener('click', () => {
    if (confirm('Are you sure you want to permanently delete this room? This action cannot be undone.')) {
        alert('Room deletion initiated...');
    }
});

// Disable Room Toggle
let roomDisabled = false;
document.getElementById('disable-room').addEventListener('click', () => {
    roomDisabled = !roomDisabled;
    const button = document.getElementById('disable-room');
    button.textContent = roomDisabled ? 'Enable Room' : 'Disable Room';
    alert(`Room ${roomDisabled ? 'disabled' : 'enabled'} successfully!`);
});

// Close Button Handler
document.querySelector('.close-button').addEventListener('click', () => {
    if (confirm('Are you sure you want to close? Any unsaved changes will be lost.')) {
        document.getElementById('room-management-modal').style.display = 'none';
    }
});

// Cancel Button Handler
document.getElementById('cancel-button').addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        document.getElementById('room-management-modal').style.display = 'none';
    }
});

// Unban User Handler
document.querySelectorAll('.banned-user .ban-actions .button').forEach(button => {
    if (button.textContent === 'Unban') {
        button.addEventListener('click', (e) => {
            const username = e.target.closest('.banned-user').querySelector('.username').textContent.trim();
            if (confirm(`Are you sure you want to unban ${username}?`)) {
                e.target.closest('.banned-user').remove();
                alert(`${username} has been unbanned.`);
            }
        });
    }
});

// Staff Management Handlers
document.querySelectorAll('.staff-actions .button').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = button.textContent.toLowerCase();
        const staffMember = e.target.closest('.staff-member');
        const username = staffMember.querySelector('.username').textContent.trim();

        switch(action) {
            case 'promote':
                if (confirm(`Are you sure you want to promote ${username}?`)) {
                    alert(`${username} has been promoted.`);
                }
                break;
            case 'demote':
                if (confirm(`Are you sure you want to demote ${username}?`)) {
                    alert(`${username} has been demoted.`);
                }
                break;
            case 'remove':
                if (confirm(`Are you sure you want to remove ${username} from staff?`)) {
                    alert(`${username} has been removed from staff.`);
                }
                break;
        }
    });
});

// Search functionality
document.querySelectorAll('.search-input').forEach(input => {
    input.addEventListener('input', (e) => {
        // Implement search logic here
        console.log('Searching for:', e.target.value);
    });
});

// Function to open room management modal
function openRoomManagementModal() {
    const modal = document.getElementById('room-management-modal');
    modal.style.display = 'flex';

    // Set initial action buttons visibility based on default active tab
    const activeTab = document.querySelector('.tab.active');
    const actionButtons = document.querySelector('.action-buttons');
    if (activeTab && (activeTab.dataset.tab === 'room-info' || activeTab.dataset.tab === 'settings')) {
        actionButtons.style.display = 'flex';
    } else {
        actionButtons.style.display = 'none';
    }
}

// Function to close room management modal
function closeRoomManagementModal() {
    const modal = document.getElementById('room-management-modal');
    modal.style.display = 'none';
}