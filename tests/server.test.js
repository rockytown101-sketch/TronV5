const assert=require('assert');
const r=require('../server/src/rules');
const crypto=require('crypto');
function b58(buf){const alpha='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';let n=0n;for(const b of buf)n=(n<<8n)+BigInt(b);let out='';while(n){const q=n%58n;out=alpha[Number(q)]+out;n/=58n}for(const b of buf){if(b===0)out='1'+out;else break}return out}
function addr(fill){const body=Buffer.concat([Buffer.from([0x41]),Buffer.alloc(20,fill)]);const h=crypto.createHash('sha256').update(body).digest();const h2=crypto.createHash('sha256').update(h).digest();return b58(Buffer.concat([body,h2.subarray(0,4)]));}
const A=addr(7),B=addr(8),C=addr(9);
assert(r.isTronAddress(A)&&r.isTronAddress(B)&&r.isTronAddress(C));
const ops='0000000000400000000000000000000000000000000000000000000000000000';
assert(r.hasOperation({operations:ops},46));assert(!r.hasOperation({operations:ops},54));
const p={owner:{type:0,id:0,permission_name:'owner',threshold:2,keys:[{address:A,weight:1},{address:B,weight:1}]},actives:[{type:2,id:2,permission_name:'active0',threshold:2,operations:ops,keys:[{address:A,weight:1},{address:B,weight:1}]}]};
assert(r.validateTarget(p,[A,B]));
assert.throws(()=>r.validateTarget({...p,owner:{...p.owner,keys:[{address:A,weight:1},{address:A,weight:1}]}},[A,B]));
assert.throws(()=>r.validateTarget(p,[A,A]));
assert.throws(()=>r.currentOwnerAllows({threshold:3,keys:[{address:A,weight:1},{address:B,weight:1}]},A,B));
assert.strictEqual(r.incomingNativeTransfer({type:'TransferContract',from:A,to:B,txID:'a'.repeat(64),amountSun:1},B),true);
assert.strictEqual(r.incomingNativeTransfer({type:'TransferContract',from:B,to:B,txID:'a'.repeat(64),amountSun:1},B),false);
assert.strictEqual(r.incomingNativeTransfer({type:'TransferContract',from:A,to:B,txID:'a'.repeat(64),amountSun:0},B),false);
console.log('ROUND_TESTS_PASS');
