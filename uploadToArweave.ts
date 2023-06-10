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

  // Upload image to Arweave
  const data = fs.readFileSync("../file.png");

  // const transaction = await arweave.createTransaction({
  //   data: data,
  // });

  // transaction.addTag("Content-Type", "image/png");

  // await arweave.transactions.sign(transaction, { wallet-here });

  // const response = await arweave.transactions.post(transaction);
  // console.log(response);

  // const imageUrl = transaction.id
  //   ? `https://arweave.net/${transaction.id}`
  //   : undefined;

  // Upload metadata to Arweave

  const metadata = {
    name: "test",
    symbol: "test",
    description: "test",
    image: "test",
  };

  const metadataRequest = JSON.stringify(metadata);

  const transaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  transaction.addTag("Content-Type", "application/json");

  await arweave.transactions.sign(transaction, {
    "wallet-here": "wallet-here",
  });

  const response = await arweave.transactions.post(transaction);

  const metadataUrl = transaction.id
    ? `https://arweave.net/${transaction.id}`
    : undefined;

  console.log(metadataUrl);
})();
