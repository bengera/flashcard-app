// import { useState } from "react";
// // import "./App.css";

function App() {
  return (
    <header className="header">
      <div className="header__content">
        <img src="images\logo-small.svg" alt="logo" className="header__logo" />
        <div className="header__tab">
          <button className="button-tab active">Study Mode</button>
          <button className="button-tab">All Cards</button>
        </div>
      </div>
    </header>
  );
}

export default App;
