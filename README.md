# AES-128 CipherFlow Simulator

> **Tugas 13 — Kriptografi | Universitas Nusa Putra**
> Imam Rizki Saputra · NIM 301230013

Interactive step-by-step visualization of the AES-128 (Advanced Encryption Standard) block cipher, built with React + Vite. See every transformation — SubBytes, ShiftRows, MixColumns, AddRoundKey — and the full Key Expansion schedule round by round.

---

## 🔗 Links

| Resource | URL |
|---|---|
| Live App | _[deploy ke .my.id — isi setelah hosting]_ |
| GitHub | _[isi repo URL di sini]_ |
| Video Demo | _[isi YouTube URL di sini]_ |

---

## ✨ Features

- **Full AES-128 Encrypt & Decrypt** — 10 rounds, column-major state
- **Step-by-step navigation** — setiap operasi ditampilkan before/after
- **Key Expansion View** — W[0]..W[43] dengan g-function detail (RotWord, SubWord, XOR Rcon) untuk setiap round key
- **FIPS-197 Test Vector** pre-loaded — satu klik untuk verifikasi
- **Encrypt ↔ Decrypt toggle** — mode dapat dipilih di ConfigPanel
- **Dark mode support** — mengikuti sistem OS

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + Vite 8 |
| State Management | Zustand 5 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v3 |
| Testing | Vitest |
| AES Verification | CryptoJS (dev-only script, tidak masuk app) |
| Deploy | Netlify |

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone <repo-url>
cd stitch_aes_128_cipherflow_simulator

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Run tests (setelah implementasi aes.js selesai)
npm test

# 5. Verify vs CryptoJS (bukti laporan BAB IV.2)
npm run verify

# 6. Production build
npm run build
```

---

## 📁 Project Structure

```
src/
├── services/
│   ├── sbox.js          # AES S-Box & Inv S-Box (256 entries each) ✅
│   ├── rcon.js          # Round constants RCON[1..10] ✅
│   ├── galois.js        # GF(2^8) multiplication — gmul() ✍️
│   ├── aes.js           # Core AES functions ✍️
│   └── aes.test.js      # Vitest harness — FIPS-197 test vector ✅
├── store/
│   └── simulatorStore.js  # Zustand store with onStep wiring ✅
├── components/simulator/
│   ├── ConfigPanel.jsx      # Encrypt/Decrypt input + mode toggle ✅
│   ├── RoundStepper.jsx     # Step navigation ✅
│   ├── KeyExpansionView.jsx # W[0..43] + g-function visualization ✅
│   ├── StateMatrix.jsx      # 4×4 hex grid ✅
│   ├── OperationAccordion.jsx # Operation description panel ✅
│   └── LaboratoryInsight.jsx  # Contextual info banner ✅
└── pages/
    ├── Home.jsx
    ├── HowItWorks.jsx
    └── Simulator.jsx    # Main simulation page ✅

scripts/
└── verify-with-cryptojs.js  # One-off CryptoJS comparison ✅
```

Legend: ✅ done | ✍️ student implements (Fase 2–9)

---

## 🧮 AES-128 Implementation Notes

The core algorithm (Fase 2–9) is implemented by the student in `galois.js` and `aes.js`:

| Function | File | Fase |
|---|---|---|
| `gmul(a, b)` | galois.js | 2 |
| `subBytes / invSubBytes` | aes.js | 3 |
| `shiftRows / invShiftRows` | aes.js | 4 |
| `mixColumns / invMixColumns` | aes.js | 5 |
| `addRoundKey` | aes.js | 6 |
| `keyExpansion` | aes.js | 7 |
| `encrypt` | aes.js | 8 |
| `decrypt` | aes.js | 9 |

**State layout:** Column-major (FIPS-197 convention).
Flat index `i` → `row = i % 4`, `col = Math.floor(i / 4)`.

**Test vector (FIPS-197 Appendix B):**
```
Key:       000102030405060708090a0b0c0d0e0f
Plaintext: 00112233445566778899aabbccddeeff
Expected:  69c4e0d86a7b0430d8cdb78070b4c55a
```

---

## 📋 Checklist Tugas

- [ ] `gmul` lolos `gmul(0x57, 0x83) === 0xC1`
- [ ] `keyExpansion` W[4] = `a0fafe17` (FIPS-197 Appendix A.1)
- [ ] `encrypt` + `decrypt` lolos `npm test` (FIPS-197 vector)
- [ ] `npm run verify` output sama persis dengan CryptoJS
- [ ] Key Expansion View menampilkan W[0..43] real (setelah wiring onStep)
- [ ] UI responsif & dark mode OK
- [ ] Perhitungan manual (Key Exp. min 2 RK + Round 1) nilai cocok dengan app
- [ ] Video demo ≥10 menit
- [ ] Laporan lengkap + semua link

---

## 🏛 Referensi

- FIPS-197: Advanced Encryption Standard — https://csrc.nist.gov/publications/detail/fips/197/final
- Stallings, W. — *Cryptography and Network Security* (5th ed.), Ch. 5
- Slide Kuliah Kriptografi — Pertemuan 13 (AES)
