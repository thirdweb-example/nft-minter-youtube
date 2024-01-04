import { useContract, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NFT_COLLECTION_CONTRACT_ADDRESS } from "../constants/constants";
import { NFTCard } from "../components/NFTCard";

const CollectionPage = () => {
    const { contract } = useContract(NFT_COLLECTION_CONTRACT_ADDRESS);

    const { data: nfts } = useNFTs(contract);

    return (
        <div className={styles.container}>
            <h1>Collection</h1>
            <div className={styles.grid} style={{ marginBottom: "1rem"}}>
                {nfts && nfts.length > 0 ? (
                    nfts.map((nft) => (
                        <NFTCard
                            key={nft.metadata.id}
                            nft={nft}
                        />
                    ))
                ) : (
                    <p>No NFTs found</p>
                )}
            </div>
        </div>
    )
};

export default CollectionPage;