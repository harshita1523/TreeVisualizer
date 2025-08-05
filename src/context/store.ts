
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import type { NodeType, TreeeEdge, TreeNode } from "../data/types";

export interface TreeStore{
    nodes:TreeNode[];
    edges:TreeeEdge[];
    selectedNode?:TreeNode;
    setNodes:(nodes:TreeNode[])=>void;
    setEdges:(edges:TreeeEdge[])=>void;
    setSelectedNode:(nodeId:TreeNode["id"])=>void;
    addNode:(nodeType:NodeType,label:string,parentId?:TreeNode["id"])=>void;
    deleteNode:(id:TreeNode["id"])=>void;
}


export const useStore=create<TreeStore>((set,get)=>({

    nodes:[],
    edges:[],
    setNodes:(nodes)=>set({nodes}),
    setEdges:(edges)=>set({edges}),
    setSelectedNode:(id:TreeNode["id"])=>{
       set({selectedNode:get().nodes.find((n)=>n.id===id)}) 
    },
    addNode:(type,label,parentId)=>{
        const id=uuidv4();
        
        const newNode:TreeNode={
            id,
            type,
            data:{label:label ?? `${type} ${id}`},
            position:{
                x:0,y:0
            }

        }

        if(parentId){
            const edgeId = uuidv4();
            const newEdge:TreeeEdge={
                id:edgeId,
                source:parentId,
                target:id,
            }
            set((state)=>({
                nodes:[...state.nodes, newNode],
                edges:[...state.edges,newEdge]
            }))
        }
        

        set((state)=>({
            nodes:[...state.nodes, newNode],
        }))
    },
    deleteNode:(id:TreeNode["id"])=>{
        const {edges,nodes}=get();
        console.log("Edges..",edges);
        console.log("Enodees..",nodes);
        console.log("id..",id);
    }

}))