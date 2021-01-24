const user = require('./UserRouters')
const friend = require('./friendRouter')
const relation = require("./RelationRouter")

module.exports= function (app) {
    user(app)
    friend(app)
    relation(app)
}
