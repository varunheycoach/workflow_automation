"use client";

import { getAbstractionByType } from "@/lib/constants";
import {
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import { ConditionNode, DefaultNode } from "./CustomNodes";
import { Button } from "../ui/button";

let id = 0;
const getId = () => `node_${++id}`;

function FlowPane() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const nodeTypes = {
    default: DefaultNode,
    condition: ConditionNode,
  };
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [publishStatus, setPublishStatus] = useState<string>(
    "Press 'Publish' to save your workflow"
  );
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeData = getAbstractionByType(type);
      if (!nodeData) return;

      const newNode: Node = {
        id: getId(),
        type: nodeData.type === "condition" ? "condition" : "default",
        position,
        data: { label: nodeData.label, icon: nodeData.icon },
        style: {
          backgroundColor: `var(${nodeData.color})`,
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px",
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  console.log("Nodes: ", nodes.length);
  console.log("Edges: ", edges.length);

  const handlePublishClick = async () => {
    if (!nodes.length && !edges.length)
      return setPublishStatus("No workflow nodes found");

    setPublishStatus("Publishing...");
    setIsPublishing(true);
    const payload = JSON.stringify({
      id: `workflow-${Date.now()}`,
      nodes,
      edges,
    });

    try {
      const response = await fetch("/api/workflow/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (response.status === 201) {
        const result = await response.json();
        setPublishStatus(result.message);
      } else {
        const error = await response.json();
        setPublishStatus(error.message);
      }
    } catch (error) {
      setPublishStatus(`Error publishing workflow: ${error}`);
    }
    setIsPublishing(false);
  };

  return (
    <div className="w-full h-full flex flex-col" ref={reactFlowWrapper}>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ type: "step" }}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesDelete={(deletedNodes) =>
            setNodes((nodes) =>
              nodes.filter(
                (node) => !deletedNodes.some((d) => d.id === node.id)
              )
            )
          }
          onEdgesDelete={(deletedEdges) =>
            setEdges((edges) =>
              edges.filter(
                (edge) => !deletedEdges.some((d) => d.id === edge.id)
              )
            )
          }
          fitView
        />
      </div>

      <div className="w-full border-gray-500 border-t-2 min-h-[50px] flex items-center justify-center bg-white pr-2.5 pl-2.5">
        <div className="flex-1 flex items-center text-lg font-medium h-full">
          Workflow status: {publishStatus}
        </div>
        <Button
          variant={"default"}
          size={"lg"}
          className="bg-green-400 hover:bg-green-600 hover:cursor-pointer"
          onClick={handlePublishClick}
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}

export function WorkflowAutomationPane() {
  return (
    <div className="flex-1 h-full">
      <ReactFlowProvider>
        <FlowPane />
      </ReactFlowProvider>
    </div>
  );
}
