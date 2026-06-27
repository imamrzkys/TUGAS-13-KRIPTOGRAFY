/**
 * verify-with-cryptojs.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Verification script — Imam Rizki Saputra (NIM 301230013)
 *
 * PURPOSE:
 *   Side-by-side comparison of our custom AES-128 implementation vs CryptoJS
 *   (industry-standard library) for report evidence (BAB IV.2).
 *
 * ⚠️  CryptoJS is used ONLY in this one-off script.
 *     It is NEVER imported inside src/ and is NOT part of the app logic.
 *
 * USAGE (from project root):
 *   node scripts/verify-with-cryptojs.js
 *
 * EXPECTED OUTPUT:
 *   Both "Our AES" and "CryptoJS AES" columns should show identical hex strings.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import CryptoJS from 'crypto-js';

// ─── Dynamic import of our own implementation ────────────────────────────────
// This runs from node (not Vite/browser), so we use a relative path.
// NOTE: This will throw "Not implemented" until you finish aes.js (Fase 8+9).

let ourEncrypt, ourDecrypt;
try {
  const aes = await import('../src/services/aes.js');
  ourEncrypt = aes.encrypt;
  ourDecrypt = aes.decrypt;
} catch (err) {
  console.error('❌  Could not import aes.js:', err.message);
  console.error('    → Finish implementing encrypt() and decrypt() first (Fase 8 & 9).');
  process.exit(1);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToBytes(hex) {
  const clean = hex.replace(/\s+/g, '');
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** CryptoJS AES-128 ECB, no padding — returns hex ciphertext for a 16-byte block */
function cryptoJsEncrypt(plaintextHex, keyHex) {
  const key       = CryptoJS.enc.Hex.parse(keyHex);
  const plaintext = CryptoJS.enc.Hex.parse(plaintextHex);
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.lib.WordArray.create(plaintext.words, 16),
    key,
    {
      mode:    CryptoJS.mode.ECB,
      padding: CryptoJS.pad.NoPadding,
    }
  );
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

/** CryptoJS AES-128 ECB, no padding — returns hex plaintext for a 16-byte block */
function cryptoJsDecrypt(ciphertextHex, keyHex) {
  const key        = CryptoJS.enc.Hex.parse(keyHex);
  const ciphertext = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex),
  });
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    mode:    CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
  });
  return decrypted.toString(CryptoJS.enc.Hex);
}

// ─── Test Vectors ─────────────────────────────────────────────────────────────

const vectors = [
  {
    label:      'FIPS-197 Official',
    key:        '000102030405060708090a0b0c0d0e0f',
    plaintext:  '00112233445566778899aabbccddeeff',
    ciphertext: '69c4e0d86a7b0430d8cdb78070b4c55a',
  },
  {
    label:      'FIPS-197 Appendix A.1 key',
    key:        '2b7e151628aed2a6abf7158809cf4f3c',
    plaintext:  '6bc1bee22e409f96e93d7e117393172a',
    ciphertext: '3ad77bb40d7a3660a89ecaf32466ef97',
  },
  {
    label:      'All-zeros',
    key:        '00000000000000000000000000000000',
    plaintext:  '00000000000000000000000000000000',
    ciphertext: '66e94bd4ef8a2c3b884cfa59ca342b2e',
  },
];

// ─── Run verification ────────────────────────────────────────────────────────

const SEP = '─'.repeat(88);
console.log('\n' + SEP);
console.log(' AES-128 CipherFlow — Verification vs CryptoJS');
console.log(' Imam Rizki Saputra | NIM 301230013');
console.log(SEP);

let allPass = true;

for (const v of vectors) {
  console.log(`\n▶ ${v.label}`);
  console.log(`  Key       : ${v.key}`);
  console.log(`  Plaintext : ${v.plaintext}`);

  // ── ENCRYPT ──────────────────────────────────────────────────────────────
  let ourEnc = '(not implemented)';
  try {
    const result = ourEncrypt(hexToBytes(v.plaintext), hexToBytes(v.key));
    ourEnc = bytesToHex(result);
  } catch (e) {
    ourEnc = `ERROR: ${e.message}`;
    allPass = false;
  }

  const cjsEnc = cryptoJsEncrypt(v.plaintext, v.key);
  const encMatch = ourEnc === cjsEnc;
  if (!encMatch) allPass = false;

  console.log(`\n  ENCRYPT`);
  console.log(`  Expected  : ${v.ciphertext}`);
  console.log(`  Our AES   : ${ourEnc}  ${encMatch ? '✅' : '❌'}`);
  console.log(`  CryptoJS  : ${cjsEnc}  ${cjsEnc === v.ciphertext ? '✅' : '❌ (CryptoJS mismatch?)'}`);

  // ── DECRYPT ──────────────────────────────────────────────────────────────
  let ourDec = '(not implemented)';
  try {
    const result = ourDecrypt(hexToBytes(v.ciphertext), hexToBytes(v.key));
    ourDec = bytesToHex(result);
  } catch (e) {
    ourDec = `ERROR: ${e.message}`;
    allPass = false;
  }

  const cjsDec = cryptoJsDecrypt(v.ciphertext, v.key);
  const decMatch = ourDec === cjsDec;
  if (!decMatch) allPass = false;

  console.log(`\n  DECRYPT`);
  console.log(`  Expected  : ${v.plaintext}`);
  console.log(`  Our AES   : ${ourDec}  ${decMatch ? '✅' : '❌'}`);
  console.log(`  CryptoJS  : ${cjsDec}  ${cjsDec === v.plaintext ? '✅' : '❌ (CryptoJS mismatch?)'}`);
}

console.log('\n' + SEP);
if (allPass) {
  console.log(' ✅  ALL TESTS PASSED — Our AES-128 matches CryptoJS on all vectors');
  console.log('     Screenshot this output and paste into Laporan BAB IV.2 (Tabel Verifikasi)');
} else {
  console.log(' ❌  SOME TESTS FAILED — Check your implementation in aes.js');
  console.log('     Run: npx vitest run src/services/aes.test.js  for detailed diff');
}
console.log(SEP + '\n');
