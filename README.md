# Flashcard app 📇

Create and study flashcards

---

![App Demo](preview.gif)

## Contents

- [Why?](#why)
- [Demo](#demo)
- [Built With](#built-with)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)

---

## Why?

---

## Demo

[Live Demo](..) · [Code on GitHub](..)

---

## Built With

---

## Usage

## Features

## Learning points

- tabs choose a value, they do not flip

## Roadmap

This roadmap outlines planned improvements and milestones on the way to a complete app.

🟢 **Done**  
🟠 **In Progress**  
🔴 **Not Started**

---

..

CSS NOTES

onChange={(e) => setQuestion(e.currentTarget.value)}

- could not use variables inside CSS media queries
- Not having scss to create media queries has taken up a lot of time

<hr className="solid"></hr>

-- DOM depth
App shell – overall layout

Header – logo + mode tabs

Study area – filters + single flashcard + progress (later)

Problems:

Progress bar has a tiny 1px visual gap. Tried height: 100%, display: block, removing border-radius, checking margin. Functionally fine. Leave for now unless it becomes visually distracting later.

The form for creating new flashcards needs to reject empty fields, at the moment the
form is accepting anything even if that value is empty and using the setter function
to change the state of answer question and category inline.
I need to refactor this and create a function that will check the input, if its
empty it needs to return and not set anyuthing while also showing the error in the UI
in the field with the error message below.

1st - Create the function
2nd - Make sure they still work with the function
3rd - Create a condition for empty fields
4th - After console logs work add the UI effects

(Start Sunday or Monday morning.)
