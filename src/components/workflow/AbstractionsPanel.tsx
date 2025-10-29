"use client";

import { ABSTRACTIONS } from "@/lib/constants";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import DraggableNode from "./DraggableNode";
import { debounce } from "@/lib/utils";

export function AbstractionsPanel() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  }, 500);

  const filteredAbstractions = useMemo(() => {
    if (!searchQuery.trim()) return ABSTRACTIONS;

    const query = searchQuery.toLowerCase();

    return ABSTRACTIONS.filter(
      (node) =>
        node.label.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedFilteredAbstractions = useMemo(() => {
    return {
      trigger: filteredAbstractions.filter(
        (node) => node.category === "trigger"
      ),
      action: filteredAbstractions.filter((node) => node.category === "action"),
      utility: filteredAbstractions.filter(
        (node) => node.category === "utility"
      ),
    };
  }, [filteredAbstractions]);

  const hasResults = filteredAbstractions.length > 0;

  return (
    <aside className="flex flex-col h-full w-80 border-r bg-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Abstractions</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search nodes..."
            onChange={handleSearch}
            className="pl-9 h-9 text-sm bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {!hasResults && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No abstractions found for &quot;{searchQuery}&quot;
          </div>
        )}

        {groupedFilteredAbstractions.trigger.length > 0 && (
          <div className="p-4 bg-green-200">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold">Triggers</h3>
              <span className="text-xs text-gray-500">
                ({groupedFilteredAbstractions.trigger.length})
              </span>
            </div>
            <div className="space-y-2">
              {groupedFilteredAbstractions.trigger.map((node) => (
                <DraggableNode key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}

        {groupedFilteredAbstractions.trigger.length > 0 &&
          groupedFilteredAbstractions.action.length > 0 && <Separator />}

        {groupedFilteredAbstractions.action.length > 0 && (
          <div className="p-4 bg-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold">Actions</h3>
              <span className="text-xs text-gray-500">
                ({groupedFilteredAbstractions.action.length})
              </span>
            </div>
            <div className="space-y-2">
              {groupedFilteredAbstractions.action.map((node) => (
                <DraggableNode key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}

        {groupedFilteredAbstractions.action.length > 0 &&
          groupedFilteredAbstractions.utility.length > 0 && <Separator />}

        {groupedFilteredAbstractions.utility.length > 0 && (
          <div className="p-4 bg-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold">Utilities</h3>
              <span className="text-xs text-gray-500">
                ({groupedFilteredAbstractions.utility.length})
              </span>
            </div>
            <div className="space-y-2">
              {groupedFilteredAbstractions.utility.map((node) => (
                <DraggableNode key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t bg-white text-xs text-gray-500 min-h-[50px] flex items-center ">
        <p>Drag and drop nodes to the canvas</p>
      </div>
    </aside>
  );
}
