const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Database connection details (replace with your actual credentials)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'airtribe_courses'
});

// Function to execute a SQL query
async function executeQuery(query, params) {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// API to create a course
app.post('/courses', async (req, res) => {
  const { name, description, max_seats, start_date, instructor_id } = req.body;
  const query = `INSERT INTO Courses (name, description, max_seats, start_date, instructor_id) VALUES (?, ?, ?, ?, ?)`;
  const results = await executeQuery(query, [name, description, max_seats, start_date, instructor_id]);
  if (results) {
    res.json({ message: 'Course created successfully!' });
  } else {
    res.status(500).json({ message: 'Failed to create course' });
  }
});

// API to update course details
app.put('/courses/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description, max_seats, start_date } = req.body;
  const query = `UPDATE Courses SET name = ?, description = ?, max_seats = ?, start_date = ? WHERE id = ?`;
  const results = await executeQuery(query, [name, description, max_seats, start_date, id]);
  if (results) {
    res.json({ message: 'Course details updated successfully!' });
  } else {
    res.status(500).json({ message: 'Failed to update course details' });
  }
});

// API for course registration (applying)

app.post('/courses/:id/register', async (req, res) => {
    const courseId = req.params.id;
    const { name, email, phone_number, linkedin_profile } = req.body;
    const query = `INSERT INTO Leads (course_id, name, email, phone_number, linkedin_profile) VALUES (?, ?, ?, ?, ?)`;
    const results = await executeQuery(query, [courseId, name, email, phone_number, linkedin_profile]);
    if (results) {
      res.json({ message: 'Application submitted successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to submit application' });
    }
  });
  
  // API to update lead status (Accept / Reject / Waitlist)
  app.put('/leads/:id/status', async (req, res) => {
    const leadId = req.params.id;
    const { status } = req.body;
    const query = `UPDATE Leads SET status = ? WHERE id = ?`;
    const results = await executeQuery(query, [status, leadId]);
    if (results) {
      res.json({ message: 'Lead status updated successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to update lead status' });
    }
  });
  
  // API to search leads by name or email
  app.get('/leads/search', async (req, res) => {
    const { searchTerm } = req.query;
    const query = `SELECT * FROM Leads WHERE name LIKE ? OR email LIKE ?`;
    const results = await executeQuery(query, [`%${searchTerm}%`, `%${searchTerm}%`]);
    if (results) {
      res.json(results);
    } else {
      res.status(500).json({ message: 'Failed to search leads' });
    }
  });
  
  // API to add comment to a lead
  app.post('/leads/:id/comments', async (req, res) => {
    const leadId = req.params.id;
    const instructorId = req.headers.authorization; // Assuming authorization header contains instructor ID
    const { comment } = req.body;
    const query = `INSERT INTO Comments (lead_id, instructor_id, comment) VALUES (?, ?, ?)`;
    const results = await executeQuery(query, [leadId, instructorId, comment]);
    if (results) {
      res.json({ message: 'Comment added successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to add comment' });
    }
  });
  
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
  