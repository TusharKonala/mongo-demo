const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

/*
  eq (equal)
  ne (not equal)
  gt (greater than)
  gte (greater than or equal to)
  lt (less than)
  lte (less than or equal to)
  in
  nin (not in)
*/

async function getCourses() {
  const pageSize = 10;
  const pageNumber = 2;
  const result = await Course
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{ author: "Mosh" }, { isPublished: true }]) // any one must b true
    // .and([]) both must be true

    //Regex
    //starts with mosh
    // .find({ author: /^Mosh/ })

    // //ends with Hamedani
    // .find({ author: /Hamedani$/i })

    // //contains Mosh
    // .find({ author: /.*Mosh.*/i })
    .find({
      author: "Mosh",
      isPublished: true,
    })
    // pagination
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    // .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .countDocuments();
  // returns the total no. of results
  console.log(result);
}

getCourses();
