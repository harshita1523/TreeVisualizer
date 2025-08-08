import { Button } from "antd";
import { CloudUpload } from "lucide-react";
import React from "react";
import { useStore } from "../context/store";

const ExportJson: React.FC = () => {

  const nodes=useStore((s)=>s.nodes);  
  const edges=useStore((s)=>s.edges);


  console.log(nodes);
  console.log(edges);
  
  

  const exportToJson=()=>{
    const data={nodes,edges};
    const jsonString=JSON.stringify(data,null,2);

    const blob=new Blob([jsonString],{type:"application/json"});
    const url= URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download="exported-json-data.json";
    link.click();
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
      <Button
        type="primary"
        className="cursor-pointer "
        icon={<CloudUpload size={24} className="mt-1"/>}
        onClick={exportToJson}
      >
        Export to JSON
      </Button>
    </div>
  );
};

export default ExportJson;
