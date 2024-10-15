export interface ExpenseListTypes {
    id: number;
    note: string;
    date: string;
    amount: number;
    category: string;
  }
  
  export interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddExpense: (expense: ExpenseListTypes) => void;
    onUpdateHandler?: (expense: ExpenseListTypes) => void;
    expense?: ExpenseListTypes;
  }
  