const db = require('../config/database');

class Product {
    static async create(productData) {
        const query = `
            INSERT INTO products (
                seller_id, name, description, category,
                price, quantity, unit, image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(query, [
            productData.seller_id,
            productData.name,
            productData.description,
            productData.category,
            productData.price,
            productData.quantity,
            productData.unit,
            productData.image_url
        ]);
        
        return result.insertId;
    }

    static async findById(id) {
        const query = `
            SELECT p.*, u.full_name as seller_name, u.location as seller_location 
            FROM products p
            JOIN users u ON p.seller_id = u.id
            WHERE p.id = ?
        `;
        
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    static async findAll(filters = {}) {
        let query = `
            SELECT p.*, u.full_name as seller_name, u.location as seller_location 
            FROM products p
            JOIN users u ON p.seller_id = u.id
            WHERE 1=1
        `;
        
        const params = [];

        if (filters.category) {
            query += ' AND p.category = ?';
            params.push(filters.category);
        }

        if (filters.minPrice) {
            query += ' AND p.price >= ?';
            params.push(filters.minPrice);
        }

        if (filters.maxPrice) {
            query += ' AND p.price <= ?';
            params.push(filters.maxPrice);
        }

        if (filters.location) {
            query += ' AND u.location LIKE ?';
            params.push(`%${filters.location}%`);
        }

        if (filters.search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${filters.search}%`, `%${filters.search}%`);
        }

        query += ' ORDER BY p.created_at DESC';

        if (filters.limit) {
            query += ' LIMIT ?';
            params.push(parseInt(filters.limit));
        }

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async update(id, productData) {
        const query = `
            UPDATE products 
            SET name = ?, description = ?, category = ?,
                price = ?, quantity = ?, unit = ?, 
                image_url = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        const [result] = await db.execute(query, [
            productData.name,
            productData.description,
            productData.category,
            productData.price,
            productData.quantity,
            productData.unit,
            productData.image_url,
            id
        ]);
        
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async findBySeller(sellerId) {
        const query = `
            SELECT * FROM products 
            WHERE seller_id = ?
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.execute(query, [sellerId]);
        return rows;
    }

    static async searchByName(searchTerm) {
        const query = `
            SELECT p.*, u.full_name as seller_name, u.location as seller_location 
            FROM products p
            JOIN users u ON p.seller_id = u.id
            WHERE p.name LIKE ? OR p.description LIKE ?
            ORDER BY p.created_at DESC
        `;
        
        const [rows] = await db.execute(query, [
            `%${searchTerm}%`,
            `%${searchTerm}%`
        ]);
        return rows;
    }
}

module.exports = Product;
