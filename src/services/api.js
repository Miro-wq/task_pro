import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Authentication
 *     description: Permite utilizatorului să se autentifice folosind email și parolă, returnând un token JWT și informații despre utilizator.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresa de email a utilizatorului.
 *               password:
 *                 type: string
 *                 description: Parola utilizatorului.
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: "user@example.com"
 *               password: "parola123"
 *     responses:
 *       200:
 *         description: Autentificare reușită, returnând token-ul de acces și datele utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token-ul JWT de acces.
 *                 user:
 *                   type: object
 *                   description: Informațiile despre utilizator.
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *             example:
 *               token: "jwt-token-string"
 *               user:
 *                 id: "612e3b5d8f0c8b0012345677"
 *                 email: "user@example.com"
 *       400:
 *         description: Cerere invalidă sau credențiale incorecte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */


// login
export const loginUser = async (email, password) => {
  return API.post("/auth/login", { email, password });
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creează un cont nou pentru utilizator, primind numele, email-ul și parola.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Numele utilizatorului.
 *               email:
 *                 type: string
 *                 description: Adresa de email a utilizatorului.
 *               password:
 *                 type: string
 *                 description: Parola pentru contul utilizatorului.
 *             required:
 *               - name
 *               - email
 *               - password
 *             example:
 *               name: "Utilizator Nou"
 *               email: "nou@example.com"
 *               password: "parolaSecreta"
 *     responses:
 *       201:
 *         description: Utilizatorul a fost creat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *             example:
 *               message: "User registered successfully"
 *               user:
 *                 id: "612e3b5d8f0c8b0012345678"
 *                 name: "Utilizator Nou"
 *                 email: "nou@example.com"
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// register
export const registerUser = async (name, email, password) => {
  return API.post("/auth/register", { name, email, password });
};

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Returnează informațiile profilului pentru utilizatorul autentificat, folosind token-ul JWT.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profilul utilizatorului a fost obținut cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID-ul utilizatorului.
 *                 name:
 *                   type: string
 *                   description: Numele utilizatorului.
 *                 email:
 *                   type: string
 *                   description: Email-ul utilizatorului.
 *             example:
 *               id: "612e3b5d8f0c8b0012345677"
 *               name: "Utilizator"
 *               email: "user@example.com"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// get user profile
export const getUserProfile = async (token) => {
  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * @swagger
 * /boards/create:
 *   post:
 *     summary: Create a new board
 *     description: Creează un board nou folosind datele furnizate. Cererea trebuie să conțină un token JWT valid în header-ul Authorization.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Numele board-ului.
 *               icon:
 *                 type: string
 *                 description: Icon-ul board-ului.
 *               background:
 *                 type: string
 *                 description: Imaginea de fundal a board-ului.
 *             required:
 *               - name
 *             example:
 *               name: "Board nou"
 *               icon: "icon.png"
 *               background: "background.jpg"
 *     responses:
 *       201:
 *         description: Board-ul a fost creat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid board data"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// board nou
export const createBoard = async (token, boardData) => {
  return API.post("/boards/create", boardData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all user boards
 *     description: Returnează toate board-urile asociate cu utilizatorul autentificat.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de board-uri a utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// get la toate boardurile userului
export const getBoards = async (token) => {
  return API.get("/boards", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * @swagger
 * /boards/{boardId}:
 *   delete:
 *     summary: Delete a board
 *     description: Șterge board-ul specificat, asigurându-se că board-ul aparține utilizatorului autentificat.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului care se dorește a fi șters.
 *     responses:
 *       200:
 *         description: Board-ul a fost șters cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board deleted successfully"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Board-ul nu a fost găsit sau nu aparține utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// sterge board
export const deleteBoard = async (token, boardId) => {
  return API.delete(`/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * @swagger
 * /boards/{boardId}:
 *   put:
 *     summary: Update board
 *     description: Actualizează board-ul specificat pe baza datelor furnizate în request body. Utilizatorul trebuie să fie autentificat.
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului care se dorește a fi actualizat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Noul nume al board-ului.
 *               icon:
 *                 type: string
 *                 description: Noua iconiță a board-ului.
 *               background:
 *                 type: string
 *                 description: Noua imagine de fundal a board-ului.
 *             example:
 *               name: "Board actualizat"
 *               icon: "new-icon.png"
 *               background: "new-background.jpg"
 *     responses:
 *       200:
 *         description: Board-ul a fost actualizat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board updated successfully"
 *                 board:
 *                   $ref: '#/components/schemas/Board'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid board data"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Board-ul nu a fost găsit sau nu aparține utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// update board
export const updateBoard = async (token, boardId, updateData) => {
  return API.put(`/boards/${boardId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /columns/{columnId}/tasks:
 *   get:
 *     summary: Get tasks from a column
 *     description: Returnează toate task-urile asociate coloanei specificate.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei.
 *     responses:
 *       200:
 *         description: Lista de task-uri.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Coloana nu a fost găsită.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// endpoint taskuri
export const getTasks = (token, columnId) => {
  return API.get(`/columns/${columnId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /columns/{columnId}/tasks:
 *   post:
 *     summary: Create a new task in a column
 *     description: Creează un task nou în coloana specificată folosind datele furnizate în request body.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei în care se adaugă task-ul.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul task-ului.
 *               description:
 *                 type: string
 *                 description: Descrierea task-ului.
 *             required:
 *               - title
 *             example:
 *               title: "Task nou"
 *               description: "Descrierea task-ului nou"
 *     responses:
 *       201:
 *         description: Task-ul a fost creat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const createTask = (token, columnId, taskData) => {
  return API.post(`/columns/${columnId}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /columns/{columnId}/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Actualizează datele unui task existent din coloana specificată folosind datele furnizate în request body. Actualizarea se efectuează doar dacă task-ul aparține utilizatorului autentificat.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei din care face parte task-ul.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului de actualizat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titlul task-ului.
 *               description:
 *                 type: string
 *                 description: Descrierea task-ului.
 *             example:
 *               title: "Task actualizat"
 *               description: "Descriere actualizată a task-ului"
 *     responses:
 *       200:
 *         description: Task-ul a fost actualizat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Task-ul nu a fost găsit sau nu aparține utilizatorului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const updateTask = (token, columnId, taskId, taskData) => {
  return API.put(`/columns/${columnId}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /columns/{columnId}/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Șterge task-ul specificat din coloana indicată, doar dacă task-ul aparține utilizatorului autentificat.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei din care se dorește ștergerea task-ului.
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului care se dorește a fi șters.
 *     responses:
 *       200:
 *         description: Task-ul a fost șters cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Task-ul nu a fost găsit sau nu aparține coloanei.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const deleteTask = (token, columnId, taskId) => {
  return API.delete(`/columns/${columnId}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /tasks/{taskId}/move:
 *   put:
 *     summary: Move a task to another column
 *     description: Mută task-ul specificat la o altă coloană, utilizând datele furnizate în request body.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul task-ului care se dorește a fi mutat.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columnId:
 *                 type: string
 *                 description: ID-ul noii coloane în care task-ul va fi mutat.
 *             example:
 *               columnId: "612e3b5d8f0c8b0012345689"
 *     responses:
 *       200:
 *         description: Task-ul a fost mutat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task moved successfully"
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Cerere invalidă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Task-ul nu a fost găsit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const moveTask = (token, taskId, newColumnId) => {
  return API.put(
    `/tasks/${taskId}/move`,
    { columnId: newColumnId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * @swagger
 * /boards/{boardId}/columns:
 *   get:
 *     summary: Get the columns of a board
 *     description: Returnează toate coloanele asociate board-ului specificat.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *     responses:
 *       200:
 *         description: Lista de coloane.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Column'
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Board-ul nu a fost găsit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board not found"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// endpoint coloane
export const getColumns = (token, boardId) => {
  return API.get(`/boards/${boardId}/columns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /boards/{boardId}/columns:
 *   post:
 *     summary: Create a new column for a board
 *     description: Creează o coloană nouă în board-ul specificat folosind datele furnizate în request body.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului în care se creează coloana.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Numele coloanei.
 *             example:
 *               name: "Noua coloană"
 *     responses:
 *       201:
 *         description: Coloana a fost creată cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Column'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const createColumn = (token, boardId, columnData) => {
  return API.post(`/boards/${boardId}/columns`, columnData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /boards/{boardId}/columns/{columnId}:
 *   put:
 *     summary: Update a column
 *     description: Actualizează datele unei coloane specifice din board-ul indicat folosind datele furnizate în request body.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei care se dorește actualizată.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Noul nume al coloanei.
 *             example:
 *               name: "Coloană actualizată"
 *     responses:
 *       200:
 *         description: Coloana a fost actualizată cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column updated successfully"
 *                 column:
 *                   $ref: '#/components/schemas/Column'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Coloana nu a fost găsită sau nu aparține board-ului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const updateColumn = (token, boardId, columnId, columnData) => {
  return API.put(`/boards/${boardId}/columns/${columnId}`, columnData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /boards/{boardId}/columns/{columnId}:
 *   delete:
 *     summary: Delete a column
 *     description: Șterge coloana specificată din board-ul indicat, doar dacă aceasta aparține utilizatorului autentificat.
 *     tags:
 *       - Columns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul board-ului.
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID-ul coloanei care se dorește a fi ștearsă.
 *     responses:
 *       200:
 *         description: Coloana a fost ștearsă cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column deleted successfully"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Coloana nu a fost găsită sau nu aparține board-ului.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column not found or not yours"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

export const deleteColumn = async (token, boardId, columnId) => {
  return API.delete(`/boards/${boardId}/columns/${columnId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * @swagger
 * /auth/me:
 *   put:
 *     summary: Update username
 *     description: Actualizează numele profilului utilizatorului autenticat.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Noul nume al utilizatorului.
 *             required:
 *               - name
 *             example:
 *               name: "Nume Nou"
 *     responses:
 *       200:
 *         description: Numele utilizatorului a fost actualizat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User name updated successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Cerere invalidă sau date lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: Neautorizat - token invalid sau lipsă.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Eroare de server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// update user name
export const updateUserName = async (token, newName) => {
  return API.put(
    "/auth/me",
    { name: newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// interceptor Axios pentru refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // trebuie sa primeasca 401 (unauthorized) din server (middleware/auth.js "res.sendStatus(401)")
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      // apel /auth/refresh
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {
            refreshToken,
          }
        );
        localStorage.setItem("token", data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // reface alta cerere cu tokenul nou
        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
