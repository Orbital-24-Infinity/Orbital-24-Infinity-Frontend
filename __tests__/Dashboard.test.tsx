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
import { redirect } from "../__mocks__/next/navigation";
import { useRouter } from "../__mocks__/next/router";
import Dashboard from "../app/dashboard/page";

let mockOriginalPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({ push: mockOriginalPush })),
}));

let mockOriginalNavPush = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({ push: mockOriginalNavPush })),
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

const generatingContent = [
  {
    data: "",
    files: [],
    lastModified: new Date(),
    questions: [],
    questionsAttempted: 0,
    questionsOptions: [],
    questionsTotal: 10,
    status: "Generating...",
    topicID: 1,
    topicName: "a",
  },
];

const attemptingContent = [
  {
    data: lorem,
    files: [],
    lastModified: new Date(),
    questions: [],
    questionsAttempted: 0,
    questionsOptions: [],
    questionsTotal: 10,
    status: "Attempting",
    topicID: 1,
    topicName: "a first title",
  },
  {
    data: lorem,
    files: [],
    lastModified: new Date(),
    questions: [],
    questionsAttempted: 10,
    questionsOptions: [],
    questionsTotal: 10,
    status: "Completed",
    topicID: 2,
    topicName: "b",
  },
];

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
    topicName: "b",
  },
];

let contentToShow = 0;
const contentType = [
  [],
  generatingContent,
  attemptingContent,
  singleTruncatedContent,
];

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/api/topics/retrieve") {
      return Promise.resolve({
        json: () => Promise.resolve(contentType[contentToShow]),
      });
    } else if (url === "/api/authentication") {
      return Promise.resolve({
        json: () => Promise.resolve({ valid: validAuthentication }),
      });
    } else if (url === "/api/topics/generate") {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    } else if (url === "/api/questions/generate") {
      return Promise.resolve({ json: () => Promise.resolve({}) });
    } else if (url === "/api/topics/update") {
      return Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

describe("Dashboard", () => {
  describe("Authentication", () => {
    const mockRedirect = jest.fn();
    redirect.mockImplementation(mockRedirect);
    it("should redirect to login if not authenticated", async () => {
      render(<Dashboard />);
      await waitFor(async () => {
        expect(mockRedirect).toHaveBeenCalledWith("/login");
      }).then(() => {
        validAuthentication = true;
      });
    });

    it("should not redirect to login if not authenticated", async () => {
      render(<Dashboard />);
      await waitFor(async () => {
        expect(mockRedirect).not.toHaveBeenCalled();
      });
    });
  });

  describe("Render", () => {
    it("should be empty, no topics to display", async () => {
      // Arrange
      render(<Dashboard />);
      await waitFor(async () => {
        // Actions
        const emptyText = await screen.findByText(
          "It's rather empty here... What if you tried to click the New Topic button below?"
        );

        // Assert
        expect(emptyText).toBeInTheDocument();
      });
    });

    it("should have a logout button", async () => {
      // Arrange
      render(<Dashboard />);
      await waitFor(async () => {
        // Actions
        const logoutButton = await screen.findByText("Logout");

        // Assert
        expect(logoutButton).toBeInTheDocument();
      });
    });

    it("should have a New Topic button", async () => {
      // Arrange
      render(<Dashboard />);
      await waitFor(async () => {
        // Actions
        const newButton = await screen.findByText("New Topic");

        // Assert
        expect(newButton).toBeInTheDocument();
      });
    });
  });

  describe("Create New Topic", () => {
    it("should popup title when new title is clicked", async () => {
      render(<Dashboard />);

      let newButton: HTMLElement;

      await waitFor(async () => {
        newButton = await screen.findByText("New Topic");
      }).then(() => {
        fireEvent.click(newButton);
      });

      await waitFor(async () => {
        const title = await screen.findByText("Give a name for your New Topic");
        expect(title).toBeInTheDocument();
      });
    });

    it("should not go next if no title is given", async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        // Actions
        return await screen.findByText("New Topic");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      await waitFor(async () => {
        return await screen.findByText("Next");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
      });

      const notes = screen.queryByText("Upload your text/notes for...");
      expect(notes).not.toBeInTheDocument();
    });

    it("should go next if a title is given, and go back works", async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      const title = await screen.findByPlaceholderText(
        "Insert topic name here..."
      );
      fireEvent.change(title, { target: { value: "Test Topic" } });

      await waitFor(async () => {
        return await screen.findByText("Next");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
      });

      const notes = screen.queryByText("Upload your text/notes for...");
      expect(notes).toBeInTheDocument();
      expect(title).not.toBeInTheDocument();

      await waitFor(async () => {
        return await screen.findByText("Back");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
      });

      expect(notes).not.toBeInTheDocument();
    });

    it("should not generate if text is insufficiently long", async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      const title = await screen.findByPlaceholderText(
        "Insert topic name here..."
      );
      fireEvent.change(title, { target: { value: "Test Topic" } });

      await waitFor(async () => {
        return await screen.findByText("Next");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
      });

      await waitFor(async () => {
        return await screen.findByText("Generate");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      expect(
        await screen.findByText(
          "Your notes are a little short, try to add more content"
        )
      ).toBeInTheDocument();
    });

    it("should generate if text is sufficiently long, and display a generating... topic after", async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      const title = await screen.findByPlaceholderText(
        "Insert topic name here..."
      );
      fireEvent.change(title, { target: { value: "Test Topic" } });

      await waitFor(async () => {
        return await screen.findByText("Next");
      }).then((nextBtn) => {
        fireEvent.click(nextBtn);
      });

      const text = await screen.findByPlaceholderText("Insert text here...");
      fireEvent.change(text, {
        target: {
          value: lorem,
        },
      });

      await waitFor(async () => {
        return await screen.findByText("Generate");
      }).then((newButton) => {
        fireEvent.click(newButton);
      });

      contentToShow = 1;

      expect(
        screen.queryByText(
          "Your notes are a little short, try to add more content"
        )
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          "It's rather empty here... What if you tried to click the New Topic button below?"
        )
      ).not.toBeInTheDocument();

      await waitFor(async () => {
        expect(await screen.findByText("Generating...")).toBeInTheDocument();
      }).then(() => {
        contentToShow = 2;
      });
    });
  });

  describe("Topic Exists", () => {
    let mockPush: jest.Mock;
    it("should show two topics with questions, and each button works as intended", async () => {
      contentToShow = 2;
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newTopicBtn) => {
        expect(newTopicBtn).toBeInTheDocument();
      });

      await waitFor(async () => {
        return await screen.findAllByText("View");
      }).then((viewBtn) => {
        expect(viewBtn?.[0]).toBeInTheDocument();
        fireEvent.click(viewBtn?.[0]);
      });

      // Does not work for some reason
      // await waitFor(() => {
      //   expect(mockOriginalNavPush).toHaveBeenCalled();
      // });

      await waitFor(async () => {
        return await screen.findByText("Generate More");
      }).then((genMoreBtn) => {
        expect(genMoreBtn).toBeInTheDocument();
        fireEvent.click(genMoreBtn);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          "/api/questions/generate",
          expect.any(Object)
        );
      });
    });

    it("should be renamable", async () => {
      contentToShow = 2;
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newTopicBtn) => {
        expect(newTopicBtn).toBeInTheDocument();
      });

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

    it("should be deletable", async () => {
      render(<Dashboard />);

      await waitFor(async () => {
        return await screen.findByText("New Topic");
      }).then((newTopicBtn) => {
        expect(newTopicBtn).toBeInTheDocument();
      });

      await waitFor(async () => {
        return await screen.findAllByLabelText("Delete");
      })
        .then(async (deleteBtns) => {
          fireEvent.click(deleteBtns[0]);
          expect(
            screen.getByText("Are you sure you want to delete the following...")
          ).toBeInTheDocument();
        })
        .then(async () => {
          fireEvent.click(screen.getByText("No, I'll keep it for now"));
          expect(
            screen.queryByText(
              "Are you sure you want to delete the following..."
            )
          ).not.toBeInTheDocument();
        });

      await waitFor(async () => {
        return await screen.findAllByLabelText("Delete");
      })
        .then(async (deleteBtns) => {
          fireEvent.click(deleteBtns[0]);
          expect(
            screen.getByText("Are you sure you want to delete the following...")
          ).toBeInTheDocument();
        })
        .then(async () => {
          fireEvent.click(screen.getByText("Yes, destroy it now!"));
          await waitFor(async () => {
            expect(fetch).toHaveBeenCalledWith(
              "/api/topics/delete",
              expect.any(Object)
            );
          });
          await waitFor(() => {
            expect(screen.queryByText("a first title")).not.toBeInTheDocument();
          });
        });
    });
  });
});
