import { AbstractionNode } from "@/types/workflow";
import {
  Calculator,
  Clock,
  CreditCard,
  Edit,
  FileText,
  GitBranch,
  Mail,
  MessageSquare,
  Plus,
  Send,
  Timer,
  Type,
  UserPlus,
  Webhook,
} from "lucide-react";

export const ABSTRACTIONS: AbstractionNode[] = [
  // Triggers
  {
    id: "trigger-form-submitted",
    type: "formSubmitted",
    category: "trigger",
    label: "Form Submitted",
    description: "Starts the workflow when a user submits a form",
    icon: FileText,
    color: "--color-node-trigger",
  },
  {
    id: "trigger-user-signup",
    type: "userSignup",
    category: "trigger",
    label: "New User Signed Up",
    description: "Fires when someone registers",
    icon: UserPlus,
    color: "--color-node-trigger",
  },
  {
    id: "trigger-webhook",
    type: "webhookReceived",
    category: "trigger",
    label: "Webhook Received",
    description: "Runs when external data hits your API",
    icon: Webhook,
    color: "--color-node-trigger",
  },
  {
    id: "trigger-schedule",
    type: "schedule",
    category: "trigger",
    label: "Schedule (Every X mins)",
    description: "Runs periodically",
    icon: Clock,
    color: "--color-node-trigger",
  },
  {
    id: "trigger-payment",
    type: "paymentCompleted",
    category: "trigger",
    label: "Payment Completed",
    description: "Example of an event-based trigger",
    icon: CreditCard,
    color: "--color-node-trigger",
  },

  // Actions
  {
    id: "action-send-email",
    type: "sendEmail",
    category: "action",
    label: "Send Email",
    description: "Send a confirmation or alert email",
    icon: Mail,
    color: "--color-node-action",
  },
  {
    id: "action-create-record",
    type: "createRecord",
    category: "action",
    label: "Create Record",
    description: "Insert something into the database",
    icon: Plus,
    color: "--color-node-action",
  },
  {
    id: "action-update-record",
    type: "updateRecord",
    category: "action",
    label: "Update Record",
    description: "Modify an existing entry",
    icon: Edit,
    color: "--color-node-action",
  },
  {
    id: "action-slack-message",
    type: "sendSlackMessage",
    category: "action",
    label: "Send Slack Message",
    description: "Notify your team",
    icon: MessageSquare,
    color: "--color-node-action",
  },
  {
    id: "action-call-api",
    type: "callApi",
    category: "action",
    label: "Call API",
    description: "Trigger an external service",
    icon: Send,
    color: "--color-node-action",
  },

  // Utilities
  {
    id: "utility-condition",
    type: "condition",
    category: "utility",
    label: "Condition / If-Else",
    description: "Branch the workflow based on logic",
    icon: GitBranch,
    color: "--color-node-utility",
  },
  {
    id: "utility-delay",
    type: "delay",
    category: "utility",
    label: "Delay / Wait",
    description: "Pause for some time",
    icon: Timer,
    color: "--color-node-utility",
  },
  {
    id: "utility-format-data",
    type: "formatData",
    category: "utility",
    label: "Format Data",
    description: "Clean or modify inputs (like dates or strings)",
    icon: Type,
    color: "--color-node-utilit-2",
  },
  {
    id: "utility-math-operation",
    type: "mathOperation",
    category: "utility",
    label: "Math Operation",
    description: "Add, subtract, etc.",
    icon: Calculator,
    color: "--color-node-utility",
  },
  {
    id: "utility-logger",
    type: "logger",
    category: "utility",
    label: "Logger",
    description: "Print or store debug info",
    icon: FileText,
    color: "--color-node-logger",
  },
];

export const WORKFLOW_CONSTANTS = {
  NODE_WIDTH: 180,
  NODE_HEIGHT: 80,
  GRID_SIZE: 15,
  BACKGROUND_COLOR: "--color-workflow-background",
  EDGE_TYPE: "smoothstep",
  MIN_ZOOM: 0.5,
  MAX_ZOOM: 2,
};

export const EDGE_STYLES = {
  default: {
    stroke: "--color-edge-default",
    strokeWidth: 2,
  },
  selected: {
    stroke: "--color-edge-selected",
    strokeWidth: 3,
  },
};

// Helper function to get nodes by category
export const getAbstractionsByCategory = (
  category: "trigger" | "action" | "utility"
) => {
  return ABSTRACTIONS.filter((node) => node.category === category);
};

// Helper function to get a specific abstraction by type
export const getAbstractionByType = (type: string) => {
  return ABSTRACTIONS.find((node) => node.type === type);
};
