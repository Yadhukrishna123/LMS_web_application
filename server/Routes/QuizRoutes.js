// routes/quizRoutes.js
const express = require("express");
// const { createQuiz, getAllQuizzes, getQuizById } = require("../Controllers/quizController");

// const { submitQuiz, getAllSubmissions } = require('../Controllers/quizUserController');
const { addQuizz, getAllQuizz } = require("../Controllers/QuizController");

const router = express.Router();

// Quiz CRUD
router.post("/create_quiz", addQuizz);
router.get("/get_all_quizz", getAllQuizz);
// router.get("/view_all_quizzes", getAllQuizzes);
// router.get("/view_quiz/:id", getQuizById);

// // Submissions
// router.post("/submit_quiz", submitQuiz);
//  router.get("/all_submissions", getAllSubmissions);

module.exports = router;
