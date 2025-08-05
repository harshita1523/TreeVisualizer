export type NodeType = 'Account' | 'Loan' | 'Collateral';

export type LayoutDirection = 'TB' | 'LR';

export interface TreeNode{
    id:string;
    type:NodeType;
    data:{
        label:string
    };
}

export interface TreeeEdge{
    id:string;
    source:string;
    target:string;
}

export const NODE_TYPES={
    ACCOUNT:'Account',
    LOAN:'Loan',
    COLLATERAL:'Collateral'
} as const;

export const NODE_RULES:Record<NodeType,NodeType[]> ={
    [NODE_TYPES.ACCOUNT]:[NODE_TYPES.LOAN,NODE_TYPES.COLLATERAL],
    [NODE_TYPES.LOAN]:[NODE_TYPES.COLLATERAL],
    [NODE_TYPES.COLLATERAL]:[],
}

export const ROOT_NODE_TYPES:NodeType[]=[NODE_TYPES.ACCOUNT,NODE_TYPES.LOAN];