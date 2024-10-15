"use client";
import { useState } from "react"; // Importing useState for managing state
import ExpenseModal from "./ExpenseModal"; // Importing ExpenseModal component
import { ExpenseListTypes } from "./types"; // Importing ExpenseListTypes type
import { FaEdit, FaPlus } from "react-icons/fa"; // Importing icons for edit and add
import { MdDelete } from "react-icons/md"; // Importing delete icon

// Main ExpenseList component definition
export default function ExpenseList() {
  // State for managing expenses, modal visibility, total amount, and the currently editing expense
  const [expenses, setExpenses] = useState<ExpenseListTypes[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [total, setTotal] = useState(0); // Total expense amount
  const [editingExpense, setEditingExpense] = useState<ExpenseListTypes | null>(
    null
  ); // Currently editing expense

  // Handler to open modal for adding a new expense
  const isOpenHandler = () => {
    setIsOpen(true);
    setEditingExpense(null); // Reset editing state when opening modal for adding
  };

  // Handler to edit an existing expense
  const onEditHandler = (updatedExpense: ExpenseListTypes) => {
    // Update the expenses state with the edited expense
    setExpenses(
      expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    // Update the total amount after editing
    setTotal(
      expenses.reduce((acc, e) => acc + e.amount, 0) +
        updatedExpense.amount -
        (expenses.find((e) => e.id === updatedExpense.id)?.amount || 0)
    );
  };

  // Handler to update expense and close modal
  const onUpdateHandler = (updatedExpense: ExpenseListTypes) => {
    onEditHandler(updatedExpense); // Call the edit handler
    setIsOpen(false); // Close the modal
  };

  // Handler to close the modal
  const onCloseHandler = () => {
    setIsOpen(false);
  };

  // Handler to add a new expense
  const onAddExpense = (expense: ExpenseListTypes) => {
    setExpenses([...expenses, expense]); // Add new expense to the list
    setTotal(total + expense.amount); // Update the total amount
    onCloseHandler(); // Close the modal after adding
  };

  // Handler to delete an expense
  const onDeleteHandler = (expenseId: number) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    ); // Filter out the deleted expense
    const deletedExpense = expenses.find((expense) => expense.id === expenseId); // Find the deleted expense to adjust total
    if (deletedExpense) {
      setTotal(total - deletedExpense.amount); // Update total amount
    }
    setExpenses(updatedExpenses); // Update expenses state
  };

  // Handler to open edit modal with selected expense
  const openEditModal = (expense: ExpenseListTypes) => {
    setEditingExpense(expense); // Set the expense to be edited
    setIsOpen(true); // Open the modal
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Header section */}
      <header className="bg-teal-600 text-white py-4">
        <h1 className="text-center text-3xl sm:text-4xl font-bold uppercase underline">
          Expense Tracker App
        </h1>
      </header>

      {/* Container for expense list and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mx-6 my-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Expense List
        </h2>
        <button
          onClick={isOpenHandler} // Opens modal to add expense
          className="bg-teal-500 flex items-center gap-2 hover:bg-teal-600 transition duration-300 text-white font-bold py-2 px-4 rounded-lg shadow-lg mt-4 sm:mt-0"
        >
          Add Expense <FaPlus className="text-lg" /> {/* Add icon */}
        </button>
      </div>

      {/* Expense modal for adding/editing expenses */}
      <ExpenseModal
        isOpen={isOpen} // Pass modal open state
        onClose={onCloseHandler} // Pass close handler
        onAddExpense={onAddExpense} // Pass add expense handler
        onUpdateHandler={onUpdateHandler} // Pass update handler
        expense={editingExpense || undefined} // Pass current expense for editing
      />

      {/* Table for displaying expenses */}
      <div className="px-6 my-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-teal-100 text-teal-600 text-center">
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                ID
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                Amount
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                Category
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                Note
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                Date
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? ( // Check if there are expenses to display
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-50 transition text-center"
                >
                  <td className="px-4 py-2 text-gray-800 text-sm sm:text-base">
                    {expense.id}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-sm sm:text-base">
                    {expense.amount}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-sm sm:text-base">
                    {expense.category}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-sm sm:text-base">
                    {expense.note}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-sm sm:text-base">
                    {expense.date}
                  </td>
                  <td className="px-4 py-2 flex justify-center space-x-2 text-sm sm:text-base">
                    <button
                      className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 sm:py-1 sm:px-3 rounded-lg transition duration-300"
                      onClick={() => openEditModal(expense)} // Opens edit modal for selected expense
                    >
                      <FaEdit className="mr-1 text-sm sm:text-base" />{" "}
                      {/* Edit icon */}
                      Edit
                    </button>
                    <button
                      className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 sm:py-1 sm:px-3 rounded-lg transition duration-300"
                      onClick={() => onDeleteHandler(expense.id)} // Deletes selected expense
                    >
                      <MdDelete className="mr-1 text-sm sm:text-base" />{" "}
                      {/* Delete icon */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-2 text-center text-gray-600 font-semibold text-sm sm:text-base"
                >
                  No Expenses Found!{" "}
                  {/* Message when no expenses are available */}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total amount display */}
        <div className="flex justify-end px-6 py-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Total: PKR <span className="font-bold">{total.toFixed(2)}</span>
          </h3>{" "}
          {/* Format total to 2 decimal places */}
        </div>
      </div>
    </div>
  );
}
