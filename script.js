/* --- 1. PROJECT DATA --- */
const projects = [
    {
        title: "Fuel Delivery System",
        description: "Streamlined fuel delivery operations with real-time tracking.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "assets/FuelUp.png", 
        liveLink: "https://fuel-delivery-app.netlify.app/",
        codeLink: "#"
    },
    {
        title: "Kraze Club",
        description: "A complete mobile accessories marketplace allowing users to browse and purchase device accessories.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        image: "assets/kraze.png", 
        liveLink: "https://kraze-club.netlify.app/",
        codeLink: "#"
    },
    {
        title: "The Nexus Media",
        description: "A professional photography portfolio website featuring an integrated booking system for clients.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        image: "assets/nexus.png", 
        liveLink: "https://the-nexus-media.netlify.app/",
        codeLink: "#"
    },
    {
        title: "ChatSe Application",
        description: "A real-time Android messaging application similar to WhatsApp/Telegram focused on secure text communication.",
        tech: ["Android Studio", "Java", "XML"],
        image: "assets/chatse.png", 
        liveLink: "https://chatse.netlify.app/",
        codeLink: "#"
    }
];

/* --- 2. LOAD PROJECTS INTO HTML --- */
const projectContainer = document.getElementById('projects-container');

const iconLive = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

const iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;

function loadProjects() {
    if(!projectContainer) return;

    projectContainer.innerHTML = projects.map(project => `
        <article class="card project-card">
            <div class="card-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="card-image">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                
                <div class="tech-tags">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>

                <div class="project-links">
                    <a href="${project.liveLink}" class="btn-sm" target="_blank">${iconLive} Live</a>
                    <a href="${project.codeLink}" class="btn-sm" target="_blank">${iconCode} Code</a>
                </div>
            </div>
        </article>
    `).join('');
}

loadProjects();


/* --- 3. UNIVERSAL CASCADE ANIMATIONS --- */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

// 1. Observe Sections (for titles)
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// 2. Observe ALL Cards (for cascade effect)
setTimeout(() => {
    // We select ALL types of cards on the site
    const allCards = document.querySelectorAll(
        '.project-card, .skill-card, .stat-card, .cert-card, .contact-card-item'
    );

    allCards.forEach((card) => {
        // Add hidden class so they start invisible
        card.classList.add('hidden');
        // Start watching them
        observer.observe(card);
    });
}, 100);

/* --- 4. CONTACT FORM HANDLING (UPDATED) --- */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent page reload

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnContent = submitBtn.innerHTML; // Save original text/icon
        const originalBg = submitBtn.style.backgroundColor;
        const originalBorder = submitBtn.style.borderColor;
        const originalColor = submitBtn.style.color;

        // 1. Loading State
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // 2. SUCCESS STATE (Green + Check Icon)
                const iconSuccess = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                
                submitBtn.innerHTML = iconSuccess + "Message Sent!";
                submitBtn.style.backgroundColor = "#22c55e"; // Green
                submitBtn.style.borderColor = "#22c55e";
                submitBtn.style.color = "#ffffff";
                
                contactForm.reset(); // Clear the form inputs
            } else {
                // 3. ERROR STATE (Red + Alert Icon)
                const iconError = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
                
                console.log(response);
                submitBtn.innerHTML = iconError + "Failed. Try again.";
                submitBtn.style.backgroundColor = "#ef4444"; // Red
                submitBtn.style.borderColor = "#ef4444";
                submitBtn.style.color = "#ffffff";
            }
        })
        .catch(error => {
            console.log(error);
            const iconError = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
            
            submitBtn.innerHTML = iconError + "Network Error";
            submitBtn.style.backgroundColor = "#ef4444"; // Red
            submitBtn.style.borderColor = "#ef4444";
            submitBtn.style.color = "#ffffff";
        })
        .finally(() => {
            // 4. RESET BUTTON (After 5 seconds)
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.style.backgroundColor = originalBg;
                submitBtn.style.borderColor = originalBorder;
                submitBtn.style.color = originalColor;
                submitBtn.disabled = false;
            }, 5000);
        });
    });
}