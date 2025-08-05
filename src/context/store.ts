
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
        const newNode: TreeNode={
            id,
            type,
            data:{label:label ?? `${type} ${id}`},
        }

        if(parentId){
            const edgeId = uuidv4();
            const newEdge:TreeeEdge={
                id:edgeId,
                source:parentId,
                target:id,
                animated:true,
                
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
        
        const findDescendants=(parentId:string,acc:Set<String>)=>{
            const children=edges.filter((edge)=>edge.source===parentId).map((edge)=>edge.target)

            for(const childId of children){
                if(!acc.has(childId)){
                    acc.add(childId);
                    findDescendants(childId,acc);
                }
            }
        }

        const idsToDelete=new Set<String>();
        idsToDelete.add(id);
        findDescendants(id, idsToDelete);

        const updatedNodes=nodes.filter((ele)=>!idsToDelete.has(ele.id));
        const updatedEdges=edges.filter((ele)=>!idsToDelete.has(ele.id));

        set({
            nodes:updatedNodes,
            edges:updatedEdges
        })
    }

}))

export const store=useStore;