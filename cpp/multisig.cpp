#include <bitcoin/bitcoin.hpp>
#include <boost/algorithm/string.hpp>

using namespace bc;
using namespace bc::wallet;
using namespace bc::machine;
using namespace bc::chain;

// for generating PrivKeys
ec_private get_private_key() {
  // Generate random bytes for Secret Key
  data_chunk seed(16);
  pseudo_random_fill(seed);
  ec_secret secretKey = bitcoin_hash(seed);

  // Encode Secret Key and create uncompressed Private Key
  std::string secretKeyHex = encode_base16(secretKey);
  ec_secret privKeyEncoded;
  decode_base16(privKeyEncoded, secretKeyHex);
  // mainnet = 0x8000
  // testnet = 0xef00
  wallet::ec_private privateKey(privKeyEncoded, 0x8000, false);
  return privateKey;
}

int main()
{	

  // Generate three different PrivKeys
  auto privateKey1 = get_private_key();
  auto privateKey2 = get_private_key();
  auto privateKey3 = get_private_key();

  // Derive three PubKeys from each PrivKey
  ec_compressed pubKey1, pubKey2, pubKey3;
  secret_to_public(pubKey1, privateKey1);
  secret_to_public(pubKey2, privateKey2);
  secret_to_public(pubKey3, privateKey3);

	data_stack keys {to_chunk(pubKey1), to_chunk(pubKey2), to_chunk(pubKey3)};
	
	script multiSig = script(script().to_pay_multisig_pattern(2, keys));
  // print payment address
  // mainnet_p2kh = 0x00;
  // mainnet_p2sh = 0x05;
  // testnet_p2kh = 0x6f;
  // testnet_p2sh = 0xc4;
	std::cout << "Address: " + payment_address(multiSig, 0x05).encoded() << '\n';
  // print multisig script
  auto multiSigString = multiSig.to_string(1);
  boost::to_upper(multiSigString);
	std::cout << "Script: " + multiSigString << '\n';

}