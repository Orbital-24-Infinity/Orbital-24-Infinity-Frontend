import "@testing-library/jest-dom";

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Image from "next/image";
import React from "react";

// import { auth } from "../../../app/firebase/config";
// import fetch from "../__mocks__/fetch";
import Dashboard from "../app/dashboard/page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
}));

jest.mock("@/app/firebase/config", () => ({
  auth: jest.fn(),
}));

jest.mock("react-firebase-hooks/auth", () => ({
  useAuthState: jest.fn(() => [
    {
      uid: "XcgIFBXmeDbxOfjY69WpE3GjgrK2",
      email: "orbital6039@gmail.com",
      emailVerified: true,
      displayName: "Orbital-6039",
      isAnonymous: false,
      photoURL:
        "https://lh3.googleusercontent.com/a/ACg8ocIiW079YpihkbMN7sDyWyqw-0JOLFouDmMbMXTeqKZiy630Kw=s96-c",
      providerData: [
        {
          providerId: "google.com",
          uid: "104749625663491906291",
          displayName: "Orbital-6039",
          email: "orbital6039@gmail.com",
          phoneNumber: null,
          photoURL:
            "https://lh3.googleusercontent.com/a/ACg8ocIiW079YpihkbMN7sDyWyqw-0JOLFouDmMbMXTeqKZiy630Kw=s96-c",
        },
      ],
      stsTokenManager: {
        refreshToken:
          "AMf-vBzN5BQy3tXcePtgZQ_K1ytaqob9_A8Hou-W5bJaOFCB8MQCV2lxZg3tv2S8q1yPMLEemKvcBddwrqan-GF7gu-mzlLaH7ErzpXB4_gMf9dDvlaYs6SvfmOR-Y5_0jku-Fw1R-6PHjknXncN9BAR-lNGXaYEAbwPQvSTt8QMWD6fcU0NH_-Y-WqmOtujHBb2zUMCAFfN9vipWVmMQR2leHvTjyIkx8dd61G37d9kFUNNI415Q06osdneRdcXni8wNKH0uvzF7VhfCAGVl5jBNy1M5MCDl6aEhrLqS1E4C8cGXLJZZQgkmoihbVxmZcVsRw5mxi9JEZP2ifJ80B5X5F0EPZpKn0bNR2WRPD2X9_v7i24kKJdGIiCkUiJbLVV0erPYWGS-x79QTL5wtpzuFdgfuSdJfXexAlAQGvnpY-bcyh8Rehx7IdOvvUSclf8yefcgCkNG",
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiT3JiaXRhbC02MDM5IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lpVzA3OVlwaWhrYk1ON3NEeVd5cXctMEpPTEZvdURtTWJNWFRlcUtaaXk2MzBLdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9vcmJpdGFsLWRldi1kOTQ0OSIsImF1ZCI6Im9yYml0YWwtZGV2LWQ5NDQ5IiwiYXV0aF90aW1lIjoxNzIxOTY3NTg1LCJ1c2VyX2lkIjoiWGNnSUZCWG1lRGJ4T2ZqWTY5V3BFM0dqZ3JLMiIsInN1YiI6IlhjZ0lGQlhtZURieE9malk2OVdwRTNHamdySzIiLCJpYXQiOjE3MjE5ODY2NjYsImV4cCI6MTcyMTk5MDI2NiwiZW1haWwiOiJvcmJpdGFsNjAzOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDc0OTYyNTY2MzQ5MTkwNjI5MSJdLCJlbWFpbCI6WyJvcmJpdGFsNjAzOUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.Fpfeo4PvYp_Z-JiahP3YH0FZSZY5oPiAnDwJC-c0oc2VtWSoGp7HLrs18QXM3_956Idgp09zFAq7fdsGlADjIE89GoxqZ3dvQyjIBTjsjekfPWfZamF8KJSXOMS-Xx4_ID16H2E_W0qiQqD5166oO_M_86pbywsSgDQ2OGdDfNPTsCJ3A_T6_FcNilFDtqnsEukMliu95zPhagFJaXV3ZnBDNApJOU2KV9iRcRdkpZGJmvXtX3Jua1xmYPkg3SL-LlPdUNbKGBzzosHhfdjdccLxt87BMqPZxw6r6X8qWU8WndlGHIL5JUfbZ4cjZXsOpMzQd8tBg6356Wj8hYOivg",
        expirationTime: 1721990265944,
      },
      createdAt: "1717309694649",
      lastLoginAt: "1721967585401",
      apiKey: "AIzaSyCccDQhKvQwlkphe_iTykt7sQlLmYcOaUU",
      appName: "[DEFAULT]",
    },
    false,
    undefined,
  ]),
}));

// jest.mock("firebase/auth", () => ({
//   GoogleAuthProvider: jest.fn(),
//   signInWithPopup: jest.fn(),
// }));

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/api/topics/retrieve") {
      return Promise.resolve({ json: () => Promise.resolve([]) });
    } else if (url === "/api/authentication") {
      return Promise.resolve({ json: () => Promise.resolve({ valid: true }) });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

describe("Dashboard", () => {
  describe("Render", () => {
    it("should be empty", async () => {
      // Arrange
      render(<Dashboard />);

      // Actions

      // Assert
      // await waitFor(() => {
      await waitFor(async () => {
        const emptyText = await screen.findByText(
          "It's rather empty here... What if you tried to click the New Topic button below?"
        );
        expect(emptyText).toBeInTheDocument();
      });
      // });
    });
  });

  describe("Functionality", () => {});
});
