import React from 'react';
import { ContextProvider } from './context/ContextProvider';
import CustomerList from './components/CustomerList';
import ProductList from './components/ProductList';
import Result from './components/Result';

function App() {
  return (
    <ContextProvider>
      <CustomerList />
      <ProductList />
      <Result />
    </ContextProvider>
  );
}

export default App;
