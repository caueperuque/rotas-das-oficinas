import { useContext } from "react";
import ContextAPI from "../../context/ContextAPI";

export default function Results() {
  const { result } = useContext(ContextAPI)
  return (
    <h4>Esse é o resultado: {result}</h4>
  )
}