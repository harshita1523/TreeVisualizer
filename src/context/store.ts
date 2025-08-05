
import { create } from "zustand";
import type { NodeType, TreeeEdge, TreeNode } from "../data/types";

export interface TreeStore{
    nodes:TreeNode[];
    edges:TreeeEdge[];
    setNodes:(nodes:TreeNode[])=>void;
    setEdges:(edges:TreeeEdge[])=>void;
    addNode:(parentId:TreeNode["id"],nodeType:NodeType,label?:string)=>void;
    deleteNode:(id:TreeNode["id"])=>void;
}


const useStore=create<TreeStore>((set,get)=>({

    nodes:[],
    edges:[],
    setNodes:(nodes)=>set({nodes}),
    setEdges:(edges)=>set({edges}),
    addNode:(parentId,type,label)=>{
        const id="fghjk";
        const edgeId="ddfghjk";
        const newNode:TreeNode={
            id,
            type,
            data:{label:label ?? `${type} ${id}`},
            position:{
                x:0,y:0
            }

        }
        const newEdge:TreeeEdge={
            id:edgeId,
            source:parentId,
            target:id,
        }

        set((state)=>({
            nodes:[...state.nodes, newNode],
            edges:[...state.edges,newEdge]
        }))
    },
    deleteNode:(id:TreeNode["id"])=>{
        const {edges,nodes}=get();
        console.log("Edges..",edges);
        console.log("Enodees..",nodes);
        console.log("id..",id);
    }

}))