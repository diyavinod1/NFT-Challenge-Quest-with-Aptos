module nft_challenge::nft_challenge {
    use std::signer;
    use std::string;
    use aptos_framework::object;
    use aptos_framework::property_map;
    use aptos_framework::token;

    struct NFTCollection has key {
        collection: token::Collection,
    }

    struct ChallengeNFT has key {
        nfts: object::Object,
    }

    const MAX_SUPPLY: u64 = 10000;
    const COLLECTION_NAME: vector<u8> = b"Funny Challenge NFTs";
    const COLLECTION_DESCRIPTION: vector<u8> = b"Collect hilarious NFTs by completing fun challenges!";

    public entry fun initialize_collection(owner: &signer) {
        let collection = token::create_collection(
            owner,
            string::utf8(COLLECTION_NAME),
            string::utf8(COLLECTION_DESCRIPTION),
            string::utf8(b"https://example.com/collection"),
            MAX_SUPPLY,
        );
        
        move_to(owner, NFTCollection {
            collection: collection,
        });
    }

    public entry fun mint_nft(
        owner: &signer,
        nft_name: vector<u8>,
        nft_description: vector<u8>,
        image_url: vector<u8>,
        rarity: u8,
    ) acquires NFTCollection {
        let owner_addr = signer::address_of(owner);
        
        if (!exists<NFTCollection>(owner_addr)) {
            initialize_collection(owner);
        };

        let nft_collection = borrow_global<NFTCollection>(owner_addr);
        
        let property_map = property_map::create();
        property_map::add(&mut property_map, string::utf8(b"rarity"), rarity);
        property_map::add(&mut property_map, string::utf8(b"image_url"), string::utf8(image_url));
        property_map::add(&mut property_map, string::utf8(b"challenge"), string::utf8(b"completed"));

        let token_name = string::utf8(nft_name);
        
        let minted_token = token::create_token(
            owner,
            nft_collection.collection,
            token_name,
            string::utf8(nft_description),
            1, // supply
            string::utf8(b"https://example.com/token"),
            signer::address_of(owner),
            0, // royalty points per million
            property_map,
        );

        // Transfer to minter
        let token_id = object::object_from_constructor(minted_token);
        token::direct_transfer(owner, token_id, owner_addr);
    }

    public fun get_user_nfts(user: address): vector<object::Object> {
        let user_tokens = token::get_token_ids(user);
        user_tokens
    }

    #[test]
    fun test_mint_nft() {
        let owner = @nft_challenge;
        let user = account::create_account_for_test(@0x123);
        
        aptos_framework::account::create_account(owner);
        aptos_framework::account::create_account(user);
        
        initialize_collection(&user);
        mint_nft(
            &user,
            b"Dancing Banana",
            b"A hilarious dancing banana NFT!",
            b"https://example.com/banana.gif",
            3
        );
    }
}
