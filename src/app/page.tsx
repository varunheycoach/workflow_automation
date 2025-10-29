import { AbstractionsPanel } from "@/components/workflow/AbstractionsPanel";
import { WorkflowAutomationPane } from "@/components/workflow/WorkflowAutomationPane";

export default function Page() {
  return (
    <div className="flex h-screen">
      <AbstractionsPanel />
      <main className="flex-1 bg-gray-100 flex items-center justify-center">
        <WorkflowAutomationPane />
      </main>
    </div>
  );
}
