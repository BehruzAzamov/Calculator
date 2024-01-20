import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: '#f2f2f2',
  buttonColor: '#000000',
};

const darkTheme = {
  background: '#333333',
  text: '#ffffff',
  buttonBackground: '#666666',
  buttonColor: '#ffffff',
};

const customTheme = {
  background: '#ffcc00',
  text: '#000000',
  buttonBackground: '#ff9900',
  buttonColor: '#ffffff',
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.background};
`;

const CalculatorWrapper = styled.div`
  width: 400px;
  background-color: #d0d0d0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  padding: 20px;
  margin: 10px;
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonColor};
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.theme === darkTheme ? '#555555' : '#e5e5e5')};
  }
`;

const Display = styled.input`
  width: calc(100% - 40px);
  padding: 20px;
  margin: 10px;
  border: none;
  font-size: 24px;
`;

const ModeButton = styled.button`
  margin-bottom: 10px;
  width: 63px;
  height: 30px;
  border-radius: 15px;
  position: relative;
  background-color: #ccc;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: ${props => {
      if (props.theme === lightTheme) {
        return '3px';
      } else if (props.theme === darkTheme) {
        return '23px';
      } else if (props.theme === customTheme) {
        return '43px';
      }
    }};
    width: 14px;
    height: 25px;
    border-radius: 7px;
    background-color: #fff;
    transition: left 0.3s;
  }
`;

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [theme, setTheme] = useState('light');

  const handleButtonClick = value => {
    setDisplayValue(displayValue + value);
  };

  const calculateResult = () => {
    try {
      setDisplayValue(eval(displayValue).toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('');
  };

  const toggleMode = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('custom');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <CalculatorWrapper>
          <Display type="text" value={displayValue} readOnly />
          <Row>
            <Button onClick={() => handleButtonClick('7')}>7</Button>
            <Button onClick={() => handleButtonClick('8')}>8</Button>
            <Button onClick={() => handleButtonClick('9')}>9</Button>
            <Button onClick={() => handleButtonClick('+')}>+</Button>
          </Row>
          <Row>
            <Button onClick={() => handleButtonClick('4')}>4</Button>
            <Button onClick={() => handleButtonClick('5')}>5</Button>
            <Button onClick={() => handleButtonClick('6')}>6</Button>
            <Button onClick={() => handleButtonClick('-')}>-</Button>
          </Row>
          <Row>
            <Button onClick={() => handleButtonClick('1')}>1</Button>
            <Button onClick={() => handleButtonClick('2')}>2</Button>
            <Button onClick={() => handleButtonClick('3')}>3</Button>
            <Button onClick={() => handleButtonClick('*')}>*</Button>
          </Row>
          <Row>
            <Button onClick={() => handleButtonClick('0')}>0</Button>
            <Button onClick={() => handleButtonClick('.')}>.</Button>
            <Button onClick={calculateResult}>=</Button>
            <Button onClick={() => handleButtonClick('/')}>/</Button>
          </Row>
          <ModeButton onClick={toggleMode} />
        </CalculatorWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default Calculator;