//fetch("https://fakestoreapi.com/products")
//.then((resposta) => resposta.json())
//.then((json) => console.log(json))
//.catch((erro) => console.log(erro));

let allProducts = [];

function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(productId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(productId.toString());

  if (index === -1) {
    favorites.push(productId.toString());
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.dataset.productId = product.id; 

  const isFavorited = getFavorites().includes(product.id.toString());
  const heartIcon = isFavorited ? '❤' : '♡';
  const buttonClass = isFavorited ? 'favorite-button is-favorited' : 'favorite-button';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <button class="${buttonClass}">
      <span class="heart-icon">${heartIcon}</span> Favoritar
    </button>
  `;
  return card;
}

function setupFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('.favorite-button');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productId = productCard.dataset.productId.toString();
      
      toggleFavorite(productId);
      
      button.classList.toggle('is-favorited');
      const heartIcon = button.querySelector('.heart-icon');
      heartIcon.textContent = button.classList.contains('is-favorited') ? '❤' : '♡';

      if (window.location.pathname.endsWith('favorites.html')) {
        displayFavorites();
      }
    });
  });
}


async function fetchAllProducts() {
    const url = 'https://fakestoreapi.com/products';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    return await response.json();
}

async function displayAllProducts(productsToDisplay) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
    setupFavoriteButtons();
}

async function displayFavorites() {
    const container = document.getElementById('products-container');
    const favoriteIds = getFavorites();
    container.innerHTML = `<p>Carregando favoritos...</p>`;

    if (favoriteIds.length === 0) {
        container.innerHTML = `<p>Você não tem nenhum item favorito ainda.</p>`;
        return;
    }

    try {
        const products = await fetchAllProducts();
        const favoriteProducts = products.filter(product => 
            favoriteIds.includes(product.id.toString())
        );

        displayAllProducts(favoriteProducts);

    } catch (error) {
        container.innerHTML = `<p>Falha ao carregar os favoritos.</p>`;
        console.error('Erro ao exibir favoritos:', error);
    }
}

function filterProducts(searchTerm) {
    if (allProducts.length === 0) {
        return;
    }
    const filtered = allProducts.filter(product => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    displayAllProducts(filtered);
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');

    if (window.location.pathname.endsWith('favorites.html')) {

        displayFavorites();
        if (searchInput) {
            searchInput.style.display = 'none';
        }
    } else {
        const container = document.getElementById('products-container');
        container.innerHTML = `<p>Carregando produtos...</p>`;
        try {
            allProducts = await fetchAllProducts();
            displayAllProducts(allProducts);

            if (searchInput) {
                searchInput.addEventListener('input', (event) => {
                    filterProducts(event.target.value);
                });
            }
        } catch (error) {
            container.innerHTML = `<p>Falha ao carregar os produtos.</p>`;
            console.error('Erro ao inicializar a página principal:', error);
        }
    }
});
