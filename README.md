# Exploring different mempool listening methods

See https://docs.google.com/document/d/1PVvGDPbHqi6QsRlVM-NVp3v-LZcPAP9nhBrgs8yxLTo/edit?usp=sharing

## Direct json-rpc eth_subscribe to Alchemy's websocket endpoint
Start by opening a wscat connection to alchemy's ws endpoint
```
> wscat -c wss://polygon-mainnet.g.alchemy.com/v2/NxTkQmyNwsDjOj4oZB3RA13r_9klxb1e
```
Now there are 3 call with different levels of information
1. [Get pending tx hashes only](https://docs.alchemy.com/alchemy/guides/using-websockets#3.-newpendingtransactions)
```
> {"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}
```

2. [Get full tx info](https://docs.alchemy.com/alchemy/guides/using-websockets#1.-alchemy_newfullpendingtransactions)
```
> {"jsonrpc":"2.0","id": 2, "method": "eth_subscribe", "params": ["alchemy_newFullPendingTransactions"]}
```
3. [Also filter on an address](https://docs.alchemy.com/alchemy/guides/using-websockets#2.-alchemy_filterednewfullpendingtransactions)
Here we filter on quickswap router
```
> {"jsonrpc":"2.0","id": 1, "method": "eth_subscribe", "params": ["alchemy_filteredNewFullPendingTransactions", {"address": "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"}]}
```

Alchemy adds
> There is a limit of 20,000 websocket connections per API Key as well as 1,000 parallel websocket subscriptions per websocket connection, creating a maximum of 20 million subscriptions per application.

We won't bother with the other free node providers for now

## ethers.js



## web3.js

Also explore the [alchemy extension](https://docs.alchemy.com/alchemy/guides/using-websockets#with-web3) for web3.js