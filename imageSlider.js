// Function to initialize the slider
const initSlider = () => {
    // Select necessary DOM elements
    const slideButtons = document.querySelectorAll(
        ".sliderWrapper .slide-button"
    );
    const imageList = document.querySelector(".sliderWrapper .imageList");
    const sliderScrollbar = document.querySelector(
        ".container .sliderScrollbar"
    );
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbarThumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Add event listener to handle thumb dragging
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosititon = scrollbarThumb.offsetLeft;

        // Function to handle mouse movement
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosititon + deltaX;
            const maxThumbPosition =
                sliderScrollbar.getBoundingClientRect().width -
                scrollbarThumb.offsetWidth;

            // Ensure the thumb stays within bounds
            const boundedPosition = Math.max(
                0,
                Math.min(maxThumbPosition, newThumbPosition)
            );

            // Calculate scroll position based on thumb position
            const scrollPosition =
                (boundedPosition / maxThumbPosition) * maxScrollLeft;

            // Update thumb position and imageList scroll
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        // Function to handle mouse release
        const handleMouseUp = () => {
            // Remove event listeners when mouse is released
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Add event listeners for mouse move and mouse up
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Add event listeners to handle slide buttons
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "prevSlide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;

            // Scroll the imageList with smooth behavior
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Function to handle the visibility of slide buttons
    const handleSlideButtons = () => {
        slideButtons[0].style.display =
            imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display =
            imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    // Function to update the scrollbar thumb position
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosititon =
            (scrollPosition / maxScrollLeft) *
            (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

        // Update the thumb position
        scrollbarThumb.style.left = `${thumbPosititon}px`;
    };

    // Add a scroll event listener to the imageList
    imageList.addEventListener("scroll", () => {
        // Handle the visibility of slide buttons
        handleSlideButtons();

        // Update the scrollbar thumb position
        updateScrollThumbPosition();
    });
};

// Initialize the slider on page load
window.addEventListener("load", initSlider);
