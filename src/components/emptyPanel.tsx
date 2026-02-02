export function EmptyPanel({}){
    return (
       <div className="empty-panel">
            <h2 className="empty-panel__heading">No cards to study</h2>
            <p className="empty-panel__sub-message">You don't have any cards yet. Add your first card in the All Cards tab.</p>
            <button className="btn btn-allcards u-rounded-pill u-shadow--thick" type="button">Go to All Cards</button>
        </div>
    )
}