import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { KlaytnTestnet, Klaytn, BNBChain } from "@particle-network/chains";
import { ethers, toBeHex, Interface } from "ethers";
import { useAccount } from "@particle-network/connect-react-ui";

export const particleWallet = async (JWTToken) => {
    const particle = new ParticleNetwork({
        projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
        clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
        appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
        chainName: KlaytnTestnet.name,
        chainId: KlaytnTestnet.id,
    });

    const userProfile = await particle.auth.login({
        preferredAuthType: "jwt",
        account: JWTToken,
        hideLoading: true,
    });

    const account = await particle.evm.getAddress();
    const particleProvider = new ParticleProvider(particle.auth);
    const ethersProvider = new ethers.BrowserProvider(particleProvider, {
        name: "klaytn",
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    });
    const ethersSigner = await ethersProvider.getSigner();

    return {
        particle,
        account,
        walletProfile: userProfile,
        ethersProvider,
        ethersSigner,
    };
};
