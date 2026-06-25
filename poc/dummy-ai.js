// dummy-ai.js
// This script simulates a standard AI CLI tool like Claude Code or Cursor CLI.
// It shows a "Thinking..." spinner for a few seconds, then prints some code.

console.log("Welcome to DummyAI CLI.");

// Simulate the standard terminal spinner behavior
process.stdout.write("⠋ Thinking...\r");

setTimeout(() => {
  // Clear the spinner line
  process.stdout.write("\x1b[2K\r"); 
  
  // Output the simulated AI response
  console.log("Here is your refactored authentication module:");
  console.log("\x1b[36m// auth.js\nfunction generateJWT(user) {\n  return jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });\n}\x1b[0m");
}, 3000);
