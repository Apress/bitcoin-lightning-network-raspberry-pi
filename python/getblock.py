#!/usr/bin/env python3

import bitcoin
import bitcoin.rpc

bitcoin.SelectParams('testnet')

proxy = bitcoin.rpc.Proxy()

block = proxy.getblock(proxy.getblockhash(10000))
print(block)
