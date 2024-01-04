import React, { useRef, useState } from 'react';
import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nftName, setNftName] = useState<string>("");
  const [nftDescription, setNftDescription] = useState<string>("");
  const [mintingNFT, setMintingNFT] = useState<boolean>(false);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setImageUrl(null);
  };

  const handleMint = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      console.error("No file selected");
      return;
    }
  
    setMintingNFT(true);
    try {
      const formData = new FormData();
      formData.append('name', nftName);
      formData.append('description', nftDescription);
      formData.append('image', fileInputRef.current.files[0]);
      formData.append('address', address || '');
  
      const response = await fetch("/api/mintNFT", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      // Handle successful response
      console.log("NFT minted:", data);
    } catch (error) {
      console.error("Minting error:", error);
    } finally {
      alert("NFT minted!");
      setMintingNFT(false);
      setImageUrl(null);
      setNftName("");
      setNftDescription("");
    }
  };
  

  return (
    <div className={styles.container}>
      {address ? (
        <div className={styles.minterContainer}>
          <div className={styles.mintContainerSection}>
            <h1>NFT Media</h1>
            <div 
              className={styles.fileContainer} 
              onClick={handleFileSelect}
            >
              <input
                type="file"
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              {!imageUrl ? (
                <div
                  style={{ 
                    border: '2px dashed grey', 
                    padding: '20px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',    
                  }}
                >
                  <p>Click to add file</p>
                </div>
              ) : (
                <div style={{ height: "100%" }}>
                  <MediaRenderer
                    src={imageUrl}
                    height='100%'
                    width='100%'
                  />
                  <button 
                    onClick={reset}
                    className={styles.resetButton}
                  >Reset</button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.mintContainerSection}>
            <h1>NFT Metadata</h1>
            <p>NFT Name:</p>
            <input 
              type="text"
              placeholder="My NFT Name"
              onChange={(e) => setNftName(e.target.value)}
              value={nftName}
              className={styles.metadataInput}
            />
            <p>NFT Description:</p>
            <input 
              type="text"
              placeholder="This NFT is about..."
              onChange={(e) => setNftDescription(e.target.value)}
              value={nftDescription}
              className={styles.metadataInput}
            />
            <button
              className={styles.mintButton}
              onClick={handleMint}
              disabled={mintingNFT}
            >{mintingNFT ? "Minting NFT..." : "Mint NFT"}</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Sign in to mint an NFT</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
