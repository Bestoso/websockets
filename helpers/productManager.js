const fs = require("fs/promises");

class ProductManager {
    constructor ( path ) {
        this.products = [];
        this.path = path;
    }

    async getItems () {
        const items = await fs.readFile(this.path, 'utf-8');
        const parsedItems = await JSON.parse(items);
        return parsedItems;
    }

    async save ( data ) {
        const stringData = JSON.stringify(data, null, 4);
        return await fs.writeFile(this.path, stringData, 'utf-8');
    }

    async findItemById ( id ) {
        const items = await this.getItems();
        const itemFound = items.find(item => item.id === id);
        if (!itemFound) {
            console.log('Id does not correspond to any item')
        } else {
            return itemFound
        }
    }

    // products methods

    async addItem ( name, price, description, code, status, category, thumbnail ) {
        const items = await this.getItems();
        const values = {
            name,
            price,
            description,
            code,
            status,
            category,
            thumbnail
        }
        const newItem = {
            id: items.length + 1,
            ...values
        }
        if (!name ||!price ||
            !description || !code ||
            !status || !category ||
            !thumbnail) {
            console.log('Must Specify all values', {
                ...values
            })
        } else {
            items.push(newItem);
            await this.save(items);
            return items
        }
    }

    async updateItem ( id, name, price, description, code, status, category, thumbnail ) {
        const items = await this.getItems();
        const itemFoundIndex = items.findIndex(item => item.id === id);
        items[itemFoundIndex].name = name;
        items[itemFoundIndex].price = price;
        items[itemFoundIndex].description = description;
        items[itemFoundIndex].code = code;
        items[itemFoundIndex].status = status;
        items[itemFoundIndex].category = category;
        items[itemFoundIndex].thumbnail = thumbnail;
        await this.save(items);
    }

    async deleteItem ( id ) {
        const items = await this.getItems();
        const filteredItems = items.filter(item => item.id !== id);
        await this.save(filteredItems);
    }
}

module.exports = ProductManager;