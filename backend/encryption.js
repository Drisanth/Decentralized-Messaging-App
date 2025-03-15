import { SignalProtocolAddress, SessionBuilder, SessionCipher } from "@privacyresearch/libsignal";

const identityKeyPair = generateKeyPair();
const sessionBuilder = new SessionBuilder(identityKeyPair);

export function encryptMessage(message) {
    const cipher = new SessionCipher(sessionBuilder);
    return cipher.encrypt(message);
}

export function decryptMessage(encryptedMessage) {
    const cipher = new SessionCipher(sessionBuilder);
    return cipher.decrypt(encryptedMessage);
}
