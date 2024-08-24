const fs = require("fs")

async function task(user_id,status){
    const log = `${user_id}-task ${status} at-${new Date().toLocaleString()}\n`
    fs.appendFile("task.log",log,(err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        } else {
            console.log(log);
        }
    })
}

module.exports = task