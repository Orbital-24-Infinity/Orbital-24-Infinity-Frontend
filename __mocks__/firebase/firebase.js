export const auth = {
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
};

export const signInWithPopup = jest.fn();

export const googleProvider = {};

const mockFirebase = {
  auth: jest.fn(() => auth),
  GoogleAuthProvider: jest.fn(() => googleProvider),
};

export default mockFirebase;
