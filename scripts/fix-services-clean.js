import fs from "fs";
import path from "path";

const servicesDataPath = path.join(process.cwd(), "src", "lib", "services-data.ts");
const content = fs.readFileSync(servicesDataPath, "utf8");
const lines = content.split("\n");

// Keep lines 0 to 1416 (which includes pcb-carrier-*-50) and lines from 2014 to end
const part1 = lines.slice(0, 1416);
const part2 = lines.slice(2014);

const newContent = [...part1, ...part2].join("\n");
fs.writeFileSync(servicesDataPath, newContent, "utf8");
console.log(
  `Cleaned services-data.ts: line count reduced from ${lines.length} to ${newContent.split("\n").length}`,
);
