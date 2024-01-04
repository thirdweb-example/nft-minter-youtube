import { MediaRenderer, shortenIfAddress } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";

type NFTCardProps = {
    nft: NFT;
};

export const NFTCard = ({ nft }: NFTCardProps) => {
    return (
        <div className={styles.nftCardContainer}>
            <MediaRenderer
                src={nft.metadata.image}
            />
            <div style={{ padding:"0.5rem"}}>
                <h2>{nft.metadata.name}</h2>
                <p>Owned by: {shortenIfAddress(nft.owner)}</p>
            </div>
        </div>
    )
};