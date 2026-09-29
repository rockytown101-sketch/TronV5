function isMatchingIncomingTransfer(tx,watched){return !!tx&&tx.type==='TransferContract'&&String(tx.to||'').toLowerCase()===String(watched||'').toLowerCase()&&String(tx.from||'').toLowerCase()!==String(watched||'').toLowerCase()&&/^[0-9a-fA-F]{64}$/.test(String(tx.txID||''))&&Number(tx.amountSun)>=0}
function shouldCreateIncomingTrigger(tx,watched,seen){return isMatchingIncomingTransfer(tx,watched)&&!seen.has(String(tx.txID).toLowerCase())}
module.exports={isMatchingIncomingTransfer,shouldCreateIncomingTrigger};
