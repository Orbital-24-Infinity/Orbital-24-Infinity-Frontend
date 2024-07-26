import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Image from "next/image";
import React from "react";

// import { auth } from "../../../app/firebase/config";
// import fetch from "../__mocks__/fetch";
import { signInWithPopup } from "../__mocks__/firebase/auth";
import { useRouter } from "../__mocks__/next/navigation";
import LoginButton from "../components/firebase-auth/LoginButton";

jest.mock("../../../app/firebase/config", () => ({
  auth: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({ a: "b" }) })
  );
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

describe("Login", () => {
  describe("Render", () => {
    it("should have a logo", () => {
      // Arrange
      render(
        <Image
          src="/Project Infinity.png"
          alt="login-logo"
          width={1144}
          height={312}
          className="loginLogo"
        />
      );

      // Actions
      const logoImage = screen.getByAltText("login-logo");

      // Assert
      expect(logoImage).toBeInTheDocument();
    });
    it("should have a login button", () => {
      // Arrange
      render(
        <Image
          src="/Google-Sign-In.png"
          alt="login-google-logo"
          width={700}
          height={160}
        />
      );

      // Actions
      const loginImage = screen.getByAltText("login-google-logo");

      // Assert
      expect(loginImage).toBeInTheDocument();
    });
  });

  describe("Functionality", () => {
    it("should sign in with google", async () => {
      const mockSignInWithPopup = jest.fn().mockResolvedValue({
        user: { uid: "123", displayName: "Test User" },
      });
      signInWithPopup.mockImplementation(mockSignInWithPopup);

      const mockPush = jest.fn();
      useRouter.mockImplementation(() => ({
        push: mockPush,
      }));

      render(<LoginButton />);

      // Simulate button click
      const loginButton = screen.getByRole("button");
      fireEvent.click(loginButton);

      // Assertions
      await waitFor(() => {
        expect(mockSignInWithPopup).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/login", expect.any(Object));
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/dashboard");
      });
    });
  });
});
