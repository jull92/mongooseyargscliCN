const yargs = require("yargs");
const { client, connection } = require("./db/connection.js");
const Movie = require("./utils")

const app = async (yargsObj) => {
    const collection = await connection();
    try {
        if (yargsObj.add) {
            // take movie info, add it to the mongodb database and console.log a success msg
            const movie = new Movie(yargsObj.title, yargsObj.releaseYear, yargsObj.leadActor, yargsObj.genre);
            console.log(await movie.add(collection));
        } else if (yargsObj.list) {
            // list all movies in db
            const movie = new Movie(yargsObj.title, yargsObj.releaseYear, yargsObj.leadActor, yargsObj.genre);
            console.log(await movie.list(collection));
        // } else if (yargsObj.addMultiple) {
        //     // add multiple 
        //     const movie = new Movie(yargsObj.title, yargsObj.releaseYear, yargsObj.leadActor, yargsObj.genre);
        //     console.log(await movie.list(collection));
        } else if (yargsObj.update) {
            // update db
            const movie = new Movie(yargsObj.title, yargsObj.releaseYear, yargsObj.leadActor, yargsObj.genre);
            console.log(await movie.list(collection));
        } else {
            console.log("Incorrect command")
        }
        await client.close();
    } catch (error) {
        console.log(error)
    }
};

app(yargs.argv)