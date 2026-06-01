 import { useState } from "react";
import type { Flashcard } from "../types/flashcard";
 
 type AllCardsProps = {
    cards: Flashcard[];
    setCards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  
   
  };

export function AllCards({setCards}: AllCardsProps) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(question, answer, category)

    const newCard : Flashcard = {
      id: crypto.randomUUID(),
      question,
      answer,
      category,
      knownCount: 0
    }

    setCards((prevCards) => [...prevCards, newCard])
    setQuestion('');
    setAnswer('');
    // blank space for cateogry to add my questions without retyping

  }

  return (
    <>
    <form className="card-form" onSubmit={handleSubmit}>
  <div className="form-group flex-group">
    <label htmlFor="question">Question</label>
    <input
      id="question"
      name="question"
      type="text"
      placeholder="e.g., What is the capital of France?"
      value={question}
      onChange={(e) => setQuestion(e.currentTarget.value)}
    />
  </div>

  <div className="form-group flex-group">
    <label htmlFor="answer">Answer</label>
    <textarea
      id="answer"
      name="answer"
      placeholder="e.g., Paris"
      value={answer}
      onChange={(e) => setAnswer(e.currentTarget.value)}
    ></textarea>
  </div>

  <div className="form-group flex-group">
    <label htmlFor="category">Category</label>
    <input
      id="category"
      name="category"
      type="text"
      placeholder="e.g., Geography"
      value={category}
      onChange={(e) => setCategory(e.currentTarget.value)}
    />
  </div>

  <button className="btn-submit u-rounded-pill u-shadow--thick" type="submit">
     <img src="images/icon-circle-plus.svg" alt="icon-plus" />
    Create Card</button>
</form>

<div className="flashcards-container">
      {/* Flashcard controls component here */}
      <div className="flashcard-controls">
        
      </div>
</div>
</>
  );
}
