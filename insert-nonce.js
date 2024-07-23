import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPath = path.join(__dirname, 'dist', 'index.html');

const insertNonce = (nonce) => {
    fs.readFile(indexPath, 'utf8', (err, data) => {  //  check out this 'utf8' to utf-8 
        if (err) {
            console.error('Error reading index.html:', err);
            return;
        }
        //Replace script with nonce
        const result = data.replace(
            /<script type="module" crossorigin src="(.+?)"><\/script>/,
      `<script nonce="${nonce}" type="module" crossorigin src="$1"></script>`
    );

    fs.writeFile(indexPath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html:', err);
        } else {
            console.log('Nonce added to script tag in index.html');
        }
    });
    });
};
//Generate a nonce and insert it
const nonce = crypto.randomBytes(16).toString('base64');
insertNonce(nonce);
