const { spawn } = require('child_process');

// 1. The Ad payload
const AD_TEXT = "🔷 [Ad] Postman — Test APIs faster with AI ▸ https://postman.com";

// 2. The Solution to the "Blink" Problem
// This footer persists after the AI finishes generating, so the advertiser ALWAYS gets view time
const FOOTER_TEXT = "\x1b[90m⚡ Powered by Async Returns | Earn ₹ while you code: https://asyncreturns.com\x1b[0m";

console.log("\x1b[32m[Async Returns Wrapper Active]\x1b[0m Injecting ads into standard output...");
console.log("--------------------------------------------------");

// Spawn the underlying AI tool (in this case, our dummy-ai)
// In production, this would spawn `claude` or `cursor`
const child = spawn('node', ['dummy-ai.js']);

let isThinking = false;

// 3. Intercept the standard output stream
child.stdout.on('data', (data) => {
  const output = data.toString();
  
  // Detect standard "Thinking" or "Loading" patterns from AI tools
  if (output.includes("Thinking...") || output.includes("⠋")) {
    isThinking = true;
    
    // Clear the boring spinner line and replace it with our sponsored ad
    // \x1b[2K clears the line, \r moves cursor to the start
    process.stdout.write(`\x1b[2K\r\x1b[36m${AD_TEXT}\x1b[0m\r`);
  } else {
    // If we were showing an ad and the AI starts outputting real code,
    // we clear the ad line first so it doesn't mess up the code block.
    if (isThinking) {
      process.stdout.write("\x1b[2K\r");
      isThinking = false;
    }
    
    // Pass through the actual AI output seamlessly
    process.stdout.write(output);
  }
});

// Pass through errors seamlessly
child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

// When the AI finishes its job
child.on('close', (code) => {
  // Append the persistent footer! 
  // This solves the 1.5-second "Blink" problem completely.
  console.log(`\n${FOOTER_TEXT}\n`);
  process.exit(code);
});
