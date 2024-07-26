import * as crypto from "crypto";

export function saltAndHashPassword(password: string): string {
  // In this case, we assume the salt is stored with the hashed password
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  // Return the salt and hash combined
  return `${salt}:${hash}`;
}

// You'll also need a function to verify the password
export function verifyPassword(
  storedPassword: string,
  inputPassword: string,
): boolean {
  const [salt, originalHash] = storedPassword.split(":");
  const hash = crypto
    .pbkdf2Sync(inputPassword, salt!, 1000, 64, "sha512")
    .toString("hex");
  return hash === originalHash;
}
