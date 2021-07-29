import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = (props) => {
  const { good, bad, netural } = props;

  if (good === 0 && bad === 0 && netural === 0) {
    return <p>No feedback given yet.</p>;
  }

  const calculateAverage = (good, netural, bad) => {
    return (-1 * bad + good) / (good + netural + bad);
  };

  const calculatePositive = (good, netural, bad) => {
    return good / (good + netural + bad);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Netural" value={netural} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={good + netural + bad} />
        <StatisticLine
          text="Average"
          value={calculateAverage(good, netural, bad)}
        />
        <StatisticLine
          text="Positive"
          value={calculatePositive(good, netural, bad)}
        />
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [netural, setNeutral] = useState(0);

  const handleClick = (stateVariable, newStateSetter) => {
    return () => {
      newStateSetter(stateVariable + 1);
    };
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button text="good" onClick={handleClick(good, setGood)} />
      <Button text="neutral" onClick={handleClick(netural, setNeutral)} />
      <Button text="bad" onClick={handleClick(bad, setBad)} />

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} netural={netural} />
    </div>
  );
};

export default App;
