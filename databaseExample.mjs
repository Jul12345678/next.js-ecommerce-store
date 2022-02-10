// Connect to database
// install postgres and dotenv-safe

import { config } from 'dotenv-safe';
import postgres from 'postgres';

// this loads all environment variables from a .env file for all code after this
config();
const sql = postgres();
// Old version, this would save the username and password in the code
// postgres('postgres://username:password@localhost:5432/database'),

console.log(await sql`SELECT * FROM products;`);
// node filename to check
