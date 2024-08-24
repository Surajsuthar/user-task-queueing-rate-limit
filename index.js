const express = require("express")
const taskRoute = require("./routes/index")

const app = express()

app.use(express.json())
app.use("/api/v1",taskRoute)

app.use((err,req,res,next) => {
    if(err){
        console.log(err)
        res.status(500).send('Something broke!')
    }
})

app.listen(5050,()=>{
    console.log("server is on!!")
})