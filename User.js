const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const query = `
            INSERT INTO users (
                full_name, email, password_hash,
                user_type, location
            ) VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(query, [
            userData.full_name,
            userData.email,
            hashedPassword,
            userData.user_type,
            userData.location
        ]);
        
        return result.insertId;
    }

    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    }

    static async update(id, userData) {
        let query = `
            UPDATE users 
            SET full_name = ?, location = ?,
                updated_at = CURRENT_TIMESTAMP
        `;
        
        const params = [userData.full_name, userData.location];

        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            query += ', password_hash = ?';
            params.push(hashedPassword);
        }

        query += ' WHERE id = ?';
        params.push(id);

        const [result] = await db.execute(query, params);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async findByType(userType) {
        const query = `
            SELECT id, full_name, email, user_type, location, created_at 
            FROM users 
            WHERE user_type = ?
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.execute(query, [userType]);
        return rows;
    }

    static async verifyPassword(user, password) {
        return bcrypt.compare(password, user.password_hash);
    }

    static async searchByName(searchTerm) {
        const query = `
            SELECT id, full_name, email, user_type, location, created_at 
            FROM users
            WHERE full_name LIKE ?
            ORDER BY created_at DESC
        `;
        
        const [rows] = await db.execute(query, [`%${searchTerm}%`]);
        return rows;
    }
}

module.exports = User;
