"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const Generate = () => {
  const searchParams = useParams();
  const { id } = searchParams;
  const pageID = parseInt(typeof id === "string" ? id : id[0]);
  const [questionToDelete, setQuestionToDelete] = useState("");
  const someStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
  };

  const handleGenerate = async () => {
    await fetch(`/api/questions`, {
      method: "POST",
      body: JSON.stringify({
        topicID: pageID,
      }),
    });
  };

  const handleDelete = async () => {
    await fetch(`/api/questions`, {
      method: "DELETE",
      body: JSON.stringify({
        question: questionToDelete,
        topicID: pageID,
      }),
    });
  };

  return (
    <div>
      <button style={someStyle} onClick={handleGenerate}>
        Generate
      </button>
      <div>
        <input
          type="text"
          value={questionToDelete}
          onChange={(e) => setQuestionToDelete(e.target.value)}
          placeholder="Insert Question Text Here for deletion"
          style={someStyle}
        ></input>
        <button style={someStyle} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Generate;
