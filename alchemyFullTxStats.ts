import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getDefaultLogger } from "./logger";
const logger = getDefaultLogger();

if (!process.env.ALCHEMY_WSS_ENDPOINT) {
  console.log('Please first run "export ALCHEMY_WSS_ENDPOINT=..."');
  process.exit(1);
}
const web3 = createAlchemyWeb3(process.env.ALCHEMY_WSS_ENDPOINT);

const fullTxsSub = web3.eth.subscribe(
  "alchemy_fullPendingTransactions",
  async function (error, tx) {
    if (error) {
      logger.error(error);
    }
    txStats.numTxs += 1;
    if (tx.blockNumber != null) {
      txStats.numTxsAlreadyMined += 1;
    }
    const queriedTx = await web3.eth.getTransaction(tx.hash);
    if (queriedTx == null) {
      txStats.numTxsNotFound += 1;
    }
  }
);

const txStats = {
  numTxs: 0,
  numTxsNotFound: 0,
  numTxsAlreadyMined: 0,
};
function logTxStats() {
  const txsNotFoundPerc = (
    (txStats.numTxsNotFound / txStats.numTxs) *
    100
  ).toFixed(1);
  const txsAlreadyMinedPerc = (
    (txStats.numTxsAlreadyMined / txStats.numTxs) *
    100
  ).toFixed(1);
  logger.info(
    `numTxs: ${txStats.numTxs}, ` +
      `numTxsAlreadyMined: ${txStats.numTxsAlreadyMined} (${txsAlreadyMinedPerc}%), ` +
      `numTxsNotFound: ${txStats.numTxsNotFound} (${txsNotFoundPerc}%)`
  );
}

setInterval(() => {
  logTxStats();
}, 1000);
