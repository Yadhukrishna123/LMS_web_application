// routes/quizRoutes.js
const express = require("express");
// const { createQuiz, getAllQuizzes, getQuizById } = require("../Controllers/quizController");

// const { submitQuiz, getAllSubmissions } = require('../Controllers/quizUserController');
const { addQuizz, getAllQuizz, userSubmitAnswer, getAllSubmittedQuizz } = require("../Controllers/QuizController");

const router = express.Router();

// Quiz CRUD
router.post("/create_quiz", addQuizz);
router.get("/get_all_quizz", getAllQuizz);
router.post("/send_quiz_result", userSubmitAnswer);
router.get("/get_all_user_quiz_answer", getAllSubmittedQuizz);
// router.get("/view_all_quizzes", getAllQuizzes);
// router.get("/view_quiz/:id", getQuizById);

// // Submissions
// router.post("/submit_quiz", submitQuiz);
//  router.get("/all_submissions", getAllSubmissions);

module.exports = router;
