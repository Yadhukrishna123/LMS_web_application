import React from "react";

const MediaForm = ({ data, updateData }) => {
  const handleChange = (e, type) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      if (type === "images" || type === "docs") {
        updateData("media", { ...data.media, [type]: [...files] });
      } else {
        updateData("media", { ...data.media, [type]: files[0] });
      }
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">D. Media / Resources</h3>
      <div className="space-y-3">
        <input
          type="file"
          multiple
          onChange={(e) => handleChange(e, "images")}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => handleChange(e, "docs")}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => handleChange(e, "trailer")}
          className="w-full border p-2 rounded"
        />
      </div>
    </section>
  );
};

export default MediaForm;
