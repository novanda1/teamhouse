# nodejs

### Scripts Note
- "build" is used in a few places so let’s start here. When we npm run build our rimraf package will delete our existing dist folder, ensuring no previous files exist. Then, we run tsc to build our project, which as we know is compiled into dist (remember we specified this in our tsconfig.json). i.e. deletes the old code and replaces it with the new code.

- "preserve" just calls our "build" command to clean up any existing dist folders and recompiles via tsc. This gets called before the "serve" command, when we run npm run serve (which we’ll use to develop on localhost).

- "serve" uses our cross-env package to set the NODE_ENV to development, so we know we’re in dev mode. We can then access process.env.NODE_ENV anywhere inside our .ts files should we need to. Then, using concurrently we’re running tsc --watch (TypeScript Compiler in “watch mode”) which will rebuild whenever we change a file. When that happens, our TypeScript code is outputted in out dist directory (remember we specified this in our tsconfig.json). Once that’s recompiled, nodemon will see the changes and reload dist/index.js, our entry-point to the app. This gives us full live recompilation upon every change to a .ts file.

- "prestart" runs the same task as "preserve" and will clean up our dist, then use tsc to compile a new dist. This happens before the "start" is kicked off, which we run via npm start.

- "start" uses cross-env again and sets the NODE_ENV to production, so we can detect/enable any “production mode” features in our code. It then uses node dist/index.js to run our project, which is already compiled in the "prestart" hook. All our "start" command does is execute the already-compiled TypeScript code.

- "test" pffft. What tests.

### Package Note
- body-parser extracts the entire body of an incoming request stream (for Express) and exposes it on req.body as something easier to work with, typically using JSON.

- cross-env sets environment variables without us having to worry about the platform.

- dot-env loads in .env variables into process.env so we can access them inside our *.ts files.

- express is a framework for building APIs, such as handling GET, POST, PUT, DELETE requests with ease and building your application around it. It’s simple and extremely commonly used.

- helmet adds some sensible default security Headers to your app.

- rimraf is essentially a cross-platform rm -rf for Node.js so we can delete older copies of our dist directory before recompiling a new dist