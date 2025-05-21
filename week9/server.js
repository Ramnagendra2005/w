// Import necessary Node.js modules
const http = require("http"); // For creating the HTTP server
const os = require("os"); // For interacting with the operating system
const path = require("path"); // For working with file and directory paths
const EventEmitter = require("events"); // For event handling

// --- 1. Explore the 'os' module ---
console.log("--- OS Module Information ---");
console.log(`Operating System: ${os.platform()}`); // e.g., 'linux', 'darwin', 'win32'
console.log(`OS Type: ${os.type()}`); // e.g., 'Linux', 'Darwin', 'Windows_NT'
console.log(`OS Release: ${os.release()}`); // e.g., '5.15.0-105-generic'
console.log(`Total Memory (bytes): ${os.totalmem()}`);
console.log(`Free Memory (bytes): ${os.freemem()}`);
console.log(`CPU Architecture: ${os.arch()}`); // e.g., 'x64'
console.log(`Number of CPUs: ${os.cpus().length}`);
console.log(`Uptime (seconds): ${os.uptime()}`); // System uptime
console.log(`Home Directory: ${os.homedir()}`);
console.log(`Temp Directory: ${os.tmpdir()}`);
console.log("---------------------------\n");

// --- 2. Explore the 'path' module ---
console.log("--- Path Module Information ---");
const filePath = "/users/john/documents/report.txt";
const anotherPath = "src/components/button.js";

console.log(`Original Path: ${filePath}`);
console.log(`Directory Name: ${path.dirname(filePath)}`); // /users/john/documents
console.log(`Base Name: ${path.basename(filePath)}`); // report.txt
console.log(`Extension Name: ${path.extname(filePath)}`); // .txt
console.log(`Is Absolute Path? ${path.isAbsolute(filePath)}`); // true
console.log(`Is Absolute Path (anotherPath)? ${path.isAbsolute(anotherPath)}`); // false

// Joining paths
const joinedPath = path.join("/home", "user", "data", "file.json");
console.log(`Joined Path: ${joinedPath}`); // /home/user/data/file.json

// Resolving paths (absolute path from relative path)
const resolvedPath = path.resolve("temp", "data.csv");
console.log(`Resolved Path (from current working directory): ${resolvedPath}`); // e.g., /path/to/your/project/temp/data.csv

// Normalizing paths (removes redundant '..' or '.' segments)
const normalizedPath = path.normalize("/foo//bar/../baz/.");
console.log(`Normalized Path: ${normalizedPath}`); // /foo/baz
console.log("---------------------------\n");

// --- 3. Explore the 'events' module (Custom Event Emitter) ---
console.log("--- Events Module (Custom Event) ---");
// Create a new instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener for 'greet' event
myEmitter.on("greet", (name) => {
  console.log(`Event Fired: Hello, ${name}!`);
});

// Register another event listener for 'greet' event
myEmitter.on("greet", (name) => {
  console.log(`Event Fired (second listener): Nice to meet you, ${name}.`);
});

// Register a one-time event listener for 'farewell' event
myEmitter.once("farewell", (name) => {
  console.log(`Event Fired: Goodbye, ${name}! (This will only fire once)`);
});

// Emit the 'greet' event
console.log('Emitting "greet" event...');
myEmitter.emit("greet", "Alice");

// Emit the 'farewell' event
console.log('Emitting "farewell" event...');
myEmitter.emit("farewell", "Bob");

// Try to emit 'farewell' again (it won't fire due to .once())
console.log('Attempting to emit "farewell" again (should not fire)...');
myEmitter.emit("farewell", "Charlie");

// You can also remove listeners
const myListener = (data) => console.log(`Custom Event Data: ${data}`);
myEmitter.on("customEvent", myListener);
myEmitter.emit("customEvent", "Some important data");
myEmitter.removeListener("customEvent", myListener);
myEmitter.emit("customEvent", "This will not be logged"); // Listener removed
console.log("---------------------------\n");

// --- 4. Create a Custom HTTP Server using 'http' module ---
const hostname = "127.0.0.1"; // Localhost
const port = 3000; // Port number

// Create the server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // Handle different routes
  if (req.url === "/") {
    res.end("Hello from the Node.js Custom Server!\n");
  } else if (req.url === "/info") {
    let info = "Server Information:\n";
    info += `OS Platform: ${os.platform()}\n`;
    info += `OS Type: ${os.type()}\n`;
    info += `Free Memory: ${os.freemem()} bytes\n`;
    info += `Total Memory: ${os.totalmem()} bytes\n`;
    info += `Current Directory: ${process.cwd()}\n`; // Current working directory
    info += `Path Separator: ${path.sep}\n`; // Platform-specific path segment separator
    res.end(info);
  } else if (req.url === "/events") {
    // Demonstrate emitting an event within the server response
    myEmitter.emit("serverRequest", req.url);
    res.end("Check server console for event details!\n");
  } else {
    res.statusCode = 404;
    res.end("404 Not Found\n");
  }
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("Access /info to see OS and Path module details.");
  console.log("Access /events to trigger a custom event.");
});

// Listen for a custom 'serverRequest' event from the server handler
myEmitter.on("serverRequest", (url) => {
  console.log(`Custom Event: Server received a request for URL: ${url}`);
});
