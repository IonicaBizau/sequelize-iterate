"use strict";

/**
 * sequelizeIterate
 * Iterate the records in a model.
 *
 * @name sequelizeIterate
 * @function
 * @param {Object} options An object with the following properties:
 *     - `model`: The Sequelize model to iterate over.
 *     - `batch_size`: The number of records to process in each batch (default: 100).
 *     - `beforeQuery`: A function that is called before each query, allowing you to modify the query object (default: an empty function).
 *     - `onItem`: A function that is called for each item in the batch, allowing you to process each record (default: no operation).
 *     - `onBatch`: A function that is called for each batch of records, allowing you to process the entire batch (default: no operation).
 * @return {Promise} A promise that resolves when all records have been processed.
 */
module.exports = async function sequelizeIterate ({
    model,
    batch_size = 100,
    beforeQuery = async () => {},
    onItem,
    onBatch
}) {
    if (!model) {
        throw new Error("Model is required");
    }

    let page = 0;
    while (true) {
        const limit = batch_size;
        const offset = page * limit;

        const query = {
            limit,
            offset,
        };

        await beforeQuery(query)
        const { rows, count } = await model.findAndCountAll(query)
        ++page;

        // No more records to process
        if (rows.length === 0) {
            break; 
        }

        // Process the current batch of records
        if (onBatch) {
            await onBatch(rows, {
                page,
                limit,
                offset,
                total: count
            });
        } 

        // Process each item in the current batch
        if (onItem) {
            for (const item of rows) {
                await onItem(item, {
                    page,
                    limit,
                    offset,
                    total: count
                });
            }
        }
    }
}