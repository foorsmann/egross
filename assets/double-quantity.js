(function(){
  function handleClick(event){
    var btn = event.target.closest('[data-double-quantity]');
    if(!btn) return;
    var wrapper = btn.closest('[data-quantity-input-wrapper]') || btn.closest('quantity-input');
    if(!wrapper) return;
    var input = wrapper.querySelector('[data-quantity-input]');
    if(!input) return;
    var form = btn.closest('form');
    var productId = input.dataset.productId;
    var variantInput = form ? form.querySelector('input[name="id"]') : null;
    var variantId = variantInput ? Number(variantInput.value) : null;
    var maxQty = Infinity;
    if(window._themeProducts && productId && variantId){
      var product = window._themeProducts[productId];
      if(product && product.variants){
        var variant = product.variants.find(function(v){return v.id === variantId;});
        if(variant && typeof variant.inventory_quantity === 'number'){
          maxQty = variant.inventory_quantity;
        }
      }
    }
    var current = parseInt(input.value,10) || 1;
    var newQty = current * 2;
    if(newQty > maxQty){
      newQty = maxQty;
      var msg = wrapper.parentElement.querySelector('[data-qty-warning]');
      if(msg){
        var template = window.ConceptSGMStrings && window.ConceptSGMStrings.max_items_message;
        if(!template && window.Shopify && Shopify.translation && Shopify.translation.products && Shopify.translation.products.product){
          template = Shopify.translation.products.product.max_items_message;
        }
        if(template){
          msg.textContent = template.replace('{{ quantity }}', maxQty);
        } else {
          msg.textContent = 'There are only '+maxQty+' items left in stock. You cannot add more than that.';
        }
        msg.classList.remove('hidden');
      }
    } else {
      var msg = wrapper.parentElement.querySelector('[data-qty-warning]');
      if(msg){
        msg.classList.add('hidden');
      }
    }
    input.value = Math.max(newQty,1);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  document.addEventListener('click', handleClick);
  document.addEventListener('shopify:section:load', function(){
    // ensure events on new sections
  });
})();
