var MenuItems = document.getElementById('MenuItems');
MenuItems.style.maxHeight = '0px';

function menutoggle() {
    if (MenuItems.style.maxHeight == '0px') {
        MenuItems.style.maxHeight = '200px';
    } else {
        MenuItems.style.maxHeight = '0px';
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('sortBy');

  if (!select) {
    console.error('Nepavyko rasti elementas su id "sortBy"');
    return;
  }

  select.addEventListener('change', () => {
    console.log('Pasirinkta:', select.value);

    const items = Array.from(document.querySelectorAll('.clothes-item'));

    console.log('Drabužių elementai:', items);

    if (items.length === 0) {
      console.log('Nerasta jokių drabužių elemento.');
      return; 
    }

    const sortItems = (a, b, attr, isNumeric) => {
      if (isNumeric) {
        return parseFloat(a.dataset[attr]) - parseFloat(b.dataset[attr]);
      }
      return a.dataset[attr].localeCompare(b.dataset[attr]);
    };

    switch (select.value) {
      case 'price':
        items.sort((a, b) => sortItems(a, b, 'price', true));
        break;
      case 'popularity':
        items.sort((a, b) => sortItems(a, b, 'popularity', true));
        break;
      case 'rating':
        items.sort((a, b) => sortItems(a, b, 'rating', true));
        break;
      case 'sale':
        items.sort((a, b) => {
          const aSale = a.dataset.sale === 'true' ? 0 : 1;
          const bSale = b.dataset.sale === 'true' ? 0 : 1;
          return aSale - bSale;
        });
        break;
      default:
        return;
    }

    const container = document.querySelector('.row');
    for (const item of items) {
      container.appendChild(item);
    }
  });
});

