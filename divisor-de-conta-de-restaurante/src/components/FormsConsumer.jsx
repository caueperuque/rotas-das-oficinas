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
    <div className="container">
      <h2 className="title">Divisor de Conta de Restaurante</h2>
      <form onSubmit={handleSubmit} className="box">
        <h3 className="subtitle">Clientes:</h3>
        {customers.map((customer, index) => (
          <div className="box" key={index}>
            <div className="field">
              <label className="label">Nome do Cliente:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={customer.name}
                  onChange={(e) => handleCustomerChange(e, index)}
                  placeholder="Nome do Cliente"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Produtos Consumidos:</label>
              <div className="control">
                {Products.map((product, productIndex) => (
                  <label className="checkbox" key={productIndex}>
                    <input
                      type="checkbox"
                      id={`${index}-${productIndex}`}
                      value={product.name}
                      onChange={(e) => handleProductChange(e, index, productIndex)}
                      checked={customer.products.includes(productIndex)}
                    />
                    {product.name} (R$ {product.price.toFixed(2)})
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox">
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
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="button"
                  className="button is-danger"
                  onClick={() => removeCustomer(index)}
                >
                  Remover Cliente
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="field">
          <div className="control">
            <button
              type="button"
              className="button is-primary"
              onClick={addCustomer}
            >
              Adicionar Cliente
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success">
              Calcular
            </button>
          </div>
        </div>
      </form>
      <div id="results"></div>
    </div>
  );
};

export default FormsConsumer;
