const mongodb = {
    hostname:'localhost',
    port:'27017',
    dbName:'learnwebsocket',
    url(){return `mongodb://${this.hostname}:${this.port}/${this.dbName}`}
}
module.exports = mongodb
