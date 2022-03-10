const { TopologyDescriptionChangedEvent } = require("mongodb");


class Movie {
    constructor (title, releaseYear = "Not specified", leadActor = "Not specified", genre = "Not specified") {
        this.title = title;
        this.releaseYear = releaseYear;
        this.leadActor = leadActor;
        this.genre = genre;
    }
    async add (collection) {
        // add this to the db
        await collection.insertOne(this);
        return "Successfully added one entry";
    }
    async addMultiple (collection) {
        await collection.insertMany(this);
        return "Success many";
    }
    async list (collection) {
        return await collection.find().toArray();
        // list all movies in the db
    }
    async update(collection) {
        const repsonse = await collection.updateOne(
            {title: this.title},
            {$set: {leadActor: this.leadActor}},
        );
        if (response.modifiedCount > 0) {
            return "Success update";
        } else {
            return "No update";
        }
    }
    async delete(collection) {
        const response = await collection.deleteOne({title: this.title})
        if (response.deletedCount > 0) {
            return "Success delete";
        } else {
            return "No delete";
        }
    }
};

module.exports = Movie;