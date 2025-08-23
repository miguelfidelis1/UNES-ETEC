const coursesData = {
  1: {
      title: "Análise e Desenvolvimento de Sistemas",
      image: "assets/img/curso-1.jpg",
      description: "Este curso prepara você para projetar, desenvolver e gerenciar sistemas de software de alta performance. O currículo abrange linguagens de programação modernas, bancos de dados, metodologias ágeis e arquitetura de software, focando em soluções inovadoras para o mercado de tecnologia.",
      topics: [
          "Lógica de Programação e Algoritmos",
          "Desenvolvimento Web (Frontend e Backend)",
          "Engenharia de Software e Scrum",
          "Banco de Dados (SQL e NoSQL)",
          "Estruturas de Dados e Orientação a Objetos"
      ]
  },
  2: {
      title: "Gestão de Recursos Humanos",
      image: "assets/img/curso-2.jpg",
      description: "Capacite-se para ser um profissional estratégico na gestão de pessoas. O curso aborda recrutamento e seleção, treinamento e desenvolvimento, plano de carreira, remuneração e benefícios, e legislação trabalhista, preparando você para liderar e motivar equipes.",
      topics: [
          "Recrutamento e Seleção",
          "Cargos, Salários e Benefícios",
          "Legislação Trabalhista e Relações Humanas",
          "Comunicação Empresarial e Liderança",
          "Análise de Desempenho e Clima Organizacional"
      ]
  },
  3: {
      title: "Enfermagem",
      image: "assets/img/curso-3.jpg",
      description: "Formação completa para atuar no cuidado e assistência à saúde, em hospitais, clínicas, postos de saúde ou home care. O curso ensina procedimentos técnicos, ética profissional, primeiros socorros e promove uma visão humanizada do cuidado com o paciente.",
      topics: [
          "Saúde Coletiva e Enfermagem Clínica",
          "Primeiros Socorros e Urgência/Emergência",
          "Farmacologia e Administração de Medicamentos",
          "Ética e Legislação em Enfermagem",
          "Saúde da Criança, do Adolescente e da Mulher"
      ]
  },
  4: {
      title: "Marketing Digital",
      image: "assets/img/curso-4.jpg",
      description: "Aprenda a criar e gerenciar campanhas de marketing eficazes no ambiente digital. O curso aborda SEO, SEM, redes sociais, e-mail marketing, funil de vendas e análise de métricas, capacitando você para impulsionar marcas e negócios no mundo online.",
      topics: [
          "Estratégia de Marketing Digital",
          "SEO (Search Engine Optimization)",
          "Marketing de Conteúdo e Redes Sociais",
          "Analytics e Métricas de Desempenho",
          "Google Ads e Campanhas Pagas"
      ]
  },
  5: {
      title: "Ciência de Dados",
      image: "assets/img/curso-5.jpg",
      description: "O curso de Ciência de Dados forma profissionais para extrair insights valiosos de grandes volumes de informações. Você aprenderá a coletar, processar e analisar dados usando ferramentas estatísticas e de programação, auxiliando na tomada de decisões estratégicas.",
      topics: [
          "Introdução à Ciência de Dados e Big Data",
          "Programação em Python e R",
          "Estatística e Probabilidade",
          "Aprendizado de Máquina (Machine Learning)",
          "Visualização de Dados e Power BI"
      ]
  },
  6: {
      title: "Logística",
      image: "assets/img/curso-6.jpg",
      description: "Torne-se um especialista em gerenciar a cadeia de suprimentos de ponta a ponta. O curso aborda a gestão de estoque, transporte, distribuição e operações de armazenagem, otimizando processos para reduzir custos e aumentar a eficiência.",
      topics: [
          "Gestão da Cadeia de Suprimentos (Supply Chain)",
          "Planejamento e Controle de Estoques",
          "Transporte e Distribuição",
          "Gestão de Armazéns e Centros de Distribuição",
          "Logística Reversa e Sustentabilidade"
      ]
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navbarToggler = document.querySelector('.navbar-toggler');
  const mobileMenu = document.querySelector('.navbar-mobile');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  navbarToggler.addEventListener('click', () => {
      const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
      navbarToggler.setAttribute('aria-expanded', !isExpanded);
      navbarToggler.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          navbarToggler.setAttribute('aria-expanded', 'false');
          navbarToggler.classList.remove('active');
          mobileMenu.classList.remove('active');
      });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navbar-desktop .nav-link');

  const updateScrollSpy = () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - sectionHeight / 3) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
              link.classList.add('active');
          }
      });
  };

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();

  const animateOnScroll = () => {
      if (prefersReducedMotion) return;

      const elements = document.querySelectorAll('[data-aos]');

      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.2
      });

      elements.forEach(el => observer.observe(el));
  };

  animateOnScroll();

  const counters = document.querySelectorAll('.counter');

  const runCounters = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target;
              const target = parseInt(counter.dataset.target, 10);
              let count = 0;
              const increment = Math.ceil(target / 200);

              const updateCounter = () => {
                  if (count < target) {
                      count += increment;
                      if (count > target) count = target;
                      counter.innerText = count;
                      requestAnimationFrame(updateCounter);
                  }
              };

              if (!prefersReducedMotion) {
                  requestAnimationFrame(updateCounter);
              } else {
                  counter.innerText = target;
              }

              observer.unobserve(counter);
          }
      });
  };

  const counterObserver = new IntersectionObserver(runCounters, {
      threshold: 0.5
  });
  counters.forEach(counter => counterObserver.observe(counter));

  const slider = document.querySelector('.testimonials-slider');
  const dotsContainer = document.querySelector('.testimonials-slider-dots');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  testimonialCards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testimonials-slider-dots .dot');

  const goToSlide = (index) => {
      const offset = testimonialCards[index].offsetLeft;
      slider.scrollTo({
          left: offset,
          behavior: 'smooth'
      });

      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
  };

  let autoplayInterval;
  const startAutoplay = () => {
      if (prefersReducedMotion) return;
      autoplayInterval = setInterval(() => {
          let nextIndex = (currentIndex + 1) % testimonialCards.length;
          goToSlide(nextIndex);
      }, 5000);
  };

  const stopAutoplay = () => {
      clearInterval(autoplayInterval);
  };

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  startAutoplay();

  slider.addEventListener('scroll', () => {
      const scrollLeft = slider.scrollLeft;
      const cardWidth = testimonialCards[0].offsetWidth + (parseFloat(window.getComputedStyle(testimonialCards[0]).marginLeft) * 2);
      const newIndex = Math.round(scrollLeft / cardWidth);

      if (newIndex !== currentIndex) {
          dots.forEach(dot => dot.classList.remove('active'));
          if (dots[newIndex]) {
              dots[newIndex].classList.add('active');
              currentIndex = newIndex;
          }
      }
  });

  const courseModal = document.getElementById('courseModal');
  courseModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const courseId = button.getAttribute('data-course-id');
      const course = coursesData[courseId];

      if (course) {
          const modalTitle = courseModal.querySelector('.modal-course-title');
          const modalImage = courseModal.querySelector('.modal-course-image img');
          const modalDescription = courseModal.querySelector('.modal-course-description');
          const modalTopics = courseModal.querySelector('.modal-course-topics');

          modalTitle.textContent = course.title;
          modalImage.src = course.image;
          modalImage.alt = course.title;
          modalDescription.textContent = course.description;

          modalTopics.innerHTML = '';
          course.topics.forEach(topic => {
              const li = document.createElement('li');
              li.textContent = topic;
              modalTopics.appendChild(li);
          });
      }
  });

  const contactForm = document.getElementById('contact-form');
  const successToast = new bootstrap.Toast(document.getElementById('successToast'));
  const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));

  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (contactForm.checkValidity()) {
          console.log('Formulário enviado com sucesso!');
          successToast.show();
          contactForm.reset();
          contactForm.classList.remove('was-validated');
      } else {
          contactForm.classList.add('was-validated');
          errorToast.show();
      }
  }, false);

  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
          backToTopBtn.classList.add('show');
      } else {
          backToTopBtn.classList.remove('show');
      }
  });

  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });


  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
      darkModeToggle.checked = savedTheme === 'dark';
  }

  darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      } else {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
      }
  });
});