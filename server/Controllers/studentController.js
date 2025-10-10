const Batch = require("../modals/batches");
const Student = require("../modals/students");

const generateStudentId = async () => {
  const lastStudent = await Student.findOne({}).sort({ _id: -1 }); // sort by MongoDB _id descending
  if (!lastStudent || !lastStudent.studentId) return "STD001";

  const lastNum = parseInt(lastStudent.studentId.replace("STD", ""));
  const newNum = lastNum + 1;
  return "STD" + newNum.toString().padStart(3, "0");
};

// 🔹 Add student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, age, gender, profileImage, courseEnrolled, address, batch } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "Name, Email and Phone are required" });
    }

    const studentId = await generateStudentId();

    const student = await Student.create({
      studentId,
      name,
      email,
      phone,
      age,
      gender,
      profileImage,
      courseEnrolled,
      address,
      batch: batch || null,
    });

    if (batch) {
      const batchDoc = await Batch.findById(batch);
      if (batchDoc && !batchDoc.students.includes(student._id)) {
        batchDoc.students.push(student._id);
        await batchDoc.save();
      }
    }

    res.status(200).json({ success: true, message: "Student added successfully", data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllStudent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const query = search
      ? { name: { $regex: search, $options: "i" } } // search by name
      : {};

    const totalItems = await Student.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const students = await Student.find(query)
      .populate("batch", "batchName")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: students,
      page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudent = async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }
    if (student) {
      res.status(200).json({
        success: true,
        message: "student fatched successfully"
      })
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

exports.deleteStudent = async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findByIdAndDelete(id)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "student not found"
      })
    }


    res.status(201).json({
      success: true,
      message: "student deleted succesfully!"
    })
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 🔹 Assign student to a batch
exports.assignStudentToBatch = async (req, res) => {
  try {
    const { studentId, batchId } = req.body;

    if (!studentId || !batchId) {
      return res.status(400).json({ success: false, message: "Student ID and Batch ID required" });
    }

    const student = await Student.findById(studentId);
    const batch = await Batch.findById(batchId);

    if (!student || !batch) {
      return res.status(404).json({ success: false, message: "Student or Batch not found" });
    }

    student.batch = batchId;
    await student.save();

    if (!batch.students.includes(studentId)) {
      batch.students.push(studentId);
      await batch.save();
    }

    res.status(200).json({ success: true, message: "Student assigned to batch successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get students by batch

exports.getStudentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const students = await Student.find({ batch: batchId }).populate("batch", "batchName");
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
