import { useEffect, useMemo, useState } from "react";
import {
  Divider,
  Typography,
  Space,
  message,
  Button,
} from "antd";
import {
  NODE_RULES,
  ROOT_NODE_TYPES,
  type NodeType,
  type TreeNode,
} from "../data/types";
import { useStore } from "../context/store";
import NodeDetails from "./NodeDetails";
import NodeForm from "./NodeForm";
import { Trash2 } from "lucide-react";

const { Title, Text } = Typography;

interface SidePanelProps {
  selectedNode: TreeNode | null;
}

export default function SidePanel({ selectedNode }: SidePanelProps) {
  const allNodes = useStore((s) => s.nodes);
  const addNode = useStore((s) => s.addNode);
  const deleteNode = useStore((s) => s.deleteNode);

  const isCanvasEmpty = allNodes.length === 0;

  const [label, setLabel] = useState("");
  const [nodeType, setNodeType] = useState<NodeType | null>(null);

  const allowedChildren = useMemo(() => {
    return selectedNode ? NODE_RULES[selectedNode.type] : [];
  }, [selectedNode]);

  useEffect(() => {
    setLabel("");
    setNodeType(null);
  }, [selectedNode, isCanvasEmpty]);

  const handleAddNode = () => {
    if (!label.trim()) {
      message.warning("Label is required");
      return;
    }
  
    if (!nodeType) {
      message.warning("Please select node type!");
      return;
    }
  
    const isRootNode = isCanvasEmpty || selectedNode === null;
  
    // If root node
    if (isRootNode) {
      if (!ROOT_NODE_TYPES.includes(nodeType)) {
        message.error(`${nodeType} cannot be added at the root level`);
        return;
      }
  
      addNode(nodeType, label);
      message.success(`Root node (${nodeType}) added`);
      return;
    }
  
    // If adding as a child
    const parentType = selectedNode.type;
    const validChildren = NODE_RULES[parentType];
  
    if (!validChildren.includes(nodeType)) {
      message.error(`${nodeType} is not allowed under ${parentType}`);
      return;
    }
  
    addNode(nodeType, label, selectedNode.id);
    message.success(`${nodeType} node added under ${parentType}`);
  };
  

  const handleDelete = () => {
    if (!selectedNode) return;
    deleteNode(selectedNode.id);
    message.success("Node deleted");
  };

  return (
    <div className="p-5 bg-blue-50 border border-blue-200 h-screen w-full flex flex-col justify-between">
      <div>
        <Title level={4} className="mb-4">
          {isCanvasEmpty ? "Add Root Node" : "Node Details"}
        </Title>
        <Divider />

        {!isCanvasEmpty && selectedNode && (
          <>
            <NodeDetails node={selectedNode} />
            <Divider />
          </>
        )}

        <NodeForm
          label={label}
          setLabel={setLabel}
          type={nodeType}
          setType={setNodeType}
          isRoot={isCanvasEmpty}
          allowedChildren={allowedChildren}
        />

        {!isCanvasEmpty && selectedNode && allowedChildren.length === 0 && (
          <Text type="secondary" italic>
            This node type cannot have children.
          </Text>
        )}
      </div>

      <div>
        <Divider />
        <Space direction="vertical" className="w-full">
          <Button type="primary" block onClick={handleAddNode}>
            {isCanvasEmpty ? "Add Root Node" : "Add Child Node"}
          </Button>

          {selectedNode && (
            <Button
              danger
              block
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
            >
              Delete Node
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
