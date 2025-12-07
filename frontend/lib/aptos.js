import { AptosClient } from 'aptos';

const APTOS_NODE_URL = 'https://fullnode.testnet.aptoslabs.com/v1';
const client = new AptosClient(APTOS_NODE_URL);

const MODULE_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS';

export const mintNFT = async (userAddress, nftData) => {
  if (!window.aptos) {
    throw new Error('Petra wallet not installed');
  }

  const transaction = {
    type: 'entry_function_payload',
    function: `${MODULE_ADDRESS}::nft_challenge::mint_nft`,
    arguments: [
      nftData.name,
      nftData.description,
      nftData.image_url,
      nftData.rarity
    ],
    type_arguments: []
  };

  const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);
  const result = await client.waitForTransactionWithResult(pendingTransaction.hash);
  
  return result;
};

export const getUserNFTs = async (userAddress) => {
  try {
    const resources = await client.getAccountResources(userAddress);
    // Parse NFT data from account resources
    // This would need to match your contract structure
    return [];
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
};
