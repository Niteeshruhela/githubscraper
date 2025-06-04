import app from "./app.js"

app.listen(process.env.PORT, () => {
    console.log(`Server connected to port ${process.env.PORT}`)
});
