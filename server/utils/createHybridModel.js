const mongoose = require('mongoose');
const { isMongoConnected } = require('../config/db');
const localDb = require('./localDb');

class QueryBuilder {
    constructor(collectionName, query = {}, op = 'find') {
        this.collectionName = collectionName;
        this.query = query;
        this.op = op;
        this.sortVal = null;
        this.limitVal = null;
        this.populateVal = [];
        this.selectVal = null;
    }

    sort(arg) {
        this.sortVal = arg;
        return this;
    }

    limit(arg) {
        this.limitVal = arg;
        return this;
    }

    select(arg) {
        this.selectVal = arg;
        return this;
    }

    populate(path, select) {
        this.populateVal.push({ path, select });
        return this;
    }

    // Execution methods
    async exec() {
        if (this.op === 'find') {
            let results = await localDb.find(this.collectionName, this.query, this.sortVal, this.limitVal);

            // Handle Populate (Simple version)
            if (this.populateVal.length > 0) {
                results = await this._applyPopulate(results);
            }

            if (this.selectVal) {
                // Not fully implemented, would reduce fields
            }

            return results;
        } else if (this.op === 'findOne') {
            let result = await localDb.findOne(this.collectionName, this.query);
            if (result && this.populateVal.length > 0) {
                const populated = await this._applyPopulate([result]);
                result = populated[0];
            }
            return result;
        }
    }

    // Helper to join data
    async _applyPopulate(docs) {
        for (const pop of this.populateVal) {
            // Infer collection from field name (simple heuristics or manual map)
            // Ideally we'd know the ref from Schema but we don't have easy access here without parsing Schema.
            // Assumption: field 'userId' -> 'files' (No wait, users), 'createdBy' -> 'users'
            let targetCollection = 'users'; // default guess
            if (pop.path === 'userId' || pop.path === 'createdBy' || pop.path === 'approvedBy') targetCollection = 'User';
            if (pop.path === 'targetGroups') targetCollection = 'ContactGroup';

            // Fetch all related IDs
            for (const doc of docs) {
                if (!doc[pop.path]) continue;

                const idToFind = doc[pop.path];
                // Check if it's an array (like targetGroups)
                if (Array.isArray(idToFind)) {
                    // TODO: Multi-ref populate not fully implemented for this demo
                    continue;
                }

                const related = await localDb.findById(targetCollection, idToFind);
                if (related) {
                    doc[pop.path] = related; // Replace ID with object

                    // Filter fields if select is present
                    if (pop.select) {
                        const fields = pop.select.split(' ');
                        const filtered = {};
                        // always keep _id and fields
                        if (!fields.includes('-_id')) filtered._id = related._id;
                        fields.forEach(f => {
                            if (!f.startsWith('-')) filtered[f] = related[f];
                        });
                        doc[pop.path] = filtered;
                    }
                }
            }
        }
        return docs;
    }

    // Make it then-able
    then(resolve, reject) {
        return this.exec().then(resolve, reject);
    }
}

const createHybridModel = (modelName, schema) => {
    // Register standard Mongoose model
    let MongoModel;
    try {
        MongoModel = mongoose.model(modelName);
    } catch (e) {
        MongoModel = mongoose.model(modelName, schema);
    }

    // Return Hybrid Proxy
    return {
        // Basic CRUD
        find: (query) => {
            if (isMongoConnected()) return MongoModel.find(query);
            return new QueryBuilder(modelName, query, 'find');
        },
        findOne: (query) => {
            if (isMongoConnected()) return MongoModel.findOne(query);
            return new QueryBuilder(modelName, query, 'findOne');
        },
        findById: (id) => {
            if (isMongoConnected()) return MongoModel.findById(id);
            // Effectively findOne with _id
            return new QueryBuilder(modelName, { _id: id }, 'findOne');
        },
        create: async (data) => {
            if (isMongoConnected()) return MongoModel.create(data);
            return await localDb.create(modelName, data);
        },
        findByIdAndUpdate: async (id, update, options) => {
            if (isMongoConnected()) return MongoModel.findByIdAndUpdate(id, update, options);
            return await localDb.findByIdAndUpdate(modelName, id, update, options);
        },
        findByIdAndDelete: async (id) => {
            if (isMongoConnected()) return MongoModel.findByIdAndDelete(id);
            return await localDb.findByIdAndDelete(modelName, id);
        },
        deleteMany: async (query) => {
            if (isMongoConnected()) return MongoModel.deleteMany(query);
            return await localDb.deleteMany(modelName, query);
        },
        countDocuments: async (query) => {
            if (isMongoConnected()) return MongoModel.countDocuments(query);
            return await localDb.countDocuments(modelName, query);
        },
        aggregate: async (pipeline) => {
            if (isMongoConnected()) return MongoModel.aggregate(pipeline);
            // Basic aggregation stub - returning empty or trying to process?
            // Since aggregations in main app are specific, we might return mock data or basic count
            console.log(`[LocalDB] Aggregation requested for ${modelName}`, pipeline);

            // Specialized mock for 'Report' stats
            if (modelName === 'Report') {
                const reports = await localDb.find('Report', {});
                // TODO: Implement basic grouping if critical
                // For now, return empty to prevent crash, user will see empty stats
                return [];
            }
            return [];
        }
    };
};

module.exports = createHybridModel;
