import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Input,
  Select,
  Typography,
  Space,
  message,
} from 'antd';
import { NODE_RULES, NODE_TYPES as NODE_TYPE, type NodeType, type TreeNode } from '../data/types';
import { useStore } from '../context/store';

const { Text, Title } = Typography;

interface SidePanelProps {
  onClose: () => void;
  selectedNode: TreeNode | null;
}

export default function SidePanel({ onClose, selectedNode }: SidePanelProps) {

  const allNodes=useStore((s)=>s.nodes);
  const addNode = useStore((s) => s.addNode);
  const deleteNode = useStore((s) => s.deleteNode);

  const [label, setLabel] = useState('');
  const [type, setType] = useState<string>(NODE_TYPE.ACCOUNT);

  // Sync form state when node is selected
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
      setType(selectedNode.type);
    } else {
      setLabel('');
      setType(NODE_TYPE.ACCOUNT);
    }
  }, [selectedNode]);

  const allowedChildren = selectedNode ? NODE_RULES[selectedNode.type] : [];

  const handleAddNode = () => {
    if (!label.trim()) {
      message.warning('Label is required');
      return;
    }

    addNode( type as NodeType, label);
    message.success(`Added ${type} node`);
    onClose();
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    deleteNode(selectedNode.id);
    message.success('Node deleted');
    onClose();
  };

  return (
    <div className="p-5 bg-blue-50 border border-blue-200 h-screen w-full flex flex-col justify-between">
        <div>
        <Title level={4} className="mb-4">
          {selectedNode ? 'Edit Node' : 'Add Root Node'}
        </Title>
        <Divider/>

        {/* Label */}
        <Text strong>Label</Text>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter node label"
          className="mb-4"
        />

        {/* Type */}
        <Text strong>Type</Text>
        <Select
          value={type}
          onChange={(value) => setType(value)}
          className="mb-4 w-full"
        >
          {Object.values(NODE_TYPE).map((t) => (
            <Select.Option key={t} value={t}>
              {t}
            </Select.Option>
          ))}
        </Select>

        {/* Node ID */}
        {selectedNode && (
          <p className="mb-4 text-gray-600 text-sm">
            <Text strong>ID:</Text> {selectedNode.id}
          </p>
        )}

        {/* Add Child Buttons */}
        {selectedNode && (
          <>
            <Divider orientation="left">Add Child</Divider>
            {allowedChildren.length > 0 ? (
              allowedChildren.map((childType) => (
                <Button
                  key={childType}
                  block
                  className="mb-2"
                  onClick={() => addNode( childType, label)}
                >
                  ➕ Add {childType}
                </Button>
              ))
            ) : (
              <Text type="secondary" italic>
                No valid children
              </Text>
            )}
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div>
        <Divider />
        <Space direction="vertical" className="w-full">
          <Button
            type="primary"
            block
            onClick={handleAddNode}
          >
            {selectedNode ? 'Update Node' : 'Add Root Node'}
          </Button>

          {selectedNode && (
            <Button danger block onClick={handleDelete}>
              🗑️ Delete Node
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}
