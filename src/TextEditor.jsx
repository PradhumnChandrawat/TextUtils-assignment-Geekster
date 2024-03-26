import React, { useReducer } from "react";
import "./TextEditor.css";

const initialState = {
  text: "",
  wordCount: 0,
  charCount: 0,
  readTime: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
        wordCount: action.payload.split(/\s+/).filter(Boolean).length,
        charCount: action.payload.length,
        readTime: Math.round(
          action.payload.split(/\s+/).filter(Boolean).length / 200
        ),
      };
    case "CLEAR_TEXT":
      return { ...state, text: "", wordCount: 0, charCount: 0, readTime: 0 };
    case "UPPERCASE":
      return { ...state, text: state.text.toUpperCase() };
    case "LOWERCASE":
      return { ...state, text: state.text.toLowerCase() };
    case "REMOVE_SPACES":
      return { ...state, text: state.text.replace(/\s+/g, " ").trim() };
    case "COPY":
      navigator.clipboard.writeText(state.text);
      return state;
    default:
      return state;
  }
};

function TextEditor() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: "SET_TEXT", payload: e.target.value });
  };

  return (
    <div className="text-editor">
      <textarea
        value={state.text}
        onChange={handleChange}
        placeholder="Type your text here..."
      />
      <div className="controls">
        <button onClick={() => dispatch({ type: "UPPERCASE" })}>
          Convert Uppercase
        </button>
        <button onClick={() => dispatch({ type: "LOWERCASE" })}>
          Convert LowerCase
        </button>
        <button onClick={() => dispatch({ type: "CLEAR_TEXT" })}>
          Clear Text
        </button>
        <button onClick={() => dispatch({ type: "REMOVE_SPACES" })}>
          Remove Extra Spaces
        </button>
        <button onClick={() => dispatch({ type: "COPY" })}>
          Copy To Clipboard
        </button>
      </div>
      <div className="statistics">
        Words: {state.wordCount} | Characters: {state.charCount} | Reading Time:{" "}
        {state.readTime} minutes
      </div>
      <div className="preview">
        <p>Preview Document:</p>
        <div className="preview-document">{state.text}</div>
      </div>
    </div>
  );
}

export default TextEditor;
