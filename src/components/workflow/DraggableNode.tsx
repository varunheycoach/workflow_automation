"use client";

import { cn } from "@/lib/utils";
import { AbstractionNode } from "@/types/workflow";
import { DragEvent } from "react";

interface DraggableNodeProps {
  node: AbstractionNode;
}

export default function DraggableNode({ node }: DraggableNodeProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.setData("application/json", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  const categoriesColor = {
    trigger:
      "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300",
    action:
      "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:bg-purple-300",
    utility:
      "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300",
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={cn(
        "group cursor-grab active:cursor-grabbing",
        "rounded-lg border-2 p-3",
        "transition-all duration-200",
        "hover:shadow-md",
        categoriesColor[node.category]
      )}
      title={node.description}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "shrink-0 w-8 h-8 rounded-md flex items-center justify-center",
            "bg-white/50 group-hover:bg-white",
            "transition-colors duration-200"
          )}
        >
          <node.icon className="w-4 h-4 " />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{node.label}</p>
          <p className="text-xs text-gray-600 mt-1  ">{node.description}</p>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs text-gray-500 text-center">Drag to canvas</p>
      </div>
    </div>
  );
}
