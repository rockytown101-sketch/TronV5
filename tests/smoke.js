const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.join(__dirname,'..');
for(const f of ['server/src/index.js','server/src/rules.js','server/src/store.js','server/src/watcher.js','server/src/chain-verifier.js','desktop/src/main.js','desktop/src/preload.js','desktop/src/permission-rules.js','desktop/src/transfer-watch-rules.js'])assert(fs.existsSync(path.join(root,f)),f);
const rules=require('../server/src/rules');assert.strictEqual(typeof rules.incomingNativeTransfer,'function');
const html=fs.readFileSync(path.join(root,'desktop/src/index.html'),'utf8');assert(!html.includes('signerAddresses:[]'));assert(html.includes('setInterval(()=>checkPending(false),10000)'));assert(html.includes("'x-api-key'"));
const idx=fs.readFileSync(path.join(root,'server/src/index.js'),'utf8');assert(idx.includes("req.get('x-internal-key')"));assert(idx.includes('chain.verifyCompleted'));
const cv=fs.readFileSync(path.join(root,'server/src/chain-verifier.js'),'utf8');assert(cv.includes('/wallet/gettransactionbyid'));assert(cv.includes('/wallet/getaccount'));assert(cv.includes('On-chain Active permissions do not match'));
console.log('V5.0.1 package smoke tests passed');
