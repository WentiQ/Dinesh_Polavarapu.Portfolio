// --- Portfolio Advanced UI Interactivity ---
// --- About Section Dynamic Rendering ---
async function renderAboutSection() {
  try {
    const res = await fetch('data/about.json');
    if (!res.ok) throw new Error('Failed to load about.json');
    const about = await res.json();
    const aboutSection = document.querySelector('section#about .about');
    if (!aboutSection) return;
    aboutSection.innerHTML = `
      <div class="about-img">
        <img src="${about.photo}" alt="About Photo" />
      </div>
      <div class="about-content">
        <h3>${about.title}</h3>
        <p>${about.description}</p>
        <div class="skills">
          ${about.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
        </div>
      </div>
    `;
    // Optionally update the section title and name if needed
    const sectionTitle = document.querySelector('section#about .section-title');
    if (sectionTitle) sectionTitle.textContent = `About ${about.name}`;
  } catch (err) {
    // fallback: show error in about section
    const aboutSection = document.querySelector('section#about .about');
    if (aboutSection) aboutSection.innerHTML = '<p style="color:#ff6b6b;">Failed to load About info.</p>';
  }
}
document.addEventListener('DOMContentLoaded', renderAboutSection);

// Smooth scroll for nav links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    // Only apply smooth scroll for internal links (not external, not mailto, not tel)
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Animated nav highlight on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Contact form feedback
const contactForm = document.querySelector('section#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Thank you for reaching out! I will get back to you soon.');
      this.reset();
    }, 1200);
  });
}

// Add .active nav link style
const style = document.createElement('style');
style.textContent = `nav a.active { color: #2563eb !important; }`;
document.head.appendChild(style);
