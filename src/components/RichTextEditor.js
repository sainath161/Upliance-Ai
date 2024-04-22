import React, { useEffect, useState } from "react";
import { ContentState, Editor, EditorState, RichUtils } from "draft-js";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../slices/formSlice";

const RichTextEditor = ({ setFormData }) => {
  // Redux state and dispatcher
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();

  // State for managing the editor content
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(""))
  );

  // Effect to update the editor state when formData changes
  useEffect(() => {
    if (!formData) return;

    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(formData))
    );
  }, [formData]);

  // Function to handle key commands in the editor
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Function to toggle inline styles (bold, italic, underline)
  const onFormatToggle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Function to toggle list styles
  const onListClick = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  // Function to handle save button click
  const onSaveClick = () => {
    // Get plain text content from the editor
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();

    // Dispatch action to update Redux state with the form data
    dispatch(addFormData(text));

    // Save text to localStorage for persistence
    localStorage.setItem("formData", text);
  };

  return (
    <div className="border border-gray-500 rounded-lg flex-1 flex flex-col">
      {/* Title */}
      <h2 className="text-3xl text-center font-bold px-4 py-2">
        Rich Text Editor
      </h2>

      {/* Formatting controls */}
      <div className="px-4 border-t border-gray-500">
        <IconButton onClick={() => onFormatToggle("BOLD")} className="mr-2">
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={() => onFormatToggle("ITALIC")} className="mr-2">
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          onClick={() => onFormatToggle("UNDERLINE")}
          className="mr-2"
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton onClick={onListClick}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton onClick={onSaveClick}>
          <SaveIcon />
        </IconButton>
      </div>

      {/* Editor area */}
      <div className="px-4 py-2 h-[10rem] border-t border-gray-500 flex flex-col overflow-auto">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={(newEditorState) => {
            setEditorState(newEditorState);
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
