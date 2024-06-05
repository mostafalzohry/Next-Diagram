"use client";
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../../components/flow";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let id = 0;
const getId = () => `${id++}`;

const initialNodes = [
  {
    id: getId(),
    type: "default",
    data: { label: "Square" },
    position: { x: 250, y: 5 },
    style: {
      backgroundColor: "#f18509",
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<object | null>(
    null
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      console.log("Connection params:", params);
      console.log(`u connect ${params.source} to ${params.target}`);

      toast.success(`You Connected shape ${params.source} to ${params.target}`);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      console.log(`Dragging event: ${event}`);
    },
    []
  );

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: any;
      clientY: any;
    }) => {
      event.preventDefault();

      const label = event.dataTransfer.getData("application/reactflow");
      console.log("Dropped label:", label);

      if (typeof label === "undefined" || !label) {
        return;
      }

      const position = (reactFlowInstance as any).screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      console.log("Position:", position);

      let style;

      if (label === "Square") {
        style = {
          backgroundColor: "#f18509",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      } else if (label === "Rounded Rectangle") {
        style = {
          backgroundColor: "#cb2e92",
          width: "100px",
          height: "50px",
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign:"center"

        };
      } else if (label === "Circle") {
        style = {
          backgroundColor: "#1e80ff",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      } else {
        style = {
          backgroundColor: "#1e80ff",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      }

      const newNode = {
        id: getId(),
        type: "default",
        position,
        style,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
      console.log("New node:", newNode);
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div
      className="dndflow"
      style={{ backgroundColor: "white", height: "100vh" }}
    >
      <ToastContainer />

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
