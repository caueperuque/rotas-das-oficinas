import React from "react";
import { useCalculator } from "../context/ContextProvider";

function Result() {
  const { customers, products } = useCalculator();

  const calculateBill = () => {
    const totalCost = products.length * 10;
    const perPersonCost = totalCost / customers.length;

    const result = customers.map((customer) => {
      let additionalCost = 0;
      if (products.some((product) => product.toLowerCase().includes(customer.toLowerCase()))) {
        additionalCost = 10;
      }

      return {
        customer,
        cost: perPersonCost + additionalCost,
      };
    });

    return result;
  };

  const bill = calculateBill();

  return (
    <div>
      <h2>Resultado</h2>
      <ul>
        {bill.map(({ customer, cost }) => (
          <li key={customer}>
            {customer}: R$ {cost.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
