const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Función manual para leer .env.local sin depender de dotenv
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('❌ No se encontró el archivo .env.local');
        return {};
    }
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

async function testConnection() {
    const env = loadEnv();
    console.log('--- Verificando Conexión a Base de Datos ---');
    console.log('Host:', env.MYSQL_HOST);
    console.log('User:', env.MYSQL_USER);
    console.log('DB:', env.MYSQL_DATABASE);

    try {
        const connection = await mysql.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.MYSQL_DATABASE,
        });

        console.log('✅ ¡CONEXIÓN ESTABLECIDA CON ÉXITO!');

        const [users] = await connection.execute('SELECT email FROM users WHERE email = ?', ['admin@lenerstudio.com']);

        if (users.length > 0) {
            console.log('✅ Usuario admin@lenerstudio.com encontrado en la base de datos.');
        } else {
            console.log('❌ El usuario no existe en la tabla "users".');
            console.log('Sugerencia: Ejecuta el script SQL para insertar los datos iniciales.');
        }

        await connection.end();
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        console.log('\n--- Posibles soluciones ---');
        if (error.code === 'ECONNREFUSED') {
            console.log('1. Asegúrate de que MySQL (XAMPP/WAMP/Laragon) esté ENCENDIDO.');
            console.log('2. Verifica que el puerto 3306 esté abierto.');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('1. La base de datos "' + env.MYSQL_DATABASE + '" no existe.');
            console.log('2. Créala ejecutando: CREATE DATABASE ' + env.MYSQL_DATABASE + ';');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('1. Revisa tu usuario y contraseña en .env.local.');
            console.log('2. Tu contraseña actual termina en * (Nike128*), asegúrate que sea literal.');
        }
    }
}

testConnection();
