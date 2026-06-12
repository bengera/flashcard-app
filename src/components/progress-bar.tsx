type ProgressBarProps = {
    knownCount: number;
}

export function ProgressBar({knownCount}: ProgressBarProps){
    return (
         <p className="flashcard__progress-number">
            {knownCount}/5
          </p>
    )
}