import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navegar hacia atrás para llegar a la raíz del proyecto
const rootDir = path.resolve(__dirname, '..');

function loadEnv() {
    const envPath = path.join(rootDir, '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('❌ No se encontró el archivo .env.local en la raíz.');
        process.exit(1);
    }
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });
    return env;
}

async function setupDatabase() {
    const env = loadEnv();
    const sqlPath = path.join(rootDir, 'database_schema.sql');

    if (!fs.existsSync(sqlPath)) {
        console.error('❌ No se encontró el archivo database_schema.sql');
        return;
    }

    console.log('--- Iniciando configuración de Base de Datos ---');
    console.log(`Host: ${env.MYSQL_HOST}`);
    console.log(`Usuario: ${env.MYSQL_USER}`);
    console.log(`Base de datos objetivo: ${env.MYSQL_DATABASE}`);

    let connection;

    try {
        // 1. Conexión inicial sin base de datos para crearla si no existe
        connection = await mysql.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
        });

        console.log(`\n1. Creando base de datos "${env.MYSQL_DATABASE}" si no existe...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);

        // 2. Cambiar a la base de datos
        await connection.changeUser({ database: env.MYSQL_DATABASE });
        console.log(`✅ Conectado a "${env.MYSQL_DATABASE}"`);

        // 3. Leer y procesar el archivo SQL
        console.log('\n2. Ejecutando scripts de tablas e inserciones...');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Dividir por punto y coma, pero filtrando comentarios y líneas vacías
        const statements = sqlContent
            .split(/;(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/) // Split por ; fuera de strings
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

        for (const statement of statements) {
            if (statement.toLowerCase().startsWith('use ')) continue; // Omitir USE internos si es posible

            try {
                await connection.query(statement);
                // Extraer el inicio de la instrucción para el log
                const preview = statement.substring(0, 50).replace(/\n/g, ' ') + '...';
                console.log(`   Ejecutado: ${preview}`);
            } catch (stmtErr) {
                console.warn(`   ⚠️ Advertencia en instrucción: ${stmtErr.message}`);
            }
        }

        console.log('\n🚀 ¡Base de datos configurada correctamente!');

    } catch (error) {
        console.error('\n❌ Error crítico durante la configuración:');
        console.error(error.message);

        if (error.code === 'ECONNREFUSED') {
            console.log('\nSUGERENCIA: Asegúrate de que MySQL (XAMPP/Laragon) esté encendido.');
        }
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();
