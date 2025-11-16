const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  // _id: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 1000);
        });
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // , match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["mobile", "web", "network"],
    lowercase: true,
    // uppercase: true,
    // trim: true,
  },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Mosh",
    tags: ["frontend"],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

createCourse();

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

// getCourses();

async function updateCourse(id) {
  // const course = await Course.findById(id);
  // if (!course) return;
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });
  // const result = await course.save();
  // console.log(result);

  // const result = await Course.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: "Tushar",
  //       isPublished: false,
  //     },
  //   }
  // );
  // console.log(result);

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Tushar",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

// updateCourse("5a68fde3f09ad7646ddec17e");

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// deleteCourse("5a68fde3f09ad7646ddec17e");
