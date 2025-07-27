// Handles quantity inputs that should increment or decrement by 2
(function() {
  const selector = '[data-double-quantity]';

  function attach() {
    document.querySelectorAll(selector).forEach(wrapper => {
      if (wrapper.dataset.doubleAttached) return;
      wrapper.dataset.doubleAttached = 'true';

      const input = wrapper.querySelector('input[type="number"]');
      if (!input) return;
      const btnPlus = wrapper.querySelector('[data-plus]');
      const btnMinus = wrapper.querySelector('[data-minus]');
      const step = parseInt(input.getAttribute('step')) || 1;

      btnPlus && btnPlus.addEventListener('click', () => {
        input.value = parseInt(input.value || 0) + step * 2;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      btnMinus && btnMinus.addEventListener('click', () => {
        let newVal = parseInt(input.value || 0) - step * 2;
        const min = parseInt(input.getAttribute('min')) || 0;
        if (newVal < min) newVal = min;
        input.value = newVal;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', attach);
  document.addEventListener('shopify:section:load', attach);
})();
