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
import { redirect, useRouter } from "../__mocks__/next/navigation";
import Topic from "../app/topic/[id]/page";

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

let mockOriginalPush = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({ push: mockOriginalPush })),
  useParams: jest.fn(() => ({ id: 2 })),
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
      email: "orbital6039@gmail.com",
    },
    false,
    undefined,
  ]),
}));

let validAuthentication = false;

const lorem = `Lorem ipsum odor amet, consectetuer adipiscing elit. Risus ad volutpat sodales dapibus fames ante. Auctor posuere tincidunt ullamcorper eros turpis gravida. Eros felis pulvinar dis fermentum dui dictumst felis. Elit hac finibus luctus dapibus   integer quis nibh eget. Ut turpis egestas nullam ridiculus integer pretium pretium? Placerat adipiscing sodales hac; cras fermentum ipsum at sagittis. Diam malesuada nisi montes velit class varius vitae varius. Est ligula viverra bibendum posuere pharetra.

          Tortor erat platea tincidunt dignissim sem mollis? Diam metus erat proin et purus. Non hendrerit congue, suscipit quam quis mus sodales vulputate. Parturient sed augue facilisis fusce a velit malesuada. Mollis bibendum vestibulum metus massa in donec ullamcorper feugiat. Ullamcorper eleifend tristique tristique vestibulum enim ad sem justo.

          Nullam pretium varius id scelerisque platea convallis vehicula massa volutpat. Finibus efficitur adipiscing finibus turpis consequat. Nam sit eu non ornare elementum egestas odio? Dolor penatibus elit venenatis sed aliquet diam nibh penatibus. Lacus mollis quisque maximus eleifend laoreet orci a cras. Habitant dignissim fermentum lobortis torquent quam interdum vestibulum. Semper ante condimentum dis primis adipiscing neque platea purus class. Cubilia augue magna vulputate feugiat conubia fusce. Magna aliquet vitae posuere nec cras, morbi dis maximus eget.

          Ligula tempus condimentum egestas et hendrerit integer. Torquent sem taciti per mattis ex montes et? Libero morbi ullamcorper bibendum purus inceptos sollicitudin pretium. Et id arcu fringilla maximus lacinia efficitur mattis. Facilisi nisl nulla magna lectus dapibus netus dis. Senectus tempor lobortis sagittis curae ridiculus praesent. Vel potenti nunc justo fames torquent litora aliquet. Per finibus placerat quis turpis penatibus.

          In rhoncus vitae rutrum semper nisi malesuada porttitor. Quisque dis luctus lacus aptent bibendum torquent. Auctor finibus venenatis inceptos mattis vestibulum facilisi finibus vivamus. Condimentum finibus hendrerit arcu sit parturient metus. Cubilia porttitor duis montes natoque proin nisi. Elit ipsum ante feugiat inceptos bibendum nunc. Neque aptent phasellus egestas lobortis posuere dui vitae placerat. Ut nam faucibus sollicitudin tellus dis arcu. Pharetra platea parturient laoreet mi mattis ante.`;

const singleTruncatedContent = [
  {
    data: lorem,
    files: ["file3.pdf", "file4.txt"],
    lastModified: new Date(),
    questions: [
      {
        id: 0,
        marked: false,
        mrq: false,
        openEnded: false,
        question: "What is the main objective in sample statistic?",
        refData:
          " Sample statistic   =   population parameter + bias + random error ; bias eliminated through SRS.",
        selected: -1,
        topicID: 2,
      },
      {
        id: 1,
        marked: false,
        mrq: false,
        openEnded: false,
        question: "What is the main objective in sample statistic?",
        refData:
          " Sample statistic   =   population parameter + bias + random error ; bias eliminated through SRS.",
        selected: -1,
        topicID: 2,
      },
      {
        id: 2,
        marked: false,
        mrq: false,
        openEnded: false,
        question: "What is the main objective in sample statistic?",
        refData:
          " Sample statistic   =   population parameter + bias + random error ; bias eliminated through SRS.",
        selected: -1,
        topicID: 2,
      },
    ],
    questionsAttempted: 0,
    questionsOptions: [
      [
        {
          correct: false,
          id: 0,
          option: "A. To detect trends",
          questionID: 0,
        },
        {
          correct: true,
          id: 1,
          option: "B. To eliminate bias",
          questionID: 0,
        },
        {
          correct: false,
          id: 2,
          option: "C. To calculate population",
          questionID: 0,
        },
        {
          correct: false,
          id: 3,
          option: "D. To determine trend",
          questionID: 0,
        },
      ],
      [
        {
          correct: false,
          id: 0,
          option: "A. To detect trends",
          questionID: 1,
        },
        {
          correct: true,
          id: 1,
          option: "B. To eliminate bias",
          questionID: 1,
        },
        {
          correct: false,
          id: 2,
          option: "C. To calculate population",
          questionID: 1,
        },
        {
          correct: false,
          id: 3,
          option: "D. To determine trend",
          questionID: 1,
        },
      ],
      [
        {
          correct: false,
          id: 0,
          option: "A. To detect trends",
          questionID: 2,
        },
        {
          correct: true,
          id: 1,
          option: "B. To eliminate bias",
          questionID: 2,
        },
        {
          correct: false,
          id: 2,
          option: "C. To calculate population",
          questionID: 2,
        },
        {
          correct: false,
          id: 3,
          option: "D. To determine trend",
          questionID: 2,
        },
      ],
    ],
    questionsTotal: 3,
    status: "Attempting",
    topicID: 2,
    topicName: "a first title",
  },
];

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/api/topics/retrieve") {
      return Promise.resolve({
        json: () => Promise.resolve(singleTruncatedContent),
      });
    } else if (url === "/api/authentication") {
      return Promise.resolve({
        json: () => Promise.resolve({ valid: validAuthentication }),
      });
    } else if (url === "/api/topics/generate") {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    } else if (url === "/api/questions/generate") {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset mock call count before each test
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

describe("Topic", () => {
  describe("Authentication", () => {
    const mockRedirect = jest.fn();
    redirect.mockImplementation(mockRedirect);
    it("should redirect to login if not authenticated", async () => {
      render(<Topic />);
      await waitFor(async () => {
        expect(mockRedirect).toHaveBeenCalledWith("/login");
      }).then(() => {
        validAuthentication = true;
      });
    });

    it("should not redirect to login if not authenticated", async () => {
      render(<Topic />);
      await waitFor(async () => {
        expect(mockRedirect).not.toHaveBeenCalled();
      });
    });
  });

  describe("Render", () => {
    it("should render with Q1, 4 options, next button only, should not go next if clicked.", async () => {
      render(<Topic />);
      await waitFor(() => {
        expect(
          screen.getByText("What is the main objective in sample statistic?")
        ).toBeInTheDocument();
      });
      expect(screen.getByText("Q1")).toBeInTheDocument();
      expect(screen.getByText("A. To detect trends")).toBeInTheDocument();
      expect(screen.getByText("B. To eliminate bias")).toBeInTheDocument();
      expect(
        screen.getByText("C. To calculate population")
      ).toBeInTheDocument();
      expect(screen.getByText("D. To determine trend")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.queryByText("Previous Question")).not.toBeInTheDocument();
      expect(screen.queryByText("Reveal Answer")).not.toBeInTheDocument();
      expect(screen.queryByText("Show Reference")).not.toBeInTheDocument();
    });
  });

  describe("Workflow", () => {
    it("should navigate properly only after answering, and go to dashboard at the end", async () => {
      render(<Topic />);

      await waitFor(() => {
        return screen.getByText("Next");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
        expect(screen.queryByText("Previous Question")).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("B. To eliminate bias"));
      await waitFor(async () => {
        expect(fetch).toHaveBeenCalledWith(
          "/api/topics/update-selections",
          expect.any(Object)
        );
      });
      expect(screen.getByText("Next")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Next"));
      expect(screen.getByText("Q2")).toBeInTheDocument();
      expect(screen.getByText("Previous Question")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Previous Question"));
      expect(screen.getByText("Q1")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Reveal Answer"));
      expect(screen.queryByText("Reveal Answer")).not.toBeInTheDocument();
      expect(screen.queryByText("Hide Reference")).not.toBeInTheDocument();
      expect(screen.queryByText("Previous Question")).not.toBeInTheDocument();
      expect(screen.getByText("Show Reference")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Show Reference"));
      expect(screen.getByText("Hide Reference")).toBeInTheDocument();
      expect(screen.queryByText("Show Reference")).not.toBeInTheDocument();

      fireEvent.click(screen.getByText("Next"));
      expect(screen.getByText("Previous Question")).toBeInTheDocument();
      expect(screen.getByText("Q2")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Previous Question"));
      expect(screen.getByText("Q1")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Next"));
      fireEvent.click(screen.getByText("B. To eliminate bias"));
      fireEvent.click(screen.getByText("Next"));
      expect(screen.getByText("Q3")).toBeInTheDocument();
      expect(screen.getByText("Back to Dashboard")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Back to Dashboard"));
      await waitFor(async () => {
        expect(mockOriginalPush).not.toHaveBeenCalled();
      });

      fireEvent.click(screen.getByText("B. To eliminate bias"));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText("Back to Dashboard"));
      await waitFor(async () => {
        expect(mockOriginalPush).toHaveBeenCalledWith("/dashboard");
      });
    });

    it("should use edit topic correctly", async () => {
      render(<Topic />);

      await waitFor(() => {
        return screen.getByLabelText("Edit");
      }).then((editBtn) => {
        fireEvent.click(editBtn);
      });

      await waitFor(async () => {
        expect(
          screen.getByText(
            "Edit your text/notes (Does not change existing questions)"
          )
        ).toBeInTheDocument();
      });

      const text = await screen.findByPlaceholderText("Insert text here...");
      fireEvent.change(text, {
        target: {
          value: "",
        },
      });

      await waitFor(async () => {
        return await screen.findByText("Save");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      expect(
        screen.getByText(
          "Your notes are a little short, try to add more content"
        )
      ).toBeInTheDocument();

      fireEvent.click(screen.getByText("Cancel"));
      await waitFor(async () => {
        expect(
          screen.queryByText(
            "Edit your text/notes (Does not change existing questions)"
          )
        ).not.toBeInTheDocument();
      });
    });

    it("should update edit topic correctly", async () => {
      render(<Topic />);

      await waitFor(() => {
        return screen.getByLabelText("Edit");
      }).then((editBtn) => {
        fireEvent.click(editBtn);
      });

      const text = await screen.findByPlaceholderText("Insert text here...");
      fireEvent.change(text, {
        target: {
          value: lorem + lorem,
        },
      });

      jest.clearAllMocks();

      await waitFor(async () => {
        return await screen.findByText("Save");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      await waitFor(async () => {
        expect(fetch).toHaveBeenCalledWith(
          "/api/topics/update",
          expect.any(Object)
        );
      });
    });

    it("should be renamable", async () => {
      render(<Topic />);

      await waitFor(async () => {
        return await screen.findByDisplayValue("a first title");
      })
        .then(async (title) => {
          jest.clearAllMocks();
          fireEvent.change(title, {
            target: {
              value: "a second title",
            },
          });
          expect(
            await screen.findByDisplayValue("a second title")
          ).toBeInTheDocument();
        })
        .then(async () => {
          await waitFor(
            async () => {
              expect(fetch).toHaveBeenCalledWith(
                "/api/topics/update",
                expect.any(Object)
              );
            },
            { timeout: 3000 }
          );
        });
    });
  });
});
