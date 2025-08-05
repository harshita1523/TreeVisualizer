// nodeConfig.ts
import { Landmark,IndianRupee, Shield, type LucideIcon } from 'lucide-react';
import type { NodeType } from './types';

export const NODE_CONFIG: Record<NodeType, {
  icon: LucideIcon;
  bgClass: string;
  borderColor: string;
  iconClass:string;
}> = {
  Account: {
    icon: Landmark,
    bgClass: 'bg-gradient-to-r from-indigo-100 to-indigo-300',
    borderColor: 'border-indigo-400',
    iconClass:'text-indigo-400',
  },
  Loan: {
    icon: IndianRupee,
    bgClass: 'bg-gradient-to-r from-emerald-100 to-emerald-300',
    borderColor: 'border-emerald-400',
    iconClass:'text-emerald-400',
  },
  Collateral: {
    icon: Shield,
    bgClass: 'bg-gradient-to-r from-amber-100 to-amber-300',
    borderColor: 'border-amber-400',
    iconClass:'text-amber-400',
  },
};
