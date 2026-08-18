# Flashcard App 📇

Create and study flashcards.

---

## What the app does

The Flashcard App allows users to create and study flashcards related to different topics. If the user knows the answer to a question, they can click the **"I know this"** button. After marking a card as known five times, the card is marked as **mastered**.

Users can create their own questions and answers, organise them by category, and edit or delete cards when needed.

---

## Demo

## [Live Demo](https://flashcard-learning-app.netlify.app/)

## Built With

- React
- TypeScript
- CSS
- Vite
- Local Storage

---

## Features

- Create, edit and delete flashcards
- Study mode
- Track card mastery
- Filter cards by category
- Hide mastered cards
- Shuffle cards
- Form validation
- Show more / less cards
- Persist data with local storage

---

## Learning Points

### 1. **Reusable Components and Variants**

Reusable components can accept `variant` props when they need different visual versions.

```typescript
type ProgressBarVariant = "default" | "mini";
```

I added this because the progress bar towards mastery for each flashcard looks visually different in study mode compared to all cards mode.

The progress bar for each card should stay in sync for each card but needs different styling depending on where it is displayed.

---

### 2. **Category Filtering**

This ensures that the **All** button will be checked if no categories are selected.

```typescript
checked={selectedCategories.length === 0}
```

Each category checkbox is checked when `selectedCategories` is not empty and the category currently being rendered exists inside the `selectedCategories` array.

```typescript
<div className="category-item" key={item}>
  <input
    type="checkbox"
    className="category-dropdown__checkbox"
    onChange={(e) => filterCategories(item, e.target.checked)}
    checked={
      selectedCategories.length !== 0 &&
      selectedCategories.includes(item)
    }
  />

  <p className="category-item__description">{item}</p>
  <p className="category-item__number">({count})</p>
</div>
```

If the checkbox is checked, the selected categories are updated using the previous state plus the new category.

Otherwise, that category is filtered out of the array when the checkbox is unchecked.

```typescript
function filterCategories(category: string, checked: boolean) {
  setSelectedCategories((prev) => {
    if (checked) {
      return [...prev, category];
    } else {
      return prev.filter((item) => item !== category);
    }
  });
}
```

---

### 3. **useRef**

useRef is used to detect clicks outside the category dropdown.
By giving the dropdown a reference that is stored in catDropDown.current.
the useEffect hook listens for mouse clicks and if the element clicked is not contained inside the dropdown we set the dropdown state to false.

```typescript
<div ref={catDropDown}>
```

useEffect hook to detect clicks

```typescript
useEffect(() => {
  function handlePageClick(e: MouseEvent){
    if (
      catDropDown.current && !catDropDown.current.contains(e.target as Node)
    ) {
      setShowCategories(false)
    }

  }

  document.addEventListener("mousedown", handlePageClick);
```
