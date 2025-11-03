import { defaultWagmiConfig, createWeb3Modal } from "@web3modal/wagmi";

import { getAccount, getChainId, reconnect, watchAccount, watchChainId } from "@wagmi/core";
import { readable, writable } from "svelte/store";
import { PUBLIC_APPKIT_ID } from "$env/static/public";

import { gnosis } from "viem/chains";
import { CUSTOM_WALLET } from "./constants";
import { torusTestnet } from "./customChain";

const projectId = PUBLIC_APPKIT_ID;

let storedCustomWallet;
if (typeof window !== "undefined") {
	storedCustomWallet = localStorage.getItem(CUSTOM_WALLET);
}

const customWallets = storedCustomWallet ? [JSON.parse(storedCustomWallet)] : undefined;

const metadata = {
	name: "unreal",
	description: "AI engine for media generation",
	url: "https://ideomind.org/",
	icons: ["https://ideomind.org/Icon-Black.png"]
};

export const chains = [gnosis, torusTestnet] as const;

export const wagmiConfig = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	enableCoinbase: false,
	enableInjected: true
});

reconnect(wagmiConfig);

createWeb3Modal({
	wagmiConfig,
	projectId,
	themeMode: "dark", // light/dark mode
	themeVariables: {
		//--w3m-font-family

		"--w3m-font-size-master": "8px", // Font size
		"--w3m-border-radius-master": "1px",
		"--w3m-accent": "#303d5b",
		"--w3m-color-mix": "#0f172a",
		"--w3m-color-mix-strength": 100
		// --w3m-z-index
	},
	featuredWalletIds: [],
	enableAnalytics: false,
	customWallets
});

export const chainId = readable(getChainId(wagmiConfig), (set) =>
	watchChainId(wagmiConfig, { onChange: set })
);
export const account = readable(getAccount(wagmiConfig), (set) =>
	watchAccount(wagmiConfig, { onChange: set })
);
export const provider = readable<unknown | undefined>(undefined, (set) =>
	watchAccount(wagmiConfig, {
		onChange: async (account) => {
			if (!account.connector) return set(undefined);
			set(await account.connector?.getProvider());
		}
	})
);

export const customWallet = writable({
	id: undefined,
	name: undefined,
	homepage: undefined,
	image_url: undefined,
	mobile_link: undefined,
	desktop_link: undefined,
	webapp_link: undefined,
	app_store: undefined,
	play_store: undefined
});

export const supported_chains = writable<string[]>([]);
