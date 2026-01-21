const fs = require("fs");

fs.readFile("count.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }

    let words = data.trim().split(/\s+/);
    let count = words.length;

    fs.writeFile("output.txt", "Word Count: " + count, (err) => {
        if (err) {
            console.log("Error writing file");
        } else {
            console.log("Word count written successfully");
        }
    });
});
