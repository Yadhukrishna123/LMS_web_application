import React from "react";
const courses = [
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    tags: ["Graphic", "Design"],
    price: "$25",
    title: "How to become a good designer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit."
  },
  {
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    tags: ["Copy", "Writing"],
    price: "$27",
    title: "Let's learn about copywriting",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit."
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    tags: ["Hobby", "Sing"],
    price: "$25",
    title: "Learn how to write a song",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit."
  },
  {
    image: "https://images.unsplash.com/photo-1537432376769-00a65d3702f1",
    tags: ["UI/UX", "Coding"],
    price: "$25",
    title: "Learn about Android Coding",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit."
  }
];


const CoursesSection = () => (
  <section className="py-12 px-4 md:px-12 lg:px-24">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-semibold text-left">Explore Our Courses</h2>
      <button className="bg-purple-500 text-white rounded-full px-6 py-2 text-sm hover:bg-purple-600">
        See All Courses
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {courses.map((course, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col">
          <img src={course.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4" />
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              {course.tags.map(tag => (
                <span key={tag} className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <span className="font-bold text-gray-700 text-sm">{course.price} <span className="text-xs font-normal">/course</span></span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
          <p className="text-xs text-gray-600">{course.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CoursesSection;
