document.addEventListener("DOMContentLoaded", function() {
    // Écouteur d'événements pour la navigation active
    var navItems = document.querySelectorAll('.navbar ul li a');
    navItems.forEach(function(item) {
        if (item.href === window.location.href) {
            item.classList.add('active');
        }
    });

    // Écouteur d'événements pour le dropdown
    var dropdown = document.querySelector('.dropdown-button');
    dropdown.onclick = function() {
        var dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    };

    // Écouteur d'événements pour les liens de dropdown
    var dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Liste des produits
    const produits = [
        { id: '01', nom: 'Programme Prise de masse Homme', type: 'Ebook', prix: 49.99, url: 'prisedemassehomme.html' },
        { id: '02', nom: 'Programme Remise en forme Femme', type: 'Ebook', prix: 49.99, url: 'remiseformefemme.html' },
        { id: '03', nom: 'Nutrition', type: 'Ebook', prix: 27.99, url: 'nutrition.html' },
        { id: '04', nom: 'Potion Prise de Masse', type: 'PDF', prix: 7.99, url: 'potionmasse.html' },
        { id: '05', nom: 'Programme Perte de poids Femme', type: 'Ebook', prix: 49.99, url: 'pertepoidsfemme.html' }
    ]; 

    function addProductToCart(nom, prix, image) {
        let product = {
            nom: nom,
            prix: prix,
            image: image,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let existingProductIndex = cart.findIndex(item => item.nom === nom);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1; // Incrémente la quantité si le produit existe déjà
        } else {
            cart.push(product); // Ajoute un nouveau produit
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = ''; // Vider la liste actuelle

        if (cart.length === 0) {
            document.getElementById('empty-cart-message').style.display = 'block';
        } else {
            document.getElementById('empty-cart-message').style.display = 'none';
            cart.forEach((item, index) => {
                let li = document.createElement('li');
                li.className = 'cart-item';
                li.innerHTML = `
                    <div class="cart-item-image-container">
                        <a href="${item.url}" target="_blank">
                            <img src="${item.image}" class="cart-item-image">
                        </a>
                    </div>
                    <div class="cart-item-details">
                        <a href="${item.url}" target="_blank" class="cart-item-title">${item.nom}</a>
                        <div class="cart-item-quantity-container">
                            <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                            <span class="cart-item-price">${item.prix}€</span>
                        </div>
                    </div>
                    <div class="remove-cart-item" onclick="removeFromCart(${index})">&times;</div>
                `;
                cartItemsElement.appendChild(li);
            });
        }
    }

    // Fonction pour supprimer un produit du panier
    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

  
    function updateQuantity(index, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    // Appeler la fonction pour initialiser l'affichage du panier
    updateCartDisplay();

    // Ajouter des écouteurs d'événements pour ajouter au panier ici
});