const Quiz = require("../modals/quizes");

// Create quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title || !questions.length)
      return res.status(400).json({ success: false, message: "Title and questions required" });

    const quiz = await Quiz.create({ title, questions });
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ success: true, data: quizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, data: quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
