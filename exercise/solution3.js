const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log('Connecting to the database "mongo-exercises"'))
  .catch((err) => console.log(error.message));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true }).or([
    {
      price: { $gte: 15 },
    },
    { name: /.*by.*/i },
  ]);
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
