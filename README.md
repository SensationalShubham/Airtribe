
## Airtribe Course Application API

This repository provides a Node.js server with APIs for managing courses and applications on a platform like Airtribe.

### Database Design

The system uses a relational database with the following tables:

-   **Instructors:**  Stores information about instructors (ID, name, email)
-   **Courses:**  Stores details about courses (ID, name, description, max seats, start date, instructor ID - foreign key referencing Instructors)
-   **Leads:**  Captures applications for courses (ID, course ID - foreign key referencing Courses, applicant name, email, phone number, LinkedIn profile, application status)
-   **Comments:**  Allows instructors to add comments to applications (ID, lead ID - foreign key referencing Leads, instructor ID - foreign key referencing Instructors, comment content, creation timestamp)

### APIs

The server offers the following functionalities through APIs:

**1. Course Management:**

-   **Create Course (POST /courses):**  Creates a new course with details like name, description, maximum seats, start date, and instructor ID.
-   **Update Course Details (PUT /courses/:id):**  Updates an existing course's details (name, description, max seats, start date).

**2. Course Application:**

-   **Register for Course (POST /courses/:id/register):**  Allows users to apply for a course by providing their name, email, phone number, and LinkedIn profile URL.

**3. Lead Management (for Instructors):**

-   **Update Lead Status (PUT /leads/:id/status):**  Instructors can update the application status of a lead (Accepted, Rejected, Waitlisted).
-   **Search Leads (GET /leads/search):**  Instructors can search for leads by applicant name or email.
-   **Add Comment to Lead (POST /leads/:id/comments):**  Instructors can add comments to specific applications.

**Note:** Authorization mechanisms are not implemented in this basic example. You'll need to integrate them for production use.

### Running the Application

1.  Clone this repository.
2.  Install dependencies:  `npm install`
3.  Configure your database connection details in  `server.js`.
4.  Start the server:  `node server.js`  (or  `npm start`  if using a package manager script)

### Playing with the API

You can interact with the APIs using tools like Postman or curl commands. Refer to your chosen tool's documentation for creating requests.

**Example (using Postman):**

1.  Create a POST request to  `http://localhost:3000/courses`  with a body containing course details (name, description, etc.).
2.  Create a POST request to  `http://localhost:3000/courses/1/register`  (replace 1 with the actual course ID) with applicant information in the body.
3.  (Assuming you have instructor credentials) Create a PUT request to  `http://localhost:3000/leads/2/status`  (replace 2 with the lead ID) with the desired status (Accepted, Rejected, Waitlisted) in the body.