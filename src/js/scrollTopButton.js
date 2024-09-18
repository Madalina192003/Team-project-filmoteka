document.addEventListener('DOMContentLoaded', function () {
  let projectTopButton = document.getElementById('scrollTopBtn');

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

  projectTopButton.addEventListener('click', backTop);

  function backTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});
