import React, { useState } from "react";

const CurriculumForm = ({ data, updateData }) => {
  const [newModule, setNewModule] = useState({ name: "", lessons: [] });
  const [newLesson, setNewLesson] = useState({
    title: "",
    type: "Video",
    resource: "",
    duration: "",
    accessType: "Paid",
  });

  const addModule = () => {
    if (!newModule.name) return;
    updateData("modules", [...data.modules, newModule]);
    setNewModule({ name: "", lessons: [] });
  };

  const addLesson = (i) => {
    const modulesCopy = [...data.modules];
    modulesCopy[i].lessons.push(newLesson);
    updateData("modules", modulesCopy);
    setNewLesson({
      title: "",
      type: "Video",
      resource: "",
      duration: "",
      accessType: "Paid",
    });
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">B. Curriculum / Syllabus</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Module Name"
          value={newModule.name}
          onChange={(e) =>
            setNewModule({ ...newModule, name: e.target.value })
          }
          className="border p-2 rounded flex-grow"
        />
        <button
          type="button"
          onClick={addModule}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add Module
        </button>
      </div>

      {data.modules.map((m, i) => (
        <div key={i} className="border rounded p-3 my-2">
          <h4 className="font-semibold">{m.name}</h4>
          {m.lessons.map((l, j) => (
            <p key={j} className="ml-4 text-sm">
              • {l.title} ({l.type})
            </p>
          ))}

          {/* Add Lesson */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Lesson Title"
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
              className="border p-2 rounded flex-grow"
            />
            <select
              value={newLesson.type}
              onChange={(e) =>
                setNewLesson({ ...newLesson, type: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option>Video</option>
              <option>Document</option>
              <option>Live</option>
              <option>Quiz</option>
            </select>
            <button
              type="button"
              onClick={() => addLesson(i)}
              className="bg-green-500 text-white px-3 rounded"
            >
              Add Lesson
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CurriculumForm;
