import { sui_system, validator } from "@sentio/sdk/sui/builtin/0x3";

import { SuiNetwork, SuiObjectProcessor } from "@sentio/sdk/sui";
import { fountain_core as old_fountain } from "./types/sui/old_fountain.js";
import { fountain_core as sbuck_fountain } from "./types/sui/sbuck_fountain.js";
import { fountain as strap_fountain } from "./types/sui/strap_fountain.js";
import { buck_events } from "./types/sui/0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2.js";
import { getPriceBySymbol } from "@sentio/sdk/utils";

const SUI_CHAIN_ID = 101;
const INCENTIVE_CLAIM_DATA = "Incentive_Claim_Data";

old_fountain
  .bind({
    network: SuiNetwork.MAIN_NET,
    startCheckpoint: BigInt(6367003),
  })
  .onEventClaimEvent(async (event, ctx) => {
    const claimed_token_address = extractPackageId(event.type_arguments[1]);
    const [symbol, decimal] = tokenSymbolAndDecimal(claimed_token_address);
    const claimed_token_amount =
      Number(event.data_decoded.reward_amount) / 10 ** decimal;
    const timestamp = Number(event.timestampMs);
    const tokenPrice =
      (await getPriceBySymbol(symbol, new Date(timestamp))) ?? 1;
    ctx.eventLogger.emit(INCENTIVE_CLAIM_DATA, {
      timestamp,
      chain_id: SUI_CHAIN_ID,
      transaction_hash: ctx.transaction.digest,
      log_index: ctx.eventIndex,
      user_address: ctx.address,
      claimed_token_address,
      claimed_token_amount,
      claimed_token_usd: claimed_token_amount * tokenPrice,
      other_incentive_usd: 0,
    });
  });

sbuck_fountain
  .bind({
    network: SuiNetwork.MAIN_NET,
    startCheckpoint: BigInt(6367003),
  })
  .onEventClaimEvent(async (event, ctx) => {
    const claimed_token_address = extractPackageId(event.type_arguments[1]);
    const [symbol, decimal] = tokenSymbolAndDecimal(claimed_token_address);
    const claimed_token_amount =
      Number(event.data_decoded.reward_amount) / 10 ** decimal;
    const timestamp = Number(event.timestampMs);
    const tokenPrice =
      (await getPriceBySymbol(symbol, new Date(timestamp))) ?? 1;
    ctx.eventLogger.emit(INCENTIVE_CLAIM_DATA, {
      timestamp,
      chain_id: SUI_CHAIN_ID,
      transaction_hash: ctx.transaction.digest,
      log_index: ctx.eventIndex,
      user_address: ctx.address,
      claimed_token_address,
      claimed_token_amount,
      claimed_token_usd: claimed_token_amount * tokenPrice,
      other_incentive_usd: 0,
    });
  });

strap_fountain
  .bind({
    network: SuiNetwork.MAIN_NET,
    startCheckpoint: BigInt(6367003),
  })
  .onEventClaimEvent(async (event, ctx) => {
    const claimed_token_address = extractPackageId(event.type_arguments[1]);
    const [symbol, decimal] = tokenSymbolAndDecimal(claimed_token_address);
    const claimed_token_amount =
      Number(event.data_decoded.reward_amount) / 10 ** decimal;
    const timestamp = Number(event.timestampMs);
    const tokenPrice =
      (await getPriceBySymbol(symbol, new Date(timestamp))) ?? 1;
    ctx.eventLogger.emit(INCENTIVE_CLAIM_DATA, {
      timestamp,
      chain_id: SUI_CHAIN_ID,
      transaction_hash: ctx.transaction.digest,
      log_index: ctx.eventIndex,
      user_address: ctx.address,
      claimed_token_address,
      claimed_token_amount,
      claimed_token_usd: claimed_token_amount * tokenPrice,
      other_incentive_usd: 0,
    });
  });

function extractPackageId(str: string): string {
  return str.split("::")[0];
}

function tokenSymbolAndDecimal(tokenAddr: string): [string, number] {
  switch (tokenAddr) {
    case "0x2":
      return ["SUI", 9];
    default:
      return ["", 9];
  }
}
