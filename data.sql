CREATE DATABASE boutique;

USE boutique;

CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ref VARCHAR(10),
    nom VARCHAR(100),
    type VARCHAR(50),
    prix DECIMAL(5, 2)
);

INSERT INTO produits (ref, nom, type, prix) VALUES 
('01', 'Programme Prise de masse Homme', 'Ebook', 49.99),
('02', 'Programme Remise en forme Femme', 'Ebook', 49.99),
('03', 'Nutrition', 'Ebook', 27.99),
('04', 'Potion Prise de Masse', 'PDF', 7.99),
('05', 'Programme Perte de poids Femme', 'Ebook', 49.99);
