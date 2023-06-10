import * as fs from "fs";
import Arweave from "arweave";

(async () => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  // Upload JSON to Arweave

  // Upload metadata to Arweave
  var imageUrl = "";
  let metadata: String = "";

  metadata = metadata.trim();

  console.log(metadata);
  const metadataRequest = JSON.parse(JSON.stringify(metadata));

  const metadataTransaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  metadataTransaction.addTag("Content-Type", "application/json");
  await arweave.transactions.sign(metadataTransaction, {
    "wallet-here": "wallet-here",
  });

  let response = await arweave.transactions.post(metadataTransaction);
  console.log(response);
})();
