export function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <img src="images/logo-small.svg" alt="logo" className="header__logo" />
        <div className="tabs u-shadow">
          <button className="tab tab--active u-rounded-pill-narrow">
            Study Mode
          </button>
          <button type="button" className="tab u-rounded-pill-narrow">
            All Cards
          </button>
        </div>
      </div>
    </header>
  );
}
