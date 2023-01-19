const navLinks = document.querySelectorAll('.nav_link');
const sections = document.querySelectorAll('section');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((li) => {
      li.classList.remove('active');
    });
    sections.forEach((section) => {
      section.classList.add('hide');
      const sectionId = section.getAttribute('id');
      const linkId = link.getAttribute('id');
      if (sectionId === `section-${linkId}`) {
        section.classList.remove('hide');
        link.classList.add('active');
      }
    });
  });
});