import * as pdfjs from "pdfjs-dist";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import Icon, { Icons } from "@/components/icons";
import Popup from "@/components/popup";

import styles from "../NewTopic.module.sass";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ALLOWED_DOCTYPES = ["application/pdf", "text/plain"];
interface PopupDetailsProps {
  handleFetchTopics: () => any;
  setIsLoadingTopics?: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  data?: string;
  filesTexts?: string[];
  fileNames?: string[];
  fileIDs?: number[];
  updateDataInstead?: boolean;
  topicID?: number;
}

const PopupDetails = ({
  handleFetchTopics,
  setIsLoadingTopics = () => {},
  setIsNewTopicDetailsOpen,
  setIsNewTopicOpen = () => {},
  title = "",
  data = "",
  filesTexts = [],
  fileNames = [],
  fileIDs = [],
  updateDataInstead = false,
  topicID = -1,
}: PopupDetailsProps) => {
  const accentColour = "#289497";
  const errorColour = "#FF0000";

  const [user, loading, error] = useAuthState(auth);

  const [newTopicName, setNewTopicName] = useState(title);
  const [trainingData, setTrainingData] = useState(data);
  const [highlightColourTrainingData, setHighlightColourTrainingData] =
    useState(accentColour);
  const [extractedTexts, setExtractedTexts] = useState<string[]>(filesTexts); // New state for extracted text
  const [isIncorrectFileUploaded, setIsIncorrectUpload] = useState(false);
  const [files, setFiles] = useState<string[]>(fileNames);
  const [fileIDList, setFileIDs] = useState<number[]>(fileIDs);
  const [filesToDelete, setFilesToDelete] = useState<number[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(""); // New state for file name

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(acceptedFiles);

    const handleProcessFile = async (file: File) => {
      setIsIncorrectUpload(false);
      if (ALLOWED_DOCTYPES.includes(file.type)) {
        setUploadedFileName(file.name);
        try {
          if (file.type === "text/plain") {
            const text = await file.text();
            console.log(text);
            setExtractedTexts((prev) => {
              return [...prev, text];
            }); // Store extracted text in state
            setFiles((prev) => {
              return [...prev, file.name];
            });
          } else if (file.type === "application/pdf") {
            const text = await extractTextFromPDF(file);
            setExtractedTexts((prev) => {
              return [...prev, text];
            }); // Store extracted text in state
            setFiles((prev) => {
              return [...prev, file.name];
            });
          }
        } catch (error) {
          // console.error("Error extracting text from PDF:", error);
          setIsIncorrectUpload(true);
        }
      } else {
        setIsIncorrectUpload(true);
      }
    };

    acceptedFiles.forEach((file) => {
      handleProcessFile(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = (index: number) => {
    const deleteIndex = (prev: any[], index: number) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    };

    setFiles((prev) => deleteIndex(prev, index));
    setExtractedTexts((prev) => deleteIndex(prev, index));
    setFilesToDelete((prev) => [...prev, fileIDList[index]]);
    setFileIDs((prev) => deleteIndex(prev, index));
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      fullText += pageText + " ";
    }

    return fullText.trim();
  };

  // const appendExtractedText = () => {
  //   setTrainingData((prevData) => prevData + " " + extractedText);
  //   setExtractedText(""); // Clear the extracted text after appending
  // };

  const handleGenerate = async () => {
    const combinedText = trainingData + " " + extractedTexts.join("\n");
    const handleReset = () => {
      handleFetchTopics();
      setNewTopicName("");
      setTrainingData("");
      setExtractedTexts([]);
      setFiles([]);
      setUploadedFileName("");
      setFilesToDelete([]);
    };

    if (combinedText.length < 500) {
      setHighlightColourTrainingData(errorColour);
    } else {
      try {
        setIsNewTopicDetailsOpen(false);
        setIsLoadingTopics(true);

        if (!updateDataInstead) {
          const res = await fetch("/api/topics/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              topic: {
                data: trainingData,
                title: newTopicName,
                fileData: extractedTexts,
                fileName: files,
              },
            }),
          });
          const newTopic = await res.json();
          // console.log(newTopic);
          const bodyToSend = JSON.stringify({
            user: user,
            data: {
              title: newTopicName,
              passage: combinedText,
              id: newTopic.id,
            },
            topic: {
              isGenerating: false,
              topicID: newTopic.id,
            },
          });
          handleReset();
          await fetch("/api/questions/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: bodyToSend,
          }).then(async (res) => {
            handleFetchTopics();
          });
        } else {
          return await fetch("/api/topics/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              topic: {
                data: trainingData,
                topicID: topicID,
                fileData: extractedTexts,
                fileName: files,
                fileIDs: fileIDList,
                filesToDelete: filesToDelete,
              },
            }),
          });
        }
      } catch (error) {
        // console.error("Error generating topic:", error);
      }
    }
  };

  return (
    <Popup
      header={
        updateDataInstead
          ? "Edit your text/notes (Does not change existing questions)"
          : "Upload your text/notes for..."
      }
      text={newTopicName}
      option1Text={updateDataInstead ? "Cancel" : "Back"}
      option2Text={updateDataInstead ? "Save" : "Generate"}
      accentColour={accentColour}
      accentColourSecondary={accentColour}
      handleOption1={() => {
        setIsNewTopicDetailsOpen(false);
        setIsNewTopicOpen(true);
      }}
      handleOption2={handleGenerate}
      handleDefault={() => setIsNewTopicDetailsOpen(false)}
      isDefaultOption1
      isOption1Underlined={false}
    >
      <div>
        <div style={{ marginTop: "25px" }}></div>
        <textarea
          placeholder="Insert text here..."
          value={trainingData}
          onChange={(e) => {
            setTrainingData(e.target.value);
            setHighlightColourTrainingData(accentColour);
          }}
          className={styles.trainingData}
          style={{
            borderColor: highlightColourTrainingData,
          }}
        ></textarea>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadedFiles}>
            {files.map((file, index) => (
              <div key={index} className={styles.uploadedFile}>
                <span>{file}</span>
                <button
                  onClick={() => deleteFile(index)}
                  className={styles.deleteButton}
                >
                  <Icon type={Icons.Close} />
                </button>
              </div>
            ))}
          </div>

          <div
            {...getRootProps()}
            className={styles.dragAndDropArea}
            style={isIncorrectFileUploaded ? { borderColor: errorColour } : {}}
          >
            <input {...getInputProps()} accept={ALLOWED_DOCTYPES.join(", ")} />
            <Icon
              type={Icons.Upload}
              className={styles.uploadIcon}
              ariaInvalid={isIncorrectFileUploaded}
            />
            {isDragActive ? (
              <p
                style={isIncorrectFileUploaded ? { color: errorColour } : {}}
                className={styles.uploadTexts}
              >
                Release to upload
              </p>
            ) : (
              <p
                style={isIncorrectFileUploaded ? { color: errorColour } : {}}
                className={styles.uploadTexts}
              >
                Upload/Drop .pdf or .txt files here...
              </p>
            )}
          </div>
        </div>
        {highlightColourTrainingData === errorColour && (
          <p className={styles.errorShort}>
            Your notes are a little short, try to add more content
          </p>
        )}
      </div>
    </Popup>
  );
};

export default PopupDetails;
