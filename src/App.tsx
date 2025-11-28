import { useState } from "react";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function addCount() {
    setCount(count + 1);
  }

  return <button onClick={() => addCount()}>{count}</button>;
}

export default App;
