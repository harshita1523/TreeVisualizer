import { message } from "antd";

export const copyToClipboardWithMessage = async (text: string, label = "Text") => {
  try {
    await navigator.clipboard.writeText(text);
    message.success(`${label} copied to clipboard`);
  } catch {
    message.error(`Failed to copy ${label.toLowerCase()}`);
  }
};
