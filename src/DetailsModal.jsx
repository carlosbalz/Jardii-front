import { useState, useEffect } from "react";

export default function DetailsModal({ isOpen, onClose, item }) {
  debugger;
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
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
      prev.some((item) => item.id === adicional.id)
        ? prev.filter((item) => item.id !== adicional.id)
        : [...prev, adicional]
    );
  };

  const availableAdicionals = [
    { id: 1, nome: "Queijo Extra", preco: 2.5 },
    { id: 2, nome: "Bacon", preco: 3.0 },
    { id: 3, nome: "Ovo", preco: 2.0 },
    { id: 4, nome: "Cebola Caramelizada", preco: 1.5 },
  ];

  const total = selected.reduce((acc, item) => acc + item.preco, 0);
  
  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <label className="">{item.name}</label>
            <div >
              <ul>
                {availableAdicionals.map((adicional) => (
                  <div key={adicional.id} className="">
                    <label className="aditional-item">
                      <input
                        type="checkbox"
                        onChange={() => toggleAdicional(adicional)}
                        checked={selected.some((item) => item.id === adicional.id)}
                      />
                      <span>{adicional.nome} (+ R$ {adicional.preco.toFixed(2)})</span>
                    </label>
                  </div>
                ))}
              </ul>
              <hr className="my-2" />
              <p className="text-lg font-semibold">Total: R$ {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
