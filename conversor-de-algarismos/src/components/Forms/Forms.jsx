import { useContext } from "react";
import ContextAPI from "../../context/ContextAPI";
import './Forms.css'

export default function Forms() {
  const { types, handleChange, handleClick, change } = useContext(ContextAPI);

  return (
    <form onSubmit={handleClick} className="forms__container">
      <div className="row">
        <div className="input-field col s12 m6">
          Selecione o tipo de conversão:
          <select className="browser-default" onChange={handleChange} name="type" value={change.type}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {(change.type === 'romano') ? (
        <div className="row">
          <div className="input-field col s12 m6">
            Digite o valor da conversão:
            <input
              type="number"
              value={change.valueNumber}
              onChange={handleChange}
              name="valueNumber"
              min={1}
              max={3999}
              className="validate"
            />

          </div>
        </div>
      ) : (
        <div className="row">
          <div className="input-field col s12 m6">
            Digite o algarismo romano da conversão:
            <input
              placeholder="Digite um algarismo romano"
              type="text"
              value={change.valueNumber}
              onChange={handleChange}
              name="valueNumber"
              className="validate"
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="input-field col s12">
          <button className="waves-effect waves-light btn">Converter</button>
        </div>
      </div>
      <div className="row">
        <h6>
          Conversão foi realizada para: Algarismo {change.type.toUpperCase()}
        </h6>
        <h6>
          Com valor de: {change.valueNumber}
        </h6>
      </div>
    </form>
  );
}
