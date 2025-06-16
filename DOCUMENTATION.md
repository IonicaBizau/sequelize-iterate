## Documentation

You can see below the API reference of this module.

### `sequelizeIterate(options)`
Iterate the records in a model.

#### Params

- **Object** `options`: An object with the following properties:     - `model`: The Sequelize model to iterate over.
    - `batch_size`: The number of records to process in each batch (default: 100).
    - `beforeQuery`: A function that is called before each query, allowing you to modify the query object (default: an empty function).
    - `onItem`: A function that is called for each item in the batch, allowing you to process each record (default: no operation).
    - `onBatch`: A function that is called for each batch of records, allowing you to process the entire batch (default: no operation).

#### Return
- **Promise** A promise that resolves when all records have been processed.

