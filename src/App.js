import { useDispatch } from "react-redux";
import "./App.css";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import UserDataForm from "./components/UserDataForm";
import { useEffect, useState } from "react";
import useLocalStorage from "./components/useLocalStorage";
import { addFormData } from "./slices/formSlice";

function App() {
  const [formData, setFormData] = useLocalStorage("formData", null);
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Dispatch the formData to Redux store only when formData changes
  useEffect(() => {
    if (formData) {
      dispatch(addFormData(formData));
    }
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row lg:items-stretch lg:justify-between lg:flex-1 lg:gap-8">
      {screenWidth < 786 ? (
        <>
          <UserDataForm setFormData={setFormData} />
          <div className="lg:flex-1 flex flex-col gap-8 p-10">
            <Counter />
            <hr className="border-t border-gray-800" />
            <RichTextEditor setFormData={setFormData} />
          </div>
        </>
      ) : (
        <>
        <UserDataForm setFormData={setFormData} />
          <div className="lg:flex-1 flex flex-col gap-8 p-10">
            <Counter />
            <hr className="border-t border-gray-800" />
            <RichTextEditor setFormData={setFormData} />
          </div>
          
        </>
      )}
    </div>
  );
}

export default App;
