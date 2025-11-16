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
  return await Course.find({
    isPublished: true,
    tags: {
      $in: ["frontend", "backend"],
    },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
