const { createClient } = require("redis")
const task = require("./utils/task")

async function process(user_id){
    await task(user_id,"completed")
}

async function worker(){
    console.log("worker is on!!")
    try {
        const client = createClient()
        client.connect()
        while(1){
            try {
                const id =await client.brPop('queue',0)
                const user_id = JSON.parse(id.element)
                await process(user_id)
            } catch (error) {
                console.error("Error processing", error);
            }
        }
    }catch(error){
        console.error("Failed to connect to Redis", error);
    }
}

worker()