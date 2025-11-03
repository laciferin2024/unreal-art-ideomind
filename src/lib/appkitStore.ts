// import { writable } from "svelte/store";
// import { createAppKit } from "@reown/appkit";
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
// import { defineChain } from "viem";
// import { PUBLIC_APPKIT_ID } from "$env/static/public";

// // 1. Define TypeScript types for the store
// export interface AppKitStore {
// 	modal: ReturnType<typeof createAppKit>;
// 	wagmiAdapter: WagmiAdapter;
// 	openConnectModal: () => void;
// 	openNetworkModal: () => void;
// }

// // 2. Get a project ID at https://cloud.reown.com
// const projectId = PUBLIC_APPKIT_ID;

// const torusTestnet = defineChain({
// 	id: 8194,
// 	name: "Torus Testnet",
// 	caipNetworkId: "eip155:8194",
// 	chainNamespace: "eip155",
// 	network: "torus-testnet",
// 	nativeCurrency: {
// 		decimals: 18,
// 		name: "Torus Ether",
// 		symbol: "TTQF"
// 	},
// 	rpcUrls: {
// 		default: {
// 			http: ["https://rpc.testnet.toruschain.com"],
// 			webSocket: ["wss://rpc.testnet.toruschain.com/ws"]
// 		},
// 		public: {
// 			http: ["https://rpc.testnet.toruschain.com"],
// 			webSocket: ["wss://rpc.testnet.toruschain.com/ws"]
// 		}
// 	},
// 	blockExplorers: {
// 		default: {
// 			name: "Torus Explorer",
// 			url: "https://testnet.toruscan.com"
// 		}
// 	}
// });

// // 3. Set up Wagmi adapter
// const wagmiAdapter = new WagmiAdapter({
// 	projectId,
// 	//@ts-ignore
// 	networks: [torusTestnet]
// });

// // 4. Configure the metadata
// const metadata = {
// 	name: "AppKit",
// 	description: "AppKit Example",
// 	url: "https://ideomind.org", // origin must match your domain & subdomain
// 	icons: ["https://ideomind.org/Icon-Black.png"]
// };

// // 5. Create the modal instance
// const modal = createAppKit({
// 	adapters: [wagmiAdapter],
// 	//@ts-ignore
// 	networks: [torusTestnet],
// 	metadata,
// 	projectId,
// 	features: {
// 		analytics: true // Optional - defaults to your Cloud configuration
// 	},
// 	themeVariables: {
// 		"--w3m-border-radius-master": "1px",
// 		"--w3m-accent": "#303d5b",
// 		"--w3m-color-mix": "#0f172a",
// 		"--w3m-color-mix-strength": 100
// 	}
// });

// // 6. Create the writable store
// export const appkitStore = writable<AppKitStore>({
// 	modal,
// 	wagmiAdapter,
// 	openConnectModal: () => modal.open(),
// 	openNetworkModal: () => modal.open({ view: "Networks" })
// });
