import { LucideIcon } from "lucide-react";

export type category = "trigger" | "utility" | "action";

export type AbstractionNode = {
  id: string;
  type: string;
  category: category;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export interface WorkflowNode {
  id: string;
  type: string;
  category: category;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    icon?: LucideIcon;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
}

export interface PublishWorkflowPayload {
  workFlowId: string;
  name?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
}
