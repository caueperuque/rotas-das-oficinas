import ContextAPI from "./ContextAPI";
import { useContext, useState } from "react";

export function useCalculator() {
  return useContext(ContextAPI);
}

export function ContextProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <ContextAPI.Provider
      value={{
        customers,
        setCustomers,
        products,
        setProducts,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
}