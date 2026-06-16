type ProgressBarProps = {
    knownCount: number;
    isMastered: boolean;
    variant?: "study" | "minicard"
}

export function ProgressBar({knownCount, isMastered, variant = 'study'}: ProgressBarProps){
    return (
        <>
        <div className={`flashcard__progress-container flashcard__progress-container--${variant} ${isMastered ? 'flashcard__progress-container-mastered' : ''}`}>
          {isMastered ? (<div className="flashcard__mastered-badge u-shadow">
            <img alt="mastered-icon" src="images/icon-mastered.svg"></img>
            <span>Mastered 5/5</span>
          </div>) : null}
         <div
            className="flashcard__progress-bar "
            style={{ "--value": knownCount } as React.CSSProperties}
          >
            <div className="flashcard__progress-bar-fill"></div>
          </div>
         <p className="flashcard__progress-number">
            {knownCount}/5
          </p>
          </div>
          </>
    )
}