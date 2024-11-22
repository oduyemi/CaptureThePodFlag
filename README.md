# **CTF Challenge Portal Documentation**

## **Overview**

The CTF Challenge Portal is an interactive platform for participants to solve challenges and compete on a leaderboard. This application includes:
1. A list of challenges across two levels.
2. Validation and scoring of submissions.
3. A dynamic leaderboard to track top participants.

This document outlines the structure, functionality, and usage of the application.

---

## **File Structure**
```
root/
├── src/
│   ├── challenges/
│   │   ├── challenges.json           # Challenge metadata
│   │   ├── decodeCoordinates.json    # Level 1 challenge data
│   │   ├── cityConnections.json      # Level 2 challenge data
│   │   ├── decodeCoordinates.js      # Level 1 validation logic
│   │   ├── cityConnections.js        # Level 2 validation logic
├── server.js                          # Main server file
├── index.html                         # Frontend interface
```

---

## **Frontend**
The user interface for the portal is defined in `index.html` and styled using CSS within the `<style>` tag.

### **Key Features**
1. **Challenge Display**:
   - Each challenge is displayed as a card with a description and an input box for solutions.
   - Submit buttons trigger the backend validation process.

2. **Leaderboard**:
   - Displays the usernames and scores of participants.
   - Updates dynamically as participants complete challenges.

3. **Interactive Design**:
   - Buttons, cards, and headers have hover effects.
   - Smooth animations enhance user experience.

---

## **Backend**

The backend is built using **Node.js** and the **Express framework**.

### **Endpoints**

#### 1. **GET /challenges**
Fetches all challenges and their metadata from `challenges.json`.

- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Decode Coordinates",
      "level": 1,
      "file": "decodeCoordinates.json"
    },
    {
      "id": 2,
      "name": "City Connections",
      "level": 2,
      "file": "cityConnections.json"
    }
  ]
  ```

---

#### 2. **GET /challenge/:level/:name**
Fetches challenge data by level and name.

- **Parameters**:
  - `level`: Challenge level (e.g., `1`).
  - `name`: Challenge name (e.g., `decodeCoordinates`).

- **Response**:
  Returns the corresponding JSON data for the challenge.

---

#### 3. **POST /validate/:name**
Validates a submission for a specific challenge.

- **Parameters**:
  - `name`: Challenge name (e.g., `decodeCoordinates`).

- **Body**:
  ```json
  {
    "submission": "<user-submitted solution>"
  }
  ```

- **Response**:
  - `200`: Success message if the solution is correct.
  - `400/404`: Error messages for invalid solutions or missing files.

---

#### 4. **GET /leaderboard**
Fetches the current leaderboard.

- **Response**:
  ```json
  [
    { "username": "Yemi", "score": 2 },
    { "username": "Damien", "score": 1 }
  ]
  ```

---

#### 5. **POST /leaderboard**
Updates the leaderboard with a new score.

- **Body**:
  ```json
  {
    "username": "Yemi",
    "score": 2
  }
  ```

---

## **Frontend-Backend Integration**

### **Submitting a Solution**
1. User enters a solution in the input box and clicks **Submit**.
2. The client sends a POST request to `/validate/:name` with the solution.
3. The backend validates the solution using the corresponding `.js` file.
4. If valid, the client prompts the user to enter their username.
5. The username and score are sent to the `/leaderboard` endpoint to update the leaderboard.

---

## **How to Run the Application**

### **Backend Setup**
1. Install dependencies:
   ```bash
   npm install express fs
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. The server will run on `http://localhost:3000`.

---

### **Frontend Access**
1. Open `index.html` in any modern web browser.
2. Interact with the challenges and view the leaderboard.

---

## **Customization**

### **Adding a New Challenge**
1. Create a `.json` file for the new challenge in `src/challenges/`.
2. Create a `.js` file for the challenge validation logic in the same directory.
3. Update `challenges.json` with the new challenge metadata:
   ```json
   {
     "id": 3,
     "name": "New Challenge Name",
     "level": 3,
     "file": "newChallenge.json"
   }
   ```
4. Restart the server.

---

### **Styling Adjustments**
Modify the CSS in the `<style>` tag of `index.html` to change the appearance of the portal. For example:
- To change the header background color:
  ```css
  header {
    background: #4CAF50; /* Replace with desired color */
  }
  ```
