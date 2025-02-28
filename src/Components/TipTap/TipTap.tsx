import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {InputSizes} from "../utils/InputSizes";
import {useTranslation} from "react-i18next"; // Import the styles


interface InputProps {
  value: string,
  label: string,
  size?: InputSizes,
  type?: string,
  required?: boolean,
  error?: string,
  disabled?: boolean,
  onChange: (inputValue: string) => void
}
const TipTap = (
  {value, onChange, required = false, label, error} : InputProps
) => {


  const { t } = useTranslation();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div className="w-full">
      <label className="mb-1 font-robot text-gray-600 font-medium whitespace-nowrap">{label} {required && "*"}</label>
      <style>
        {`
          .ql-container {
            border: none !important;
          }
          .ql-toolbar {
            border: none !important;
            border-bottom: 1px solid #e2e8f0 !important; /* Optional: Add a bottom border to the toolbar */
          }
        `}
      </style>
      <ReactQuill
        className="rounded-lg w-full border  bg-gray-200 h-56 pb-14 pr-2 scrollbar"
        theme="snow"
        value={value}
        onChange={(value) => onChange(value)}
        modules={modules}
        formats={formats}
      />
      {error && <label className="font-robot text-red-500 font-medium ">{t(error)}</label>}
    </div>
  );
};

export default TipTap;
