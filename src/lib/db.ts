import mysql from 'mysql2/promise';

// Declaramos una interfaz para extender el objeto global en TypeScript
interface GlobalMySQL {
    mysqlPool?: any;
}

const globalWithMySQL = global as typeof globalThis & GlobalMySQL;

// Solo creamos el pool si no existe ya en el objeto global
if (!globalWithMySQL.mysqlPool) {
    globalWithMySQL.mysqlPool = mysql.createPool({
        uri: process.env.DATABASE_URL, // Usa 'uri' en lugar de host/user/pass
        //host: process.env.DB_HOST,
        //port: Number(process.env.DB_PORT) || 4000,
        //user: process.env.DB_USERNAME,
        //password: process.env.DB_PASSWORD,
        //database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 3, // Bajamos a 3 para ser más conservadores con Hostinger
        queueLimit: 0,
        ssl: {
            rejectUnauthorized: true,  // ← esto habilita SSL
            minVersion: 'TLSv1.2'
        },
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000
    });
}

const pool = globalWithMySQL.mysqlPool;

export async function query<T>(sql: string, params?: any[]): Promise<T> {
    const [results] = await pool.execute(sql, params);
    return results as T;
}

export default pool;