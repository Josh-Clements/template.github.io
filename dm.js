document.addEventListener('DOMContentLoaded', () => {
    // Get DM window elements
    const dmWindow = document.getElementById('dmWindow');
    const dmHeader = document.getElementById('dmHeader');
    const dmCloseButton = dmWindow.querySelector('.dm-close-button');
    const dmMoreOptions = dmWindow.querySelector('.dm-action-button[title="More options"]');
    const dmEmojiButton = dmWindow.querySelector('.dm-action-button:first-child');
    const userContextMenu = document.getElementById('userContextMenu');

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Load saved position and size
    function loadSavedState() {
        const savedState = JSON.parse(localStorage.getItem('dmWindowState') || '{}');
        
        if (savedState.position) {
            xOffset = savedState.position.x;
            yOffset = savedState.position.y;
            setTranslate(xOffset, yOffset, dmWindow);
        }
        
        if (savedState.size) {
            dmWindow.style.width = savedState.size.width;
            dmWindow.style.height = savedState.size.height;
        }
    }

    // Save current position and size
    function saveState() {
        const state = {
            position: {
                x: xOffset,
                y: yOffset
            },
            size: {
                width: dmWindow.style.width || '400px',  // Default width if not set
                height: dmWindow.style.height || '600px' // Default height if not set
            }
        };
        localStorage.setItem('dmWindowState', JSON.stringify(state));
    }

    // Add drag functionality
    if (dmHeader) {
        dmHeader.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    // Save size when resizing ends
    let resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === dmWindow && dmWindow.style.display !== 'none') {
                saveState();
            }
        }
    });

    resizeObserver.observe(dmWindow);

    // Close button
    if (dmCloseButton) {
        dmCloseButton.addEventListener('click', () => {
            saveState();
            dmWindow.style.display = 'none';
        });
    }

    // More options button
    if (dmMoreOptions && userContextMenu) {
        dmMoreOptions.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = e.target.getBoundingClientRect();
            userContextMenu.style.top = `${rect.bottom + 5}px`;
            userContextMenu.style.left = `${rect.left}px`;
            userContextMenu.classList.add('active');
        });
    }

    // Emoji button
    if (dmEmojiButton) {
        dmEmojiButton.addEventListener('click', () => {
            console.log('Opening emoji picker');
        });
    }

    // Add click handlers for DM-specific elements
    const dmTriggers = () => {
        // Target only room items under "Direct Messages" in left sidebar
        const directMessagesHeader = Array.from(document.querySelectorAll('.sidebar-header'))
            .find(header => header.textContent === 'Direct Messages');
        
        if (directMessagesHeader) {
            // Get all room items that come after the "Direct Messages" header
            let currentElement = directMessagesHeader.nextElementSibling;
            while (currentElement && currentElement.classList.contains('room-item')) {
                currentElement.style.cursor = 'pointer';
                currentElement.addEventListener('click', openDM);
                currentElement = currentElement.nextElementSibling;
            }
        }

        // Target "Message" button in profile modal
        const profileMessageBtn = document.querySelector('#smallProfileModal button');
        if (profileMessageBtn && profileMessageBtn.textContent === 'Message') {
            profileMessageBtn.addEventListener('click', () => {
                // Close the profile modal
                document.getElementById('smallProfileModal').style.display = 'none';
                // Open DM
                openDM();
            });
        }
    };

    // Function to open DM window
    function openDM() {
        if (dmWindow) {
            dmWindow.style.display = 'flex';
            loadSavedState();
        }
    }

    // Call this after DOMContentLoaded
    dmTriggers();

    // Close context menu when clicking outside
    document.addEventListener('click', () => {
        if (userContextMenu) {
            userContextMenu.classList.remove('active');
        }
    });

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === dmHeader || e.target.parentNode === dmHeader) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, dmWindow);
        }
    }

    function dragEnd() {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            saveState();
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // Handle responsiveness
    function handleResize() {
        if (window.innerWidth <= 768) {
            dmWindow.style.transform = 'none';
            xOffset = 0;
            yOffset = 0;
            // Reset the size for mobile
            dmWindow.style.width = '100%';
            dmWindow.style.height = '100%';
        } else {
            // Restore saved position and size when returning to desktop
            loadSavedState();
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize state on first load
    loadSavedState();

    // Make openDM function globally available
    window.openDM = openDM;
});