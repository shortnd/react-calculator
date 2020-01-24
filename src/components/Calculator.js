import React, { Component } from "react";
import styled from "styled-components";

class Calculator extends Component {
  state = {
    value: [],
    currentValue: "0",
  }

  componentDidMount() {
    this.setState({
      value: []
    })
  }

  readValue = () => {
    const { value, currentValue } = this.state;
    return value.length ? `${value.join("")}${currentValue}` : currentValue;
  };

  updateValue = ({target: { innerText }}) => {
    const { currentValue, value } = this.state;
    this.setState({
      value: [...value, currentValue, innerText],
      currentValue: ""
    })
  };

  updateNumber = ({ target: { innerText } }) => {
    const { currentValue } = this.state;
    this.setState({
      currentValue: `${(currentValue === "0") ? "" : currentValue}${innerText}`
    })
  };

  _togglePositiveNegitive = () => {
    this.setState({
      currentValue: `${(this.state.currentValue.search("-") === -1 ) ? `-${this.state.currentValue}` : `${this.state.currentValue.slice(1)}`}`
    })
  };

  getPercentage = () => {
    const { currentValue } = this.state;
    this.setState({

    })
    console.log(currentValue / 100);
  };

  _calculate = async () => {
    await this.setState({
      value: [...this.state.value, this.state.currentValue],
      currentValue: ""
    });
    let { value } = this.state
    let total;
    for (let i = 0; i < value.length; i++) {
      console.log(value[i]);
      switch(value[i]) {
        case "+":
          total = parseFloat(total) + parseFloat(value[++i]);
          break;
        case "-":
          total = parseFloat(total) - parseFloat(value[++i]);
          break;
        case "×":
          total = (parseFloat(total) * parseFloat(value[++i]));
          break;
        case "÷":
          total = parseFloat(total) / parseFloat(value[++i]);
          break;
        case "%":
          total = total * 100 / total
          break;
        default:
          total = parseFloat(value[i]);
          break;
      }
    }
    this.setState({
      value: [],
      currentValue: [total]
    })
  };

  _clear = () => {
    this.setState({
      value: [],
      currentValue: ""
    })
  }

  render() {
    this.readValue()
    const { value } = this.state;
    return (
      <CalculatorBox>
        <h1>Calculator</h1>
        <form style={{
          flex: 1,
          display: 'flex'
        }}>
          <CalculatorInput type="text" value={this.readValue()} readOnly/>
        </form>
        <ButtonContainer>
          <button onClick={this._clear}>
            {value.length > 1 ? (
              <span>C</span>
            ) : (
              <span>AC</span>
            )}
          </button>
          <button onClick={this._togglePositiveNegitive}>
            <span>+</span>
            /
            <span>-</span>
          </button>
          <button onClick={this.getPercentage}>%</button>
          <button onClick={this.updateValue}>&divide;</button>

          <button onClick={this.updateNumber}>7</button>
          <button onClick={this.updateNumber}>8</button>
          <button onClick={this.updateNumber}>9</button>
          <button onClick={this.updateValue}>&times;</button>

          <button onClick={this.updateNumber}>4</button>
          <button onClick={this.updateNumber}>5</button>
          <button onClick={this.updateNumber}>6</button>
          <button onClick={this.updateValue}>-</button>

          <button onClick={this.updateNumber}>1</button>
          <button onClick={this.updateNumber}>2</button>
          <button onClick={this.updateNumber}>3</button>
          <button onClick={this.updateValue}>+</button>

          <button
            style={{
              gridColumn: "1 / 3"
            }}
            onClick={this.updateNumber}>0</button>
          <button onClick={this.updateNumber}>.</button>
          <button onClick={this._calculate}>=</button>
        </ButtonContainer>
      </CalculatorBox>
    )
  }
}

const CalculatorBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid #000;
  width: 450px;
  margin-top: 30px;
  margin-left: 30px;
`;

const CalculatorInput = styled.input`
  flex: 1;
  border: 0;
  border: 4px solid #000;
  margin-left: -4px;
  margin-right: -4px;
  height: 40px;
  text-align: right;
  font-size: 25px;
`;

const ButtonContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 50px);
`;

export default Calculator;

// function Calculator() {
//   const calculatorBox = styled.div`
//     border: 5px solid #000;
//   `;
//   return (
//     <>
//       <h1>Calculator</h1>
//       <calculatorBox>
//         <h2>Calculator</h2>
//       </calculatorBox>
//     </>
//   )
// }

// export default Calculator
