# Node.js Snippets Extension

A comprehensive VS Code extension for Node.js and Express.js development that provides code snippets and project structure generation to accelerate your backend development workflow.

## Features

### 🚀 Project Structure Generator

Automatically create a complete Node.js API project structure with a single command.

**Command:** `Create Node.js API Structure`

Creates the following folder structure:
```
project-root/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── package.json
```

### 📦 Code Snippets

#### Express Server & App Snippets

**`exps` - Express Server Boilerplate**

Creates a complete Express server with basic configuration.

```javascript
import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**`apa` - API Handler with Async/Await**

Quick async route handler with method selection (supports GET, POST, PUT, DELETE, PATCH, etc.)

```javascript
app.get('/api', async(req, res) => {
  // Your code here
  return res.json({message: 'data got successfully'})
})
```

**`apat` - API Handler with Try-Catch**

Async route handler with comprehensive error handling.

```javascript
app.get('/api', async(req, res) => {
  try {
    // Your code here
    return res.json({message: 'data got successfully'});
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
```

#### Controller Snippets

**`asynctrl` - Async Controller**

Async controller function with try-catch error handling, ready for database operations.

```javascript
export const controllerName = async (req, res) => {
  try {
    // Your logic here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
```

#### Router Snippets

**`route` - Express Router Boilerplate**

Basic router setup with import/export.

```javascript
import express from 'express';
const router = express.Router();

router.get('/', controller);

export default router;
```

**`router` - Complete Router Boilerplate**

Full router template ready for multiple routes.

```javascript
import express from 'express';
const router = express.Router();

// Your routes here

export default router;
```

**`rget` - GET Route Handler**

Complete GET route with async/await and standardized error handling.

```javascript
router.get('/', async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({
      success: true,
      message: 'Success'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`rpost` - POST Route Handler**

POST route with request body extraction and validation placeholders.

```javascript
router.post('/', async (req, res) => {
  try {
    const { field } = req.body;
    // Your logic here
    res.status(201).json({
      success: true,
      message: 'Created'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`rput` - PUT Route Handler**

PUT route with URL params handling for update operations.

```javascript
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Your logic here
    res.status(200).json({
      success: true,
      message: 'Updated'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`rdel` - DELETE Route Handler**

DELETE route with ID parameter extraction.

```javascript
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Your logic here
    res.status(200).json({
      success: true,
      message: 'Deleted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`crudroutes` - CRUD Routes Mapping**

Complete set of CRUD route mappings linked to controller functions.

```javascript
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
```

**`rjwt` - Protected Route (JWT)**

JWT authenticated route template with middleware integration.

```javascript
router.get('/', protect, async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({
      success: true,
      message: 'Authorized'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`rrole` - Role-Based Route**

Role-based access control route with authorization middleware.

```javascript
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({
      success: true,
      message: 'Access granted'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

**`rval` - Validated Route**

Route with validation middleware for request validation.

```javascript
router.post('/', validate, async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
```

#### Model Snippets

**`exmd` - Export Mongoose Model**

Mongoose schema and model boilerplate ready for database schema definition.

```javascript
import { Schema, model } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('User', userSchema);
```

#### Middleware Snippets

**`mdw` - Middleware Boilerplate**

Standard middleware function with error handling and next() call.

```javascript
export middleware = (req, res, next) => {
  try {
    // middleware logic
    console.log('Middleware executed');
    
    next(); // move to next middleware / route
  } catch (error) {
    next(error); // forward error to error handler
  }
};
```

**`mdwv` - JWT Verification Middleware**

Complete JWT authentication middleware with Bearer token extraction and verification.

```javascript
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, token missing'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'supersecretkey'
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token invalid'
    });
  }
};
```

**`sjwt` - Sign JWT Token**

JWT token signing function with configurable expiration and secret.

```javascript
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = '1d';

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};
```

#### Utility Snippets

**`cl` - Console Log**

Quick console.log with customizable method (supports log, error, warn, etc.)

```javascript
console.log(Hello);
```

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Node.js Snippets"
4. Click Install

## Usage

### Creating Project Structure

1. Open a folder in VS Code
2. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
3. Type "Create Node.js API Structure"
4. Press Enter

Your project structure will be created instantly with a basic `app.js` and `package.json` file!

### Using Snippets

1. Create a new `.js` file
2. Start typing a snippet prefix (e.g., `exps`, `rget`, `asynctrl`)
3. Press Tab or Enter to expand the snippet
4. Fill in the placeholders (use Tab to navigate between them)

### Example Workflow

**Step 1:** Create Express Server
```javascript
// Type 'exps' and press Tab
```

**Step 2:** Create Router File
```javascript
// Type 'router' and press Tab
// Then add routes with 'rget', 'rpost', etc.
```

**Step 3:** Create Controller
```javascript
// Type 'asynctrl' and press Tab
```

**Step 4:** Add Authentication
```javascript
// Type 'mdwv' for JWT middleware
// Type 'sjwt' for token signing function
```

## Snippet Reference Table

| Prefix | Description | Category |
|--------|-------------|----------|
| `exps` | Express server setup | Server |
| `apa` | Async API handler | Server |
| `apat` | Async API handler with try-catch | Server |
| `asynctrl` | Async controller | Controller |
| `route` | Express router | Router |
| `router` | Router boilerplate | Router |
| `rget` | GET route | Router |
| `rpost` | POST route | Router |
| `rput` | PUT route | Router |
| `rdel` | DELETE route | Router |
| `crudroutes` | Complete CRUD routes | Router |
| `rjwt` | JWT protected route | Router |
| `rrole` | Role-based route | Router |
| `rval` | Validated route | Router |
| `exmd` | Mongoose model | Model |
| `mdw` | Middleware | Middleware |
| `mdwv` | JWT verification middleware | Middleware |
| `sjwt` | Sign JWT token | Middleware |
| `cl` | Console log | Utility |

## Best Practices

- Use `asynctrl` for controller functions to maintain consistent error handling
- Always use try-catch blocks in async functions (`apat`, route handlers)
- Utilize `crudroutes` for standard RESTful API endpoints
- Implement JWT middleware (`mdwv`) for protected routes
- Organize your code following the generated folder structure
- Use environment variables for sensitive data like JWT secrets

## Complete Example

Here's how to build a complete authenticated API using these snippets:

```javascript
// app.js (using 'exps')
import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes/userRoutes.js (using 'router', 'rget', 'rpost', 'rjwt')
import express from 'express';
import { getUsers, createUser, getProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/profile', protect, getProfile);

export default router;

// controllers/userController.js (using 'asynctrl')
export const getUsers = async (req, res) => {
  try {
    // Get users logic
    res.status(200).json({ success: true, users: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// middlewares/auth.js (using 'mdwv' and 'sjwt')
import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Requirements

- Visual Studio Code v1.60.0 or higher
- Node.js v14.0.0 or higher (for running the generated code)
- Express.js (for using the snippets)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

ISC

## Support

If you encounter any issues or have suggestions, please file an issue on the GitHub repository.

---

**Enjoy faster Node.js development!** 🚀