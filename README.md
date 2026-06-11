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

Latest:
Need to extract mastered and progress counter to share with cards viewed in studymode and allcards
list overview with miniflashcards
