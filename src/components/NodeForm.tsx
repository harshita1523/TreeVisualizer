import { Input, Select, Typography } from "antd";
import {NodeTypeOptions, ROOT_NODE_TYPES, type NodeType } from "../data/types";

const { Text } = Typography;

interface Props {
  label: string;
  setLabel: (val: string) => void;
  type: NodeType | null;
  setType: (val: NodeType) => void;
  isRoot: boolean;
  allowedChildren?: NodeType[];
}

export default function NodeForm({
  label,
  setLabel,
  type,
  setType,
  isRoot,
}: Props) {
  return (
    <>

      <Text strong>Label</Text>
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter Node Label"
        className="mb-4"
      />

      <Text strong>Select {isRoot ? "Root" : "Child"} Type</Text>
      <Select
        placeholder="Select Node Type (Account, Loan, Collateral)"
        value={type ?? undefined}
        onChange={(val) => setType(val)}
        className="mb-4 w-full"
        options={
          (isRoot
            ? ROOT_NODE_TYPES
            : NodeTypeOptions
          ).map((t) => ({
            label: t,
            value: t,
          }))
        }
      />
    </>
  );
}
