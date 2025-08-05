# 🧠 Tree Visualizer – Loan Management System

An interactive tree visualizer for building and managing hierarchical data structures in a **loan management system**, with clear visual representation of relationships between entities like **Accounts**, **Loans**, and **Collaterals**.

Built using **Vite**, **React**, **TypeScript**, **TailwindCSS**, **React Flow**, and **Ant Design**.

### 🌐 [Live Demo](https://your-vercel-link.vercel.app)

---

## 📦 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS + Ant Design (components, popovers, messages)
- **Visualization**: React Flow (custom nodes, edges, layout)
- **Deployment**: Vercel

---

## 🌳 Tree Structure & Data Model

Each node in the tree represents a business entity:

Defined in data/types.ts

```ts

type TreeNode = {
  id: string;
  type: 'Account' | 'Loan' | 'Collateral';
  data: {
    label: string;
  };
};

type TreeEdge = {
  id: string;
  source: string; // parent node ID
  target: string; // child node ID
};

//Node Types & Rules

export const NODE_TYPES = {
  ACCOUNT: 'Account',
  LOAN: 'Loan',
  COLLATERAL: 'Collateral',
} as const;

export const NODE_RULES = {
  Account: ['Loan', 'Collateral'],
  Loan: ['Collateral'],
  Collateral: [],
};

export const ROOT_NODE_TYPES = ['Account', 'Loan'];
```
## 🧠 Rules & Node Types

- ✅ **Only `Account` or `Loan` nodes can be root nodes.**
- ❌ **`Collateral` can never be a root.**
- 🔒 **Rules are enforced both:**
  - In **Side Panel dropdowns**
  - During **canvas edge connections**

---

## 🧠 UX Decisions

### 🎛 Side Panel Layout

- **Left pane** = Canvas  
- **Right pane (SidePanel)** = Controls + Node Details

#### 🟢 When _no node is selected_:
- Shows form to **add a root node**
- Only **root types** are shown in dropdown (`Account`, `Loan`)

#### 🔵 When _a node is selected_:
- Shows:
  - **Node ID, Type, Label**
  - Editable **Label** field
  - **Dropdown** to select valid child types (based on parent node's type)
  - ❌ Button to **Delete node and all descendants**

---

## ➕ Adding Nodes

- **Root node** → when:
  - Canvas is empty  
  - OR a node is _deselected_
- **Child node** → when a node is selected AND rules allow it

---

## ❌ Deleting Nodes

- Deletes the **selected node** and **all its descendants**
- Automatically updates:
  - Canvas
  - Edges
  - Store state

---

## 🧭 Flow Control

- 💡 **Layout Options** (via buttons on top-right):
  - `Vertical (TB)`
  - `Horizontal (LR)`

- 🔄 **Auto-layout is enforced**
  - No manual drag-and-drop
- 🔗 **Edge connection validation**:
  - Uses `validateConnection` logic based on `NODE_RULES`

---

## 🎨 Features

- ✨ Custom nodes styled using **TailwindCSS**
- 💬 **Popovers** via Ant Design to show node metadata
- 🆔 Copyable Node IDs with **Lucide icon**
- 🔄 Animated edges using `react-flow-renderer`
- 🗺 **MiniMap**, zoom controls, and snap-to-grid support
- ✅ Edge validation based on defined parent-child rules
- 💬 Helpful toast messages using `antd/message`


