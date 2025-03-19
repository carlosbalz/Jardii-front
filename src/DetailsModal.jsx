import { useState, useEffect } from "react";

export default function DetailsModal({ isOpen, onClose, item }) {  
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelected([]);
        onClose();
      }
    }
    if (isOpen) {
      return window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const [selected, setSelected] = useState([]);

  const toggleAdicional = (adicional) => {    
    setSelected((prev) =>
      prev.some((item) => item.id === adicional.id) ? prev.filter((item) => item.id !== adicional.id) : [...prev, adicional]
    );
  };

  const availableAdicionals = [
    { id: 1, name: "Burguer 150g Extra", price: 10.0 },
    { id: 2, name: "Molho de Queijo", price: 4.0 },
    { id: 3, name: "Molho Cheddar", price: 4.0 },
    { id: 4, name: "Molho Cheddar", price: 4.0 },
    { id: 5, name: "Molho Provolone", price: 4.0 },
    { id: 6, name: "Molho Temper Cheese", price: 4.0 },
    { id: 7, name: "Molho Chimichurri", price: 4.0 },
    { id: 8, name: "Molho Sweet Chilli", price: 4.0 },
    { id: 9, name: "Molho de Pimenta", price: 4.0 },
    { id: 10, name: "Molho de Maionese", price: 4.0 },
    { id: 11, name: "Queijo Mussarela", price: 3.0 },
    { id: 12, name: "Alface/Rúcula", price: 2.0 },
    { id: 13, name: "Tomate", price: 3.0 },
    { id: 14, name: "Cebola Roxa", price: 3.0 },
    { id: 15, name: "Pimentão na Brasa", price: 4.0 },
    { id: 16, name: "Cebola Caramelizada", price: 5.0 }
  ];

  const total = selected.reduce((acc, additional) => acc + additional.price, 0) + item.price;
  
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <label className="modal-title">{item.name}</label>              
              <button className="close-button" onClick={() => {
                  onClose(); 
                  setSelected([]);
                }}>
                ✖
              </button>
            </div>
              <div style={{"display": "flex"}}>
                <img className="modal-img" src={item.image_path} alt={item.name} />
                <p className="description" style={{"padding": "10px 10px"}}>{item.description}</p>
              </div>
            <div className="additional-menu">              
              <div className="additional-container">
                {item.type === "burger" && availableAdicionals.map((adicional) => (
                  <div key={adicional.id} className="additional-item">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => toggleAdicional(adicional)}
                        checked={selected.some((item) => item.id === adicional.id)}
                      />
                      <span>{adicional.name} (+ R$ {adicional.price.toFixed(2)})</span>
                    </label>
                  </div>
                ))}
              </div>              
              <div style={{"display": "flex", "margin-top": "10px"}}>
                <p className="price" style={{"text-align": "start", "margin-top": "5px", "margin-right": "auto"}}><strong>R$ {total.toFixed(2)}</strong></p>
                <button className="add-to-cart-button">Adicionar ao Carrinho</button>                                
              </div>                          
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
