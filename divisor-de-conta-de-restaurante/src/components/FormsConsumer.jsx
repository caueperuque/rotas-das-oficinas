import React, { useState } from "react";
import Products from "../dataProducts";

const FormsConsumer = () => {
  const [customers, setCustomers] = useState([]);
  const [serviceCharge, setServiceCharge] = useState([]);

  const handleCustomerChange = (e, index) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].name = e.target.value;
    setCustomers(updatedCustomers);
  };

  const handleProductChange = (e, index, productIndex) => {
    const checkedProducts = [...customers[index].products];
    if (e.target.checked) {
      checkedProducts.push(productIndex);
    } else {
      const productIndexToRemove = checkedProducts.indexOf(productIndex);
      checkedProducts.splice(productIndexToRemove, 1);
    }

    const updatedCustomers = [...customers];
    updatedCustomers[index].products = checkedProducts;
    setCustomers(updatedCustomers);
  };

  const addCustomer = () => {
    const newCustomer = {
      name: "",
      products: [],
    };
    setCustomers([...customers, newCustomer]);
    setServiceCharge([...serviceCharge, false]);
  };

  const removeCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);

    const updatedServiceCharge = [...serviceCharge];
    updatedServiceCharge.splice(index, 1);
    setServiceCharge(updatedServiceCharge);
  };

  const calculateSharedProductTotal = (customer, sharedProducts) => {
    let sharedTotal = 0;

    sharedProducts.forEach((sharedProductIndex) => {
      const sharedProductCount = customers.filter((c) =>
        c.products.includes(sharedProductIndex)
      ).length;
      const sharedProductPrice = Products[sharedProductIndex].price / sharedProductCount;
      if (customer.products.includes(sharedProductIndex)) {
        sharedTotal += sharedProductPrice;
      }
    });

    return sharedTotal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sharedProducts = [];
    customers.forEach((customer) => {
      customer.products.forEach((productIndex) => {
        if (!sharedProducts.includes(productIndex)) {
          sharedProducts.push(productIndex);
        }
      });
    });

    const results = customers.map((customer, index) => {
      const sharedProductTotal = calculateSharedProductTotal(customer, sharedProducts);
      const individualTotal = sharedProductTotal + (serviceCharge[index] ? sharedProductTotal * 0.1 : 0);
      return { name: customer.name, total: individualTotal };
    });

    setCustomers([]);
    setServiceCharge([]);

    const total = results.reduce((sum, result) => sum + result.total, 0);

    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = `
      <h3>Resultado:</h3>
      <ul>
        ${results
          .map((result) => `<li>${result.name}: R$ ${result.total.toFixed(2)}</li>`)
          .join("")}
      </ul>
      <p>Preço Total da Conta: R$ ${total.toFixed(2)}</p>
    `;
  };

  return (
    <div>
      <h2>Divisor de Conta de Restaurante</h2>
      <form onSubmit={handleSubmit}>
        <h3>Clientes:</h3>
        {customers.map((customer, index) => (
          <div key={index}>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleCustomerChange(e, index)}
              placeholder="Nome do Cliente"
              required
            />
            <label>Produtos Consumidos:</label>
            <div>
              {Products.map((product, productIndex) => (
                <div key={productIndex}>
                  <input
                    type="checkbox"
                    id={`${index}-${productIndex}`}
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(e, index, productIndex)
                    }
                    checked={customer.products.includes(productIndex)}
                  />
                  <label htmlFor={`${index}-${productIndex}`}>
                    {product.name} (R$ {product.price.toFixed(2)})
                  </label>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => removeCustomer(index)}>
              Remover Cliente
            </button>
            <label>
              <input
                type="checkbox"
                checked={serviceCharge[index]}
                onChange={() => {
                  const updatedServiceCharge = [...serviceCharge];
                  updatedServiceCharge[index] = !serviceCharge[index];
                  setServiceCharge(updatedServiceCharge);
                }}
              />
              Incluir taxa de serviço (10%)
            </label>
          </div>
        ))}
        <button type="button" onClick={addCustomer}>
          Adicionar Cliente
        </button>
        <br />
        <br />
        <button type="submit">Calcular</button>
      </form>
      <div id="results"></div>
    </div>
  );
};

export default FormsConsumer;
