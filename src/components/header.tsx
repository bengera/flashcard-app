type HeaderProps = {
  studyMode: boolean;
  setStudyMode: (mode: boolean) => void; // a function that takes a param named mode
}

export function Header({ studyMode, setStudyMode }: HeaderProps) {

// function changeMode(){
//  setStudyMode(!studyMode);
// }


  return (
    <header className="header">
      <div className="header__content">
        
        <img src="images/logo-small.svg" alt="logo" className="header__logo" />
        <p className="header__tab-title-text">Flashcard</p>
        
        <div className="tabs u-shadow">
          <button onClick={() => setStudyMode(true)} type="button" className={`tab u-rounded-pill-narrow ${studyMode ? 'tab--active' : ''}`}>
            Study Mode
          </button>
          <button onClick={() => setStudyMode(false)} type="button" className={`tab u-rounded-pill-narrow ${studyMode ? '' : 'tab--active'}`}>
            All Cards
          </button>
        </div>
      </div>
    </header>
  );
}
