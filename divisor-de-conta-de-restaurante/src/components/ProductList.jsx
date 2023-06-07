import React, { useState } from "react";
import { useCalculator } from "../context/ContextProvider";

function ProductList() {
  const [productName, setProductName] = useState("");
  const { products, setProducts } = useCalculator();

  const addProduct = () => {
    if (productName.trim() === "") return;

    setProducts((prevProducts) => [...prevProducts, productName.trim()]);
    setProductName("");
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nome do produto"
        />
        <button onClick={addProduct}>Adicionar Produto</button>
      </div>
    </div>
  );
}

export default ProductList;
