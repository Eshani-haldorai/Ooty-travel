// This is the JavaScript file.
// It is used to make the website interactive (e.g., clicking buttons, fetching data).

console.log("Welcome to Vihaan Travels!");

// 1. Data: Access the destination information (Enhanced with Itinerary)
const destinations = [
    {
        id: "Ooty",
        title: "Ooty, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1548695604-03a95d55b083?q=80&w=2070&auto=format&fit=crop",
        description: "Queen of Hill Stations. Enjoy the botanical gardens, boat house, and tea estates.",
        price: "Starts ₹3,500",
        itinerary: [
            { day: "Day 1", plan: "Arrival & Ooty Lake Boating. Visit the Botanical Gardens in the evening." },
            { day: "Day 2", plan: "Doddabetta Peak for sunrise, followed by a Tea Factory tour and Chocolate Museum." },
            { day: "Day 3", plan: "Ride the Nilgiri Mountain Railway (Toy Train) and visit Rose Garden before departure." }
        ]
    },
    {
        id: "Munnar",
        title: "Munnar, Kerala",
        image: "https://images.unsplash.com/photo-1596328867373-10d9396323c6?q=80&w=2070&auto=format&fit=crop",
        description: "Breathtaking tea plantations and misty rolling hills perfect for a getaway.",
        price: "Starts ₹4,000",
        itinerary: [
            { day: "Day 1", plan: "Arrival & Cheeyappara Waterfalls. Check-in and relax amidst tea gardens." },
            { day: "Day 2", plan: "Eravikulam National Park (Rajamalai), Tea Museum, and Mattupetty Dam boating." },
            { day: "Day 3", plan: "Top Station view point, Echo Point, and spice plantation tour." }
        ]
    },
    {
        id: "Coorg",
        title: "Coorg, Karnataka",
        image: "https://images.unsplash.com/photo-1596799516664-9d51130d2232?q=80&w=2071&auto=format&fit=crop",
        description: "The Scotland of India. Coffee plantations, waterfalls, and scenic drives.",
        price: "Starts ₹3,800",
        itinerary: [
            { day: "Day 1", plan: "Arrival & Raja's Seat for sunset. Visit Omkareshwara Temple." },
            { day: "Day 2", plan: "Dubare Elephant Camp, river rafting, and Abbey Falls." },
            { day: "Day 3", plan: "Talakaveri (origin of River Kaveri) and Bhagamandala before return." }
        ]
    },
    {
        id: "Kodaikanal",
        title: "Kodaikanal, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1555546419-4c8d55fa4ac0?q=80&w=2070&auto=format&fit=crop",
        description: "The Princess of Hill Stations. Serene lakes and pine forests wait for you.",
        price: "Starts ₹3,600",
        itinerary: [
            { day: "Day 1", plan: "Arrival & Kodai Lake cycling/boating. Bryant Park walk." },
            { day: "Day 2", plan: "Coaker's Walk, Pillar Rocks, and Green Valley View (Suicide Point)." },
            { day: "Day 3", plan: "Bear Shola Falls and Silver Cascade Falls on the way back." }
        ]
    }
];

// 2. Logic: Render the cards to the screen
const grid = document.getElementById('destinations-grid');
const modal = document.getElementById('destination-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact');
const destinationSelect = document.getElementById('destination-select');

// Render Cards
destinations.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${place.image}" alt="${place.title}">
        <div class="card-content">
            <h3>${place.title}</h3>
            <p>${place.description}</p>
            <span class="price">${place.price}</span>
            <button class="btn-primary view-details-btn" data-id="${place.id}">View Details</button>
        </div>
    `;
    grid.appendChild(card);
});

// 3. Modal Logic

// Function to open modal
function openModal(destinationId) {
    const place = destinations.find(d => d.id === destinationId);
    if (!place) return;

    // Generate Itinerary HTML
    const itineraryHtml = place.itinerary.map(item => `
        <div class="itinerary-day">
            <strong>${item.day}</strong>
            ${item.plan}
        </div>
    `).join('');

    // Inject Content
    modalBody.innerHTML = `
        <div class="modal-hero" style="background-image: url('${place.image}');"></div>
        <div class="modal-body-content">
            <h2>${place.title}</h2>
            <p style="font-size: 1.1rem; color: #555; margin-bottom: 20px;">${place.description}</p>
            
            <h3 style="margin-bottom: 15px;">Suggested Itinerary</h3>
            ${itineraryHtml}
            
            <div style="margin-top: 30px; text-align: center;">
                <p style="font-weight: bold; font-size: 1.2rem; color: var(--secondary-color); margin-bottom: 10px;">${place.price} per person</p>
                <button class="btn-primary book-now-btn" style="padding: 15px 40px; font-size: 1.1rem;">Book This Trip</button>
            </div>
        </div>
    `;

    modal.style.display = "block";

    // "Book This Trip" Button Logic inside Modal
    const bookBtn = modalBody.querySelector('.book-now-btn');
    bookBtn.addEventListener('click', () => {
        modal.style.display = "none"; // Close modal
        contactForm.scrollIntoView({ behavior: 'smooth' }); // Scroll to form
        destinationSelect.value = place.id; // Pre-fill selection
    });
}

// Event Delegation for "View Details" buttons
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details-btn')) {
        const id = e.target.getAttribute('data-id');
        openModal(id);
    }
});

// Close Modal Logic
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// 4. Form Submission Logic (SMS Redirection)
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const destination = document.getElementById('destination-select').value;
    const message = document.getElementById('message').value;

    // Create the SMS body
    const smsBody = `Name: ${name}%0AEmail: ${email}%0ADestination: ${destination}%0ADetails: ${message}`;

    // Check if device is iOS to use '&' separator, otherwise '?'
    // (Simple heuristic, though modern iOS often supports '?' too)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const separator = isIOS ? '&' : '?';

    const smsLink = `sms:+919789690423${separator}body=${smsBody}`;

    // Open the SMS app
    window.location.href = smsLink;

    alert("Opening your messaging app to send the inquiry...");
    bookingForm.reset();
});

// 5. Mobile Navigation Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}
