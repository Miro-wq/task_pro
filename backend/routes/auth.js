const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // s-ar putea sa nu merga la toti cu User cu U mare
const { authenticateToken } = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Server error
 */

// POST /auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user (with refresh token)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns an access token, a refresh token, and user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token (short-lived)
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token (long-lived)
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                     name:
 *                       type: string
 *                       description: User's name
 *                     email:
 *                       type: string
 *                       description: User's email
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

// POST /auth/login (cu refresh token)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // trebuie comparata  parola
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Obtain a new access token using a refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 description: The refresh token used to generate a new access token
 *     responses:
 *       200:
 *         description: Returns a new short-lived access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Newly generated access token
 *       401:
 *         description: No refresh token provided
 *       403:
 *         description: Refresh token not valid, or expired
 *       500:
 *         description: Server error
 */

// POST /auth/refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Refresh token not valid' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh token expired or invalid' });
      }

      const newAccessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      res.json({
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

// POST /auth/logout
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body; // sau cookie
  if (!refreshToken) return res.status(400).json({ message: 'No token provided' });

  try {
    // scoate token-ul din DB
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    user.refreshTokens = user.refreshTokens.filter(rt => rt !== refreshToken);
    await user.save();

    res.json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user ID
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// endpoint date utilizator
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /auth/me:
 *   put:
 *     summary: Update the authenticated user's name
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Smith"
 *                 description: The new name of the user
 *     responses:
 *       200:
 *         description: Name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Name updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user ID
 *                     name:
 *                       type: string
 *                       description: The updated name
 *                     email:
 *                       type: string
 *                       description: The user's email
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// enpoint actualizare date utilizator
// PUT /api/auth/me
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    await user.save();
    res.json({ message: 'Name updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;