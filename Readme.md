# Vue App (Vue 3 + Vite + Express + MongoDB)

A full-stack example combining a Vue 3 frontend built with Vite and an Express API backed by MongoDB. In development, the client runs on port 5173 and proxies API calls to the server on port 5000. In production, the server serves the built SPA from server/public.

## Project Structure

- Root Node app: [package.json](package.json)
- Client (Vue 3 + Vite): [client/](client)
  - Config: [client/vite.config.js](client/vite.config.js)
  - Entry: [client/src/main.js](client/src/main.js)
  - Router: [client/src/router/index.js](client/src/router/index.js)
  - Views: [client/src/views/HomeView.vue](client/src/views/HomeView.vue), [client/src/views/AboutView.vue](client/src/views/AboutView.vue)
  - Services: [client/src/services/PostService.js](client/src/services/PostService.js)
- Server (Express): [server/index.js](server/index.js)
  - Routes: [server/routes/api/posts.js](server/routes/api/posts.js)
  - DB client: [server/db.js](server/db.js)
  - Static assets: [server/public/](server/public)
- Heroku procfile: [Procfile](Procfile)

## Requirements

- Node.js 20.x, 22.x, or 24.x
- A MongoDB connection string (recommended via environment variable MONGO_URI)

## Quick Start

1. Install root dependencies:

   ```bash
   npm install
   ```

2. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

3. Configure MongoDB:

   - Preferred: expose your connection string as an env variable MONGO_URI and update [server/db.js](server/db.js) to use it.
   - Current code connects via [connMongo()](server/db.js:20) with a hardcoded URI. Replace secrets before deployment.

4. Run in development (two terminals):

   Terminal A (server on 5000):
   ```bash
   npm run dev
   ```

   Terminal B (client on 5173):
   ```bash
   cd client
   npm run dev
   ```

   The dev proxy is configured in [defineConfig()](client/vite.config.js:7) to forward /api to http://localhost:5000.

## Production build and serve

- Build the client to server/public:

  ```bash
  cd client
  npm run build
  ```

- Start the server:

  ```bash
  npm start
  ```

The server serves static files via [express.static()](server/index.js:14) and uses an SPA fallback [app.get()](server/index.js:34) in production.

## API Overview

Base URL in development: http://localhost:5000/api/posts

- GET /api/posts → [router.get()](server/routes/api/posts.js:11)

  ```bash
  curl -s http://localhost:5000/api/posts | jq
  ```

- POST /api/posts → [router.post()](server/routes/api/posts.js:24)

  ```bash
  curl -s -X POST http://localhost:5000/api/posts \
    -H "Content-Type: application/json" \
    -d '{"text":"Hello from API"}'
  ```

- DELETE /api/posts/:id → [router.delete()](server/routes/api/posts.js:45)

  ```bash
  curl -s -X DELETE http://localhost:5000/api/posts/<id>
  ```

Responses use MongoDB ObjectIds. Created documents include fields: text, createdAt.

## Client integration

Use the service methods in [client/src/services/PostService.js](client/src/services/PostService.js):

- [PostService.getPosts()](client/src/services/PostService.js:7) → fetch list of posts
- [PostService.createPost()](client/src/services/PostService.js:23) → create a post
- [PostService.deleteById()](client/src/services/PostService.js:36) → delete a post

Example (inside a Vue component such as [client/src/components/PostComponent.vue](client/src/components/PostComponent.vue)):

```js
import PostService from '@/services/PostService'

const posts = await PostService.getPosts()
await PostService.createPost('Hello World')
await PostService.deleteById(posts[0]._id)
```

Router is defined via [createRouter()](client/src/router/index.js:4) with routes for [HomeView.vue](client/src/views/HomeView.vue) and [AboutView.vue](client/src/views/AboutView.vue).

## Configuration notes

- CORS is enabled in the server via [app.use(cors())](server/index.js:12).
- JSON body parsing via [bodyParser.json()](server/index.js:10).
- Dev proxy for /api is set in [client/vite.config.js](client/vite.config.js).
- Build output goes to [server/public/](server/public) configured in [build.outDir](client/vite.config.js:32).

## Testing and linting (client)

- Unit tests: [client/src/components/__tests__/HelloWorld.spec.js](client/src/components/__tests__/HelloWorld.spec.js)

  ```bash
  cd client
  npm run test:unit
  ```

- Lint:

  ```bash
  cd client
  npm run lint
  ```

## Deployment

- Heroku: The build step is set via [heroku-postbuild](package.json:14). Ensure you set MONGO_URI as a config var.
- Procfile: [Procfile](Procfile) is used to launch the server.

## Security

Do not commit credentials. Replace the hardcoded URI in [server/db.js](server/db.js) with an environment variable before deploying.

## License

MIT License in [package.json](package.json).