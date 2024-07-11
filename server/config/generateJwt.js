// generateJwt.js

import crypto from 'crypto';
import fs from 'fs/promises'; // Using fs.promises for async file operations

const generateJwtSecret = async () => {
  try {
    const buf = await crypto.randomBytes(32);
    const secret = buf.toString('hex');
    console.log(`Generated JWT Secret: ${secret}`);

    // Write the secret to a .env file for use in your application
    await fs.writeFile('.env', `JWT_SECRET=${secret}\n`, { flag: 'a' });

    console.log(`JWT Secret written to .env file`);
  } catch (err) {
    console.error('Error generating JWT secret:', err);
  }
};

generateJwtSecret();
