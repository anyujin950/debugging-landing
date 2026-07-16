document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Lucide 아이콘 렌더링
  // ==========================================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================
  // 2. 스크롤 헤더 효과 (Sticky Header)
  // ==========================================
  const header = document.querySelector('.site-header');
  const handleScrollHeader = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScrollHeader);
  handleScrollHeader(); // 초기 실행

  // ==========================================
  // 3. 모바일 메뉴 (Hamburger Menu) 토글
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  const openMobileMenu = () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  // 모바일 메뉴 링크 클릭 시 드로어 닫기
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================
  // 4. 부드러운 스크롤 (Smooth Scroll for Navigation)
  // ==========================================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // 가짜 링크 제외
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // 헤더 높이만큼 오프셋 설정
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 5. 스크롤 등장 애니메이션 (Intersection Observer)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  const observerOptions = {
    root: null, // 뷰포트를 기준으로 감시
    threshold: 0.15, // 요소가 15% 정도 나타났을 때 트리거
    rootMargin: '0px 0px -50px 0px' // 하단 여백 조절로 미리 로딩
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // 애니메이션이 한 번 실행된 후 관찰 해제 (옵션)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });
});
