const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

class LocalDatabase {
    constructor() {
        this.cache = {};
    }

    _getFilePath(collectionName) {
        return path.join(DATA_DIR, `${collectionName}.json`);
    }

    _load(collectionName) {
        if (this.cache[collectionName]) return this.cache[collectionName];

        const filePath = this._getFilePath(collectionName);
        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                this.cache[collectionName] = JSON.parse(data);
            } catch (err) {
                console.error(`Error reading local DB ${collectionName}:`, err);
                this.cache[collectionName] = [];
            }
        } else {
            this.cache[collectionName] = [];
        }
        return this.cache[collectionName];
    }

    _save(collectionName, data) {
        this.cache[collectionName] = data;
        fs.writeFileSync(this._getFilePath(collectionName), JSON.stringify(data, null, 2));
    }

    // CRUD Operations mimicking Mongoose/MongoDB

    async find(collection, query = {}, sort = null, limit = null) {
        let items = this._load(collection);

        // Filter
        items = items.filter(item => this._matchesQuery(item, query));

        // Sort
        if (sort) {
            const keys = Object.keys(sort);
            if (keys.length > 0) {
                const key = keys[0];
                const order = sort[key]; // 1 or -1
                items.sort((a, b) => {
                    if (a[key] < b[key]) return -1 * order;
                    if (a[key] > b[key]) return 1 * order;
                    return 0;
                });
            }
        }

        // Limit
        if (limit) {
            items = items.slice(0, limit);
        }

        return items; // Returns a real array (not a Mongoose object, but compatible)
    }

    async findOne(collection, query) {
        const items = this._load(collection);
        return items.find(item => this._matchesQuery(item, query)) || null;
    }

    async findById(collection, id) {
        const items = this._load(collection);
        return items.find(item => item._id === id.toString()) || null;
    }

    async create(collection, data) {
        const items = this._load(collection);
        const newItem = {
            ...data,
            _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        items.push(newItem);
        this._save(collection, items);
        return newItem;
    }

    async findByIdAndUpdate(collection, id, update, options = {}) {
        let items = this._load(collection);
        const index = items.findIndex(item => item._id === id.toString());

        if (index === -1) return null;

        // Apply updates
        const updatedItem = { ...items[index], ...update, updatedAt: new Date() };
        items[index] = updatedItem;
        this._save(collection, items);
        return updatedItem;
    }

    async findByIdAndDelete(collection, id) {
        let items = this._load(collection);
        const index = items.findIndex(item => item._id === id.toString());

        if (index === -1) return null;

        const deletedItem = items[index];
        items.splice(index, 1);
        this._save(collection, items);
        return deletedItem;
    }

    async deleteMany(collection, query) {
        let items = this._load(collection);
        const initialLength = items.length;

        const remainingItems = items.filter(item => !this._matchesQuery(item, query));
        this._save(collection, remainingItems);

        return { deletedCount: initialLength - remainingItems.length };
    }

    async countDocuments(collection, query = {}) {
        const items = await this.find(collection, query);
        return items.length;
    }

    // Helper: MongoDB-style query matcher (simplified)
    _matchesQuery(item, query) {
        for (const key in query) {
            const value = query[key];

            // Regex match
            if (value instanceof RegExp) {
                if (!value.test(item[key])) return false;
                continue;
            }

            // Object check (e.g. $in, $gte) - simplified support
            if (typeof value === 'object' && value !== null) {
                if (value.$in && Array.isArray(value.$in)) {
                    if (!value.$in.includes(item[key])) return false;
                    continue;
                }
                if (value.$regex) {
                    const re = new RegExp(value.$regex, value.$options || '');
                    if (!re.test(item[key])) return false;
                    continue;
                }
            }

            // Direct match
            if (item[key] !== value) return false;
        }
        return true;
    }
}

module.exports = new LocalDatabase();
