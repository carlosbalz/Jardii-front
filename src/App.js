import { useState } from "react";
import DetailsModal from "./DetailsModal";
import "./style.css";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("burgers");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);

  const openTab = (tabName) => setActiveTab(tabName);    

  const handleShowDetails = (item) => {
    setModalOpen(true);
    setSelectedItem(item);
  }

  return (
    <div>
      <header>
        <div className="tabs">
          <div 
            className={`tab ${activeTab === "burgers" ? "active" : ""}`} 
            onClick={() => openTab("burgers")}
          >
            Hambúrgueres
          </div>
          <div 
            className={`tab ${activeTab === "drinks" ? "active" : ""}`} 
            onClick={() => openTab("drinks")}
          >
            Bebidas
          </div>
        </div>
        <img className="bag-img" src="/images/bag.jpg" alt="Bag" />
      </header>

      <main>
        {activeTab === "burgers" && (
          <div className="content active">
            <div className="menu-container">
              {burgers.map((burger, index) => (
                <div className="menu-item" key={index} onClick={() => handleShowDetails(burger)}>
                  <img className="item-img" src={burger.image_path} alt={burger.name} />
                  <div className="details">
                    <h3 className="menu-item-title">{burger.name}</h3>
                    <p className="description">{burger.description}</p>
                    <p className="price"><strong>R${burger.price}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "drinks" && (
          <div className="content active">
            <div className="menu-container">
              {drinks.map((drink, index) => (
                <div className="menu-item" key={index} onClick={() => handleShowDetails(drink)}>
                  <img className="item-img" src={drink.image_path} alt={drink.name} />
                  <div className="details">
                    <h3 className="menu-item-title">{drink.name}</h3>
                    <p className="price"><strong>R${drink.price}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DetailsModal item={selectedItem} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </main>

      
    </div>
  );
};

const burgers = [
  { name: "Clássico", description: "Pão, carne bovina, queijo, alface, tomate e maionese.", price: 17.0, image_path: "/images/burger.jpg", type: "burger" },
  { name: "BBQ", description: "Pão, carne bovina, queijo, cebola caramelizada, molho barbecue e bacon.", price: 18.0, image_path: "/images/burger.jpg", type: "burger" },
  { name: "Vegano", description: "Pão vegano, hambúrguer de grão de bico, alface, tomate e maionese vegana.", price: 17.0, image_path: "/images/burger.jpg", type: "burger" },
  { name: "Frango Grelhado", description: "Pão, frango grelhado, queijo, alface, tomate e molho especial.", price: 16.0, image_path: "/images/burger.jpg", type: "burger" },
  { name: "Duplo Queijo", description: "Pão, carne bovina dupla, dois tipos de queijo, alface, tomate e maionese.", price: 20.0, image_path: "/images/burger.jpg", type: "burger" }
];

const drinks = [
  { name: "Coca lata", price: 6.0, image_path: "/images/coca-lata.jpg" },
  { name: "Coca zero lata", price: 6.0, image_path: "/images/coca-zero-lata.jpg" }
];

export default Menu;
