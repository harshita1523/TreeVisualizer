import { store} from "../context/store";
import { NODE_RULES } from "../data/types";

const validateConnection = (sourceId: string, targetId: string) => {
  const sourceNode = store.getState().nodes.find((n) => n.id === sourceId);
  const targetNode = store.getState().nodes.find((n) => n.id === targetId);

  if (!sourceNode || !targetNode) return false;

  const allowed = NODE_RULES[sourceNode.type];
  return allowed.includes(targetNode.type);
};
