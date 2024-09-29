import crypto from "crypto";

export class AuthUtils {
  static generatePasswordHash(password: string) {
    var salt = crypto.randomBytes(32).toString("hex");
    var passwordHash = AuthUtils.hashPassword(password, salt);

    return {
      salt,
      passwordHash,
    };
  }

  // todo pzareba: private needed?
  static hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
  }
}
