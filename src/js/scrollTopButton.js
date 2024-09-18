document.addEventListener('DOMContentLoaded', function () {
  let projectTopButton = document.getElementById('scrollTopBtn');

  if (projectTopButton) {
    projectTopButton.addEventListener('click', backTop);
  }

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 35 ||
      document.documentElement.scrollTop > 35
    ) {
      projectTopButton.style.display = 'block';
    } else {
      projectTopButton.style.display = 'none';
    }
  }

  function backTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});
