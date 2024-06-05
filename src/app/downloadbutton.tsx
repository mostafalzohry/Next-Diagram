import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";

const DownloadButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [color, setColor] = useColor("rgb(86 30 203)");
  const { getNodes } = useReactFlow();

  const imageWidth = 1024;
  const imageHeight = 768;

  // Interfaces and Types
  interface CustomOptions {
    backgroundColor?: any;
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
  }

  // Functions
  function downloadImage(dataUrl: string) {
    const a = document.createElement("a");

    a.setAttribute("download", "flowMostafaElzohry.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }

  const handleOutsideClick = (e: MouseEvent) => {
    const dialog = document.getElementById("colorPickerDialog");
    if (dialog && !dialog.contains(e.target as Node)) {
      setIsDialogOpen(false);
    }
  };

 

  const Download = (color: any) => {
    const nodesBounds = getRectOfNodes(getNodes() || []);
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    if (document.querySelector(".react-flow__viewport")) {
      console.log("colour in background colour", color);
      const options: CustomOptions = {
        backgroundColor: `${color}`,
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      };
      toPng(
        document.querySelector(".react-flow__viewport") as HTMLElement,
        options
      ).then(downloadImage);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log("Selected color:", color.hex);
    Download(color.hex);
    setIsDialogOpen(false);
  };


  useEffect(() => {
    if (isDialogOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDialogOpen]);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenDialog}
      >
        Download as image
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg" id="colorPickerDialog">
            <h2 className="text-lg font-semibold mb-4">
              Select a background Color of png
            </h2>
            <ColorPicker
              color={color}
              onChange={setColor}
              hideInput={["rgb", "hsv"]}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-auto block"
              onClick={handleCloseDialog}
            >
              Download
            </button>
          </div>
        </div>


      )}
    </div>
  );
};

export default DownloadButton;
