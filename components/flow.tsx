
"use client"
import DownloadButton from "@/app/downloadbutton";
import React from "react";

const Sidebar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeLabel: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeLabel);
    event.dataTransfer.effectAllowed = "move";

    console.log(`Dragging: ${nodeLabel}`); // Debugging line to check drag event
  };

  return (
    <aside>
      <DownloadButton/>


      <div className="description">
        Hi, You can drag these shapes 
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "Square")}
        draggable
        style={{
          backgroundColor: "#f18509",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Square
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Circle")}
        draggable
        style={{
          backgroundColor: "#1e80ff",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Circle
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "Rounded Rectangle")}
        draggable
        style={{
          backgroundColor: "#cb2e92",
          width: "100px",
          height: "50px",
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign:"center"
        }}
      >
        Rounded Rectangle
      </div>
    </aside>
  );
};

export default Sidebar;
