const express = require("express")
const task = require("../utils/task")
const { rateLimit } = require("express-rate-limit")
const { createClient } = require("redis")

const route = express.Router()
const client = createClient()

client.on("error",(error) => console.log("redis error" , error))
client.connect()

async function enqueue(user_id){
    try {
        task(user_id,"pushed")
        await client.lPush('queue',JSON.stringify(user_id))
    } catch (error) {
        console.error("Redis error:", error);
    }
}

const limitOnPerSec = rateLimit({
    windowMs : 1000,
    limit : 1,
    keyGenerator : (req) => req.body.user_id,
    handler: async (req,res) => {
        await enqueue(req.body.user_id)
        res.status(200).send('rate limiting !! Task queued');
    }
})

const limitOnPerMin = rateLimit({
    windowMs : 60*1000,
    limit : 20,
    keyGenerator : (req) => req.body.user_id,
    handler : async (req,res) =>{
        await enqueue(req.body.user_id)
        res.status(200).send('rate limiting !! Task queued');
    }
})


route.post("/task",limitOnPerMin,limitOnPerSec, async (req,res) => {
    const {user_id} = req.body
    try {
        task(user_id,"processed")
        res.status(200).send('Task being processed');
    } catch (error) {
        console.error("Error processing task:", error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = route