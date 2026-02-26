const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.join('=').trim();
        }
    });
    return env;
}

async function verifyPassword() {
    const env = loadEnv();
    const passwordToTest = 'admin123';

    try {
        const connection = await mysql.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.MYSQL_DATABASE,
        });

        const [rows] = await connection.execute('SELECT password FROM users WHERE email = ?', ['admin@lenerstudio.com']);

        if (rows.length === 0) {
            console.log('❌ Usuario no encontrado.');
            return;
        }

        const dbHash = rows[0].password;
        console.log('Hash en DB:', dbHash);

        const isValid = await bcrypt.compare(passwordToTest, dbHash);

        if (isValid) {
            console.log('✅ ¡CONTRASEÑA CORRECTA! El hash coincide con "admin123".');
        } else {
            console.log('❌ CONTRASEÑA INCORRECTA. El hash en la DB no coincide con "admin123".');
        }

        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

verifyPassword();
