type ProgressBarProps = {
    knownCount: number;
}

export function ProgressBar({knownCount}: ProgressBarProps){
    return (
        <>
         <div
            className="flashcard__progress-bar "
            style={{ "--value": knownCount } as React.CSSProperties}
          >
            <div className="flashcard__progress-bar-fill"></div>
          </div>
         <p className="flashcard__progress-number">
            {knownCount}/5
          </p>
          </>
    )
}