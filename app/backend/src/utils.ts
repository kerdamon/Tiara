import fs from "fs";
import path from "path";

export const publicRsaKey = loadRsaKeyFromFile("rsa_pub.pem");
export const privateRsaKey = loadRsaKeyFromFile("rsa_priv.pem");

function loadRsaKeyFromFile(filename: string) {
  const pathToKey = path.join(filename);
  return fs.readFileSync(pathToKey, "utf8");
}
