#include <bitcoin/bitcoin.hpp>
#include <string.h>
#include <iostream>

using namespace bc;
using namespace wallet;

int main(int argc, char** argv)
{

    // Generate random bytes for Secret Key
    data_chunk seed(16);
    pseudo_random_fill(seed);
    ec_secret secretKey = bitcoin_hash(seed);

    // Encode Secret Key and create uncompressed Private Key
    std::string secretKeyHex = encode_base16(secretKey);
    ec_secret privKeyEncoded;
    decode_base16(privKeyEncoded, secretKeyHex);
    // mainnet 0x8000, testnet 0xef00
    wallet::ec_private privateKey(privKeyEncoded, 0xef00, false);

    // Create PubKey from PrivKey
    ec_compressed pubKey;
    secret_to_public(pubKey, privateKey);

    // Generate PubKeyHash: first SHA256, then Hash160
    auto pubKeyHash = bitcoin_short_hash(pubKey);

    // Set address prefix (mainnet = 0x00, testnet = 0x6f)
    one_byte prefix = { { 0x6f } };

    // Setup address components 
    // Prefix + PubKey + Checksum (4-bytes)
    data_chunk rawAddress(to_chunk(prefix));
    extend_data(rawAddress, pubKeyHash);
    append_checksum(rawAddress);

    // Base58 encode byte sequence -> Bitcoin Address
    std::cout << encode_base58(rawAddress) << '\n';

    return 0;
}
