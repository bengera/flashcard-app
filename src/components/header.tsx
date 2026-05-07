type HeaderProps = {
  studyMode: boolean;
  setStudyMode: (mode: boolean) => void; // a function that takes a param named mode
}

export function Header({ studyMode, setStudyMode }: HeaderProps) {

function changeMode(){
 setStudyMode(!studyMode);
}

  return (
    <header className="header">
      <div className="header__content">
        
        <img src="images/logo-small.svg" alt="logo" className="header__logo" />
        <p className="header__tab-title-text">Flashcard</p>
        
        <div className="tabs u-shadow">
          <button onClick={() => changeMode()} type="button" className="tab tab--active u-rounded-pill-narrow">
            Study Mode
          </button>
          <button onClick={() => changeMode()} type="button" className="tab u-rounded-pill-narrow">
            All Cards
          </button>
        </div>
      </div>
    </header>
  );
}
