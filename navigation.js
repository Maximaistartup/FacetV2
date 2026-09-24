export function initNavigation() {
  const buttons = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".tab-page");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      buttons.forEach(b => b.classList.remove("active"));
      pages.forEach(p => p.classList.add("hidden"));

      btn.classList.add("active");
      const targetPage = document.getElementById(`tab-${target}`);
      if (targetPage) targetPage.classList.remove("hidden");
    });
  });
}
