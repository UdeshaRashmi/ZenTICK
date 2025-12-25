const express = require('express');
const cors = require('cors');

const todosRouter = require('./routes/todos');
const alarmsRouter = require('./routes/alarms');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Register API routers
app.use('/api/todos', todosRouter);
app.use('/api/alarms', alarmsRouter);

// Simple health endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', routes: ['/api/todos', '/api/alarms'] });
});

// Endpoint to list routes for Postman / discovery
app.get('/routes', (req, res) => {
  const routes = [];
  function extract(stack, base) {
    stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods).map((m) => m.toUpperCase());
        routes.push({ path: (base || '') + layer.route.path, methods });
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        extract(layer.handle.stack, (base || '') + (layer.regexp && layer.regexp.source !== '^\\/?$' ? layer.regexp.source.replace('^\\/','/').replace('\\/?$','') : ''));
      }
    });
  }

  if (app._router && app._router.stack) extract(app._router.stack);
  res.json(routes);
});

// Error handler (last)
app.use(errorHandler);

module.exports = app;
