import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export default function Editor({value, onChange}) {

  // ReactQuill toolbar options
  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

return(
    <ReactQuill
    value={value}
    theme={'snow'}
    onChange={(onChange)}
    modules={modules}
  />
)
}