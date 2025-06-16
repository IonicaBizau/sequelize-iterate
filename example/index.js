"use strict";

const sequelizeIterate = require("../lib");


(async () => {
    await SequelizeIterate({
        model: User,
        batch_size: 10,
        onItem: async user => {
            await doSomethingWithTheUser(user)
        },
        onBatch: async batchOfUsers => {
            await doSomethingWithTheBatchOfUsers(batchOfUsers)
        }
    })
})()
