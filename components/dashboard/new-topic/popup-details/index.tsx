import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import Popup from "@/components/popup";
import * as pdfjs from 'pdfjs-dist';
import styles from "../NewTopic.module.sass";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PopupDetailsProps {
  handleFetchTopics: () => any;
  setIsLoadingTopics?: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setIsNewTopicOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  data?: string;
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

  const [extractedText, setExtractedText] = useState(""); // New state for extracted text
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(""); // New state for file name
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsExtracting(true);
      setUploadedFileName(file.name);
      try {
        const text = await extractTextFromPDF(file);
        setExtractedText(text); // Store extracted text in state
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
      }
      setIsExtracting(false);
    }
  };
  
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      fullText += pageText + ' ';
    }

    return fullText.trim();
  };
  
  const appendExtractedText = () => {
    setTrainingData(prevData => prevData + ' ' + extractedText);
    setExtractedText(""); // Clear the extracted text after appending
  };

  const handleGenerate = async () => {
    const combinedText = trainingData + ' ' + extractedText;
    if (combinedText.length < 250) {
      setHighlightColourTrainingData(errorColour);
    } else {
      try {
        setIsNewTopicDetailsOpen(false);
        setIsLoadingTopics(true);
        if (!updateDataInstead) {
          await fetch("/api/topics/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              topic: { data: combinedText, title: newTopicName },
            }),
          });
        } else {
          await fetch("/api/topics/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user,
              topic: { data: combinedText, topicID: topicID },
            }),
          });
        }
        handleFetchTopics();
        setNewTopicName("");
        setTrainingData("");
        setExtractedText("");
        setUploadedFileName("");
      } catch (error) {
        console.error('Error generating topic:', error);
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
      option2Text={updateDataInstead ? "Update" : "Generate"}
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
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={styles.uploadPDFButton}
            disabled={isExtracting}
          >
            {isExtracting ? 'Extracting...' : 'Upload PDF'}
          </button>
          {uploadedFileName && (
            <span className={styles.fileName}>{uploadedFileName}</span>
          )}
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
