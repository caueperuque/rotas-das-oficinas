import ContextAPI from "./ContextAPI";
import { useState } from "react";

export default function ContextProvider({ children }) {
  const types = ['romano', 'indiano'];
  const [change, setChange] = useState({
    type: 'romano',
    valueNumber: '1'
  });
  const [result, setResult] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (change.type === 'romano') {
      const romanNumeral = convertToRoman(parseInt(change.valueNumber, 10));
      setResult(romanNumeral);
    } else if (change.type === 'indiano') {
      const indianNumeral = convertToDecimal(change.valueNumber);
      if (indianNumeral > 3999) {
        setResult('Valor máximo excedido, maior algarismo que pode ser digitado é MMMCMXCIX');
      } else {
        setResult(indianNumeral);
      }
    }
  };
  

  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  const convertToRoman = (value) => {
    let result = '';
    romanNumerals.map((numeral) => {
      while (value >= numeral.value) {
        result += numeral.numeral;
        value -= numeral.value;
      }
      return numeral;
    });
    return result;
  };


  const convertToDecimal = (value) => {
    const romanNumeral = value.toUpperCase();
    
    let prevSymbol = null;
    let consecutiveCount = 0;
    
    const result = [...romanNumeral].reduceRight((acc, currentSymbol) => {
      const currentSymbolValue = romanNumerals.find(
        (numeral) => numeral.numeral === currentSymbol
      )?.value;
    
      if (currentSymbolValue) {
        if (prevSymbol && currentSymbolValue < romanNumerals.find((numeral) => numeral.numeral === prevSymbol)?.value) {
          acc -= currentSymbolValue;
        } else {
          acc += currentSymbolValue;
    
          if (prevSymbol && currentSymbol === prevSymbol) {
            consecutiveCount++;
            if (consecutiveCount > 3) {
              return 'Algarismo romano inválido';
            }
          } else {
            consecutiveCount = 1;
          }
        }
    
        prevSymbol = currentSymbol;
      }
    
      return acc;
    }, 0);
    
    return result;
  };
  
  
  

  return (
    <ContextAPI.Provider value={{ types, result, handleChange, change, handleClick }}>
      {children}
    </ContextAPI.Provider>
  );
}
