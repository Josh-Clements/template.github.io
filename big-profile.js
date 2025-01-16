        // Tab Switching Functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and content sections
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.content-section').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Like Button Functionality
        const likeButton = document.querySelector('.like-button');
        let isLiked = false;
        let likeCount = 123;

        likeButton.addEventListener('click', () => {
            isLiked = !isLiked;
            likeCount += isLiked ? 1 : -1;
            updateLikeButton();
        });

        function updateLikeButton() {
            likeButton.innerHTML = `
                <span>👍</span>
                <span>${likeCount} Likes</span>
            `;
            likeButton.style.background = isLiked ? 'var(--tab-active-color)' : 'var(--button-color)';
            likeButton.style.color = isLiked ? '#fff' : 'var(--button-text-color)';
        }

        // Close Button Functionality
        document.querySelector('.close-button').addEventListener('click', () => {
            // In a real implementation, this would close the modal
            // For this demo, we'll just log to console
            console.log('Modal closed');
        });

        // Theme Toggle Support (for demo purposes)
        function toggleTheme() {
            document.body.classList.toggle('dark');
        }

        // Photo Gallery Preview
        document.querySelectorAll('.thumbnail-container').forEach(container => {
            container.addEventListener('click', () => {
                // In a real implementation, this would open the photo gallery
                console.log('Opening photo gallery...');
            });
        });