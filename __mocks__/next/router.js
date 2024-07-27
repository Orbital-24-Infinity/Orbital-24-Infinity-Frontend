// __mocks__/next/router.js
import { jest } from '@jest/globals';

const useRouter = jest.fn();
const redirect = jest.fn();

export { redirect, useRouter };
