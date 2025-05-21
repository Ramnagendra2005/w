// app.js

// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser"); // Middleware to parse request bodies

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3001; // Change this line// Define the port the server will listen on

// Middleware setup
// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// In-memory data store for students
// In a real application, this would be a database (e.g., MongoDB, PostgreSQL)
let students = [
  { id: "1", name: "Alice Smith", age: 20, major: "Computer Science" },
  { id: "2", name: "Bob Johnson", age: 22, major: "Electrical Engineering" },
  { id: "3", name: "Charlie Brown", age: 21, major: "Mathematics" },
];

// Helper function to generate a unique ID for new students
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// --- API Endpoints for Student CRUD Operations ---

// 1. GET all students
// Endpoint: /students
app.get("/students", (req, res) => {
  console.log("GET /students - Fetching all students");
  res.status(200).json(students);
});

// 2. GET a single student by ID
// Endpoint: /students/:id
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(`GET /students/${studentId} - Fetching student by ID`);
  const student = students.find((s) => s.id === studentId);

  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// 3. POST a new student
// Endpoint: /students
// Request Body Example: { "name": "Diana Prince", "age": 23, "major": "Physics" }
app.post("/students", (req, res) => {
  const { name, age, major } = req.body;
  console.log("POST /students - Adding new student", req.body);

  // Basic validation
  if (!name || !age || !major) {
    return res
      .status(400)
      .json({ message: "Name, age, and major are required" });
  }

  const newStudent = {
    id: generateUniqueId(), // Generate a unique ID
    name,
    age,
    major,
  };

  students.push(newStudent); // Add the new student to our in-memory array
  res.status(201).json(newStudent); // Respond with the created student and 201 status
});

// 4. PUT (Update) an existing student by ID
// Endpoint: /students/:id
// Request Body Example: { "name": "Diana Prince", "age": 24, "major": "Astrophysics" }
app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { name, age, major } = req.body;
  console.log(`PUT /students/${studentId} - Updating student`, req.body);

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex !== -1) {
    // Update the student's properties
    students[studentIndex] = {
      ...students[studentIndex], // Keep existing properties
      name: name || students[studentIndex].name, // Update if provided, otherwise keep old
      age: age || students[studentIndex].age,
      major: major || students[studentIndex].major,
    };
    res.status(200).json(students[studentIndex]); // Respond with the updated student
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// 5. DELETE a student by ID
// Endpoint: /students/:id
app.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  console.log(`DELETE /students/${studentId} - Deleting student`);

  const initialLength = students.length;
  // Filter out the student to be deleted
  students = students.filter((s) => s.id !== studentId);

  if (students.length < initialLength) {
    res.status(204).send(); // Respond with 204 No Content for successful deletion
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// Basic route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Student API! Use /students to access student data.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    "To test the API, you can use tools like Postman, Insomnia, or curl."
  );
  console.log("\nAvailable Endpoints:");
  console.log("GET /students - Get all students");
  console.log("GET /students/:id - Get a student by ID");
  console.log("POST /students - Add a new student (send JSON body)");
  console.log("PUT /students/:id - Update a student by ID (send JSON body)");
  console.log("DELETE /students/:id - Delete a student by ID");
});
