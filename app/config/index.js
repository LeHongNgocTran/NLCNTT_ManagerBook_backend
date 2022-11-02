const config = {
    app : {
        port: process.env.PORT || 3000
    },
    // connect mongo
    db : {
        uri : process.env.MONGODB_URI || "mongodb://localhost:27017/managerlibrary"
    }
}

module.exports = config;