type DropDownTypeProps = {
 cardId: string;
};



export function DropDown({cardId}: DropDownTypeProps){

    function removeCard(){
        console.log('removing card')
        console.log(cardId)
    }

    return(
        <div className="flashcard-box-dropdown">
                        <button className="flashcard-box-btn-edit">
                          <img src="images/icon-edit.svg" alt="edit button" className="flashcard-box-btn-icon" />
                          Edit
                        </button>
                        <button className="flashcard-box-btn-delete" onClick={()=> removeCard()}>
                          <img src="images/icon-delete.svg" alt="delete button" className="flashcard-box-btn-icon" />
                          Delete</button>
                      </div>
    )
}