#!/usr/bin/env python3

import bitcoin
bitcoin.SelectParams('regtest')

from bitcoin.core import COIN, b2lx
import bitcoin.wallet
import bitcoin.rpc

rpc = bitcoin.rpc.Proxy()
addr = bitcoin.wallet.CBitcoinAddress('2NCbWGkCgntWxRJb3EKLiCBTZrGUm1LyBt9')

txid = rpc.sendtoaddress(addr, 10 * COIN)
print('Transaction created: %s' % b2lx(txid))

