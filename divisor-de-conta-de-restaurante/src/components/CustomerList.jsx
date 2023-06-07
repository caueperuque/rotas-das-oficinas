import React, { useState } from "react";
import { useCalculator } from "../context/ContextProvider";

function CustomerList() {
  const [customerName, setCustomerName] = useState("");
  const { customers, setCustomers } = useCalculator();

  const addCustomer = () => {
    if (customerName.trim() === "") return;

    setCustomers((prevCustomers) => [...prevCustomers, customerName.trim()]);
    setCustomerName("");
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>{customer}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Nome do cliente"
        />
        <button onClick={addCustomer}>Adicionar Cliente</button>
      </div>
    </div>
  );
}

export default CustomerList;
