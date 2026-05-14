export function AllCards() {
  return (
    
    <form className="card-form">
  <div className="form-group flex-group">
    <label htmlFor="question">Question</label>
    <input
      id="question"
      name="question"
      type="text"
      placeholder="e.g., What is the capital of France?"
    />
  </div>

  <div className="form-group flex-group">
    <label htmlFor="answer">Answer</label>
    <textarea
      id="answer"
      name="answer"
      placeholder="e.g., Paris"
    ></textarea>
  </div>

  <div className="form-group flex-group">
    <label htmlFor="category">Category</label>
    <input
      id="category"
      name="category"
      type="text"
      placeholder="e.g., Geography"
    />
  </div>

  <button className="btn-submit u-rounded-pill u-shadow--thick" type="submit">
     <img src="images/icon-circle-plus.svg" alt="icon-plus" />
    Create Card</button>
</form>
  );
}
