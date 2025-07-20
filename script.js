// --- Portfolio Advanced UI Interactivity ---

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
