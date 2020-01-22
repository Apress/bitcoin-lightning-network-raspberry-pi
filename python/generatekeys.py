#!/usr/bin/env python3

import bitcoin
from bitcoin.wallet import CBitcoinSecret, P2PKHBitcoinAddress  

bitcoin.SelectParams('testnet')

priv_key = 'cUHmPhwxCZN22yJP3orG1pgVSYrNcZtTB3KZMpPHXqyDnfFmzSF4' 

secret = CBitcoinSecret(priv_key)
public_key = secret.pub
p2pkh_address = P2PKHBitcoinAddress.from_pubkey(public_key)
scriptPubKey = p2pkh_address.to_scriptPubKey()
p2pkh_address2 = P2PKHBitcoinAddress.from_scriptPubKey(scriptPubKey)
print('P2PKH address based on public key: %s' % p2pkh_address)
print('P2PKH address based on scriptPubKey: %s' %  p2pkh_address2)
