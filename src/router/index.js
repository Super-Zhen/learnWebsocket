const user = require('./UserRouters')
const friend = require('./friendRouter')
const relation = require("./RelationRouter")
const room = require("./RoomRouter")
const message = require("./messageRouter")

module.exports= function (app) {
    user(app)
    friend(app)
    relation(app)
    room(app)
    message(app)
}
