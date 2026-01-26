export function EmptyPanel({}){
    return (
        <div className="empty-panel">
            <p className="empty-panel__message">No cards to study</p>
            <p className="empty-panel__sub-message">You don't have any cards yet. Add your first card in the All Cards tab.</p>
            <button typeof="button">Go to All Cards</button>
        </div>
    )
}