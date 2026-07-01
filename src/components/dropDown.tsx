type DropDownProps ={
    cardId: string;
    onDelete: (cardId: string) => void;
    onEdit: (cardId: string) => void;
}

export function DropDown({cardId, onDelete, onEdit}: DropDownProps) {

     return(

        <div className="flashcard-box-dropdown">
                        <button className="flashcard-box-btn-edit" onClick={()=> onEdit(cardId)}>
                          <img src="images/icon-edit.svg" alt="edit button" className="flashcard-box-btn-icon" />
                          Edit
                        </button>
                        <button className="flashcard-box-btn-delete" onClick={()=> onDelete(cardId)}>
                          <img src="images/icon-delete.svg" alt="delete button" className="flashcard-box-btn-icon" />
                          Delete</button>
                      </div>
    )
}