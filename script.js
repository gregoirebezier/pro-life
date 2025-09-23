// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initPhotoGallery();
    initVideoControls();
    initScrollEffects();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Photo Gallery
function initPhotoGallery() {
    const showGalleryBtn = document.getElementById('show-gallery');
    const photoGallery = document.getElementById('photo-gallery');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPhotoSpan = document.getElementById('current-photo');
    const totalPhotosSpan = document.getElementById('total-photos');

    let currentPhotoIndex = 0;
    let photos = [];

    // Show gallery when button is clicked
    showGalleryBtn.addEventListener('click', function() {
        photoGallery.style.display = 'block';
        showGalleryBtn.style.display = 'none';

        // Force gallery to be visible immediately
        photoGallery.style.opacity = '1';
        photoGallery.style.transform = 'translateY(0)';

        // Initialize carousel after showing
        setTimeout(() => {
            initCarousel();
        }, 100);
    });

    // Initialize photo carousel functionality
    function initCarousel() {
        // This function will be called when photos are added
        const photoElements = document.querySelectorAll('.photo-item');
        photos = Array.from(photoElements);

        if (photos.length > 0) {
            totalPhotosSpan.textContent = photos.length;
            updateCarousel();

            // Show/hide navigation buttons
            if (photos.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
        }
    }

    // Update carousel display
    function updateCarousel() {
        // Hide all photos
        photos.forEach((photo, index) => {
            if (index === currentPhotoIndex) {
                photo.style.display = 'flex';
            } else {
                photo.style.display = 'none';
            }
        });
        currentPhotoSpan.textContent = currentPhotoIndex + 1;
    }

    // Previous photo
    prevBtn.addEventListener('click', function() {
        if (currentPhotoIndex > 0) {
            currentPhotoIndex--;
        } else {
            currentPhotoIndex = photos.length - 1;
        }
        updateCarousel();
    });

    // Next photo
    nextBtn.addEventListener('click', function() {
        if (currentPhotoIndex < photos.length - 1) {
            currentPhotoIndex++;
        } else {
            currentPhotoIndex = 0;
        }
        updateCarousel();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (photoGallery.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                // Optional: hide gallery on escape
            }
        }
    });

    // Function to add photos dynamically (for user to call)
    window.addPhotoToGallery = function(imageSrc, altText = '', caption = '') {
        const track = document.querySelector('.carousel-track');
        const placeholder = document.querySelector('.photo-placeholder');

        // Remove placeholder if it exists
        if (placeholder) {
            placeholder.remove();
        }

        // Create photo element
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.style.minWidth = '100%';
        photoDiv.style.display = 'flex';
        photoDiv.style.flexDirection = 'column';
        photoDiv.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = altText;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.maxHeight = '600px';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';

        photoDiv.appendChild(img);

        if (caption) {
            const captionDiv = document.createElement('div');
            captionDiv.className = 'photo-caption';
            captionDiv.textContent = caption;
            captionDiv.style.marginTop = '1rem';
            captionDiv.style.textAlign = 'center';
            captionDiv.style.fontStyle = 'italic';
            captionDiv.style.color = '#7f8c8d';
            photoDiv.appendChild(captionDiv);
        }

        track.appendChild(photoDiv);

        // Reinitialize carousel
        initCarousel();
    };

    // Initialize carousel on load
    initCarousel();
}

// Video Controls
function initVideoControls() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Add custom controls functionality if needed
        video.addEventListener('loadstart', function() {
            console.log('Video loading started:', this.src);
        });

        video.addEventListener('loadeddata', function() {
            console.log('Video data loaded:', this.src);
        });

        video.addEventListener('error', function(e) {
            console.error('Video error:', e);

            // Create error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'video-error';
            errorDiv.style.cssText = `
                background-color: #f8d7da;
                color: #721c24;
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                margin: 1rem 0;
            `;
            errorDiv.innerHTML = `
                <strong>Erreur de chargement vidéo</strong><br>
                Vérifiez que le fichier existe et est accessible.
            `;

            // Replace video with error message
            this.parentNode.insertBefore(errorDiv, this);
            this.style.display = 'none';
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Add active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.style.color = '';
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = '#3498db';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading state management
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Export functions for external use
window.galleryFunctions = {
    addPhoto: window.addPhotoToGallery,
    showLoading,
    hideLoading
};

// Console message for developers
console.log('Site de sensibilisation à l\'avortement - Chargé avec succès');
console.log('Pour ajouter des photos: addPhotoToGallery("chemin/vers/image.jpg", "texte alternatif", "légende")');