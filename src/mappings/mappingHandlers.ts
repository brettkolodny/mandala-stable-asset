import {
  SubstrateExtrinsic,
} from "@subql/types";
import { Account } from "../types";

async function createAccount(address: string, blockNum: bigint) {
    const account = await Account.get(address);
    
    if (!account) {
        const newAccount = new Account(address);
        newAccount.blockNumber = blockNum;
        await newAccount.save();
    }
}

export async function handleStableAssetCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const blockNum = BigInt(extrinsic.block.block.header.toString());
    const callerAddress = extrinsic.extrinsic.signer.toString();

    await createAccount(callerAddress, blockNum);
}
