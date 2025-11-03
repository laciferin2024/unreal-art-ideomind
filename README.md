# Ideomind

**Decentralised AI Studio & dePIN Gateway (SvelteKit)**

Ideomind is the original open-source codebase that powers Unreal AI’s early content-generation network. It combines a modern SvelteKit front-end with a lightweight API layer that orchestrates jobs on the *darts* decentralised compute network, stores outputs on IPFS / Filecoin and persists social data in Supabase.

> ⚠️  Ideomind is *feature-frozen*. Active product evolution happens in the private Unreal AI monorepo, but this repo remains the reference implementation for community forks and experimental PRs.

---

## ✨ Key Features

• **darts dePIN bridge** – submit AI inference jobs to community GPU nodes
• **Wallet-based auth** – EIP-191 nonces + `$UNREAL` token micro-payments
• **Supabase social graph** – profiles, posts, likes, follows
• **IPFS + Lighthouse** – content‐addressed asset uploads
• **SvelteKit UI** – 70+ shadcn-svelte components and Playwright E2E tests

---

## 🗺️ Directory Primer

```
ideomind/
├─ src/
│  ├─ lib/            shared TS modules (API client, state, web3)
│  ├─ routes/
│  │   ├─ darts/      POST  /darts      → run darts job locally & upload outputs
│  │   ├─ creations/  POST  /creations  → proxy to external API gateway
│  │   └─ api/        POST  /api        → simple axios passthrough example
│  └─ …               +layout.svelte, hooks, service-worker, etc.
├─ rest.http          human-readable collection of example HTTP calls
├─ darts/             (git-lfs) wasm / model blobs for local runners
├─ devops/            lighthouse certs, vercel.json, CI helpers
└─ utils/             local helper scripts (lh, install.sh, etc.)
```

---

## 🔌 Public HTTP Endpoints

| Path        | Method | Description                                        |
|-------------|--------|----------------------------------------------------|
| `/darts`    | POST   | Run a specified *darts* module against inputs.     |
|             | OPTIONS| CORS pre-flight (see example in `rest.http`).       |
| `/creations`| POST   | Proxy job to remote gateway + persist to Supabase. |
| `/api`      | POST   | Example shim that forwards JSON to `darts.decenterai.com` (see `src/routes/api/+server.ts`). |

### Example (`rest.http`)

```http
POST {{u}}/darts
Content-Type: application/json

{
  "module": "cowsay",
  "version": "v0.1.3",
  "inputs": {
    "Message": "Hello from Ideomind"
  }
}
```

---

## 🛠️  Tech Stack

- **Frontend**  : SvelteKit 2, Tailwind CSS, shadcn-svelte
- **Backend**   : SvelteKit server routes (TypeScript), Axios
- **Auth**      : Supabase + EIP-191 wallet signature
- **Storage**   : IPFS / Lighthouse, Postgres (via Supabase)
- **Compute**   : darts CLI / dePIN GPU swarm
- **CI/CD**     : Vercel preview deploys, Playwright tests

---

## 🧩 Environment Variables (excerpt)

| Variable                 | Purpose                               |
|--------------------------|---------------------------------------|
| `PUBLIC_API_URL`         | Gateway URL that `/creations` proxies |
| `DARTS_PRIVATE_KEY`      | Wallet key for local darts execution  |
| `VITE_PINATA_JWT`        | Pinata upload token                   |

Full list in `.env.example`.

---

## 🤝 Contributing

1. Fork → branch → PR.  Small, focused changes are easier to review.
2. Ensure `pnpm lint` & tests pass.
3. Add context in the PR description (what / why).

Security disclosures: **security@unreal.ai**

---

## 📜 License

MIT © Hiro & Unreal AI contributors


A decentralized AI content-generation studio and dePIN gateway.

Ideomind is the open-source predecessor of **Unreal AI**, built to democratize generative AI by combining SvelteKit ergonomics with decentralized GPU compute ("darts"), tokenised access, and a web-first creator experience.

## ✨ Highlights

- Unified text-to-anything workspace (text, image, code)
- Plug-and-play AI inference API — still powering Unreal AI’s network
- On-chain wallet auth and micro-payments (ERC-20 $UNREAL token)
- **darts dePIN**: route intensive jobs to community GPUs with provable accounting
- 70+ headless UI components (shadcn-svelte)
- Supabase-backed user profiles, likes & social graph
- End-to-end tests with Playwright and automated Vercel previews

## 🏗️ Architecture

```text
ideomind/
 ├─ src
 │  ├─ lib/          # shared logic, state, blockchain, api clients
 │  ├─ routes/       # SvelteKit pages + server/API endpoints
 │  ├─ app.html      # root html shell
 │  └─ service-worker.js
 ├─ darts/           # model checkpoints & wasm blobs (git-lfs)
 ├─ utils/           # helper scripts
 └─ devops/          # CI/CD, Docker, Vercel, Lighthouse
```

Key services:

1. **Supabase** – auth & database
2. **Lighthouse / Filecoin** – decentralized asset storage
3. **Ethereum / Torus mainnet** – payments & staking
4. **darts nodes** – distributed GPU runners

## 🔌 Public APIs (excerpt)

Ideomind exposes REST-flavoured endpoints under `/api/*`. Unreal AI currently reverse-proxies these for compute operations.

| Route               | Method | Purpose                     |
| ------------------- | ------ | --------------------------- |
| `/api/inference`    | POST   | Submit a generation job     |
| `/api/job/{id}`     | GET    | Stream job status & outputs |
| `/api/wallet/nonce` | POST   | EIP-191 login nonce         |

## 🗺️ Project Status

Ideomind is feature-frozen; active development continues in the [Unreal AI](https://github.com/unreal-art/v0) repo. Bug-fix PRs are welcome.

## 🤝 Contributing

1. Fork and create a feature branch.
2. Follow the style guide: `pnpm lint` & `prettier`.
3. Open a PR describing the change and its impact.

Security issues? Email **hiro@ideomind.org**.

## ⚖️ License

MIT © Hiro & Unreal AI contributors
