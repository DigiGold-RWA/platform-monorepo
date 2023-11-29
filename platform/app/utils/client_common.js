import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { KlaytnTestnet, Klaytn } from "@particle-network/chains";
import { ethers } from "ethers";

export const particleWallet = async (JWTToken) => {
    const particle = new ParticleNetwork({
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
        chainName: KlaytnTestnet.name,
        chainId: KlaytnTestnet.id,
    });

    try {
        const userProfile = await particle.auth.login({
            preferredAuthType: "jwt",
            account: JWTToken,
            hideLoading: true,
        });

        const account = await particle.evm.getAddress();
        const particleProvider = new ParticleProvider(particle.auth);
        const ethersProvider = new ethers.BrowserProvider(particleProvider, {
            name: "klaytn",
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        });
        const ethersSigner = await ethersProvider.getSigner();

        return {
            particle,
            account,
            walletProfile: userProfile,
            ethersProvider,
            ethersSigner,
        };
    } catch (error) {
        if (error.message === "Thirdparty auth error") {
            window.location.assign("/api/auth/logout"); //Logout
        }
        console.log(error.message);
    }
};

export const getData = async (uri) => {
    const response = await fetch(uri);
    if (response.status === 200) {
        return response.json();
    } else {
        return false;
    }
};

export const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
