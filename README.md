## Building and running for development

Assumed to be using Node v16

From there:

```
$ npm install
$ npm start
```

This will start a local development server running the application. Everything should work with Hot Reloading and includes the React and Redux Dev Tools, as well as Redux Logging in the console.  Note that these development features are disabled in production builds.

## Building for production

```
$ npm install
$ npm run build
$ F deploy model:[account]/[project]/model
$ F deploy public:[account]/[project]/static
```
