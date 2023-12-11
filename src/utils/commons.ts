export const WALLET_CONNECT_PROJECT_ID = "c42f3bc306ec86dfced234792c25351d";
export const NFT_ADDRESS = "0x4e317Ea63FBBC5006733e4D449c789F174a33ffC";

export function shortenAddress(address: string, chars = 4) {
  if (!address) return "";
  const prefix = address.substring(0, chars + 2); // +2 for "0x"
  const suffix = address.substring(address.length - chars);
  return `${prefix}...${suffix}`;
}
