import { AbstractionNode } from "@/types/workflow";
import { Handle, Position } from "@xyflow/react";

type NodeProps = {
  data: AbstractionNode;
  children?: React.ReactNode;
};

export function BaseNode({ data, children }: NodeProps) {
  const Icon = data.icon;

  return (
    <div
      className="px-3 py-2 rounded-lg text-white text-sm min-w-[140px]"
      style={{ backgroundColor: `var(${data.color})` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon size={16} />
        <span>{data.label}</span>
      </div>
      {children}
    </div>
  );
}

export function DefaultNode({ data }: { data: AbstractionNode }) {
  return (
    <BaseNode data={data}>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle type="source" position={Position.Right} id="output" />
    </BaseNode>
  );
}

export function ConditionNode({ data }: { data: AbstractionNode }) {
  return (
    <BaseNode data={data}>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ backgroundColor: "limegreen" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ backgroundColor: "tomato" }}
      />
    </BaseNode>
  );
}
