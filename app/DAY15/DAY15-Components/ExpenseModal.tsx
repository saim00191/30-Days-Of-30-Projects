'use client';
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { ExpenseListTypes, ExpenseModalProps } from "./types";

// ExpenseModal component definition
export default function ExpenseModal({
    isOpen, // Flag to determine if modal is open
    onClose, // Function to close the modal
    onAddExpense, // Function to add a new expense
    onUpdateHandler, // Function to update an existing expense
    expense // The current expense to edit (if any)
}: ExpenseModalProps) {
    // State variables to manage form inputs and errors
    const [amount, setAmount] = useState<number>(0); // Amount input
    const [category, setCategory] = useState<string>(""); // Category selection
    const [note, setNote] = useState<string>(""); // Note input
    const [date, setDate] = useState<string>(""); // Date input
    const [error, setError] = useState<string>(""); // General error message
    const [amountError, setAmountError] = useState<string>(""); // Amount-specific error message

    // List of available expense categories
    const categories: string[] = [
        "Groceries",
        "Utilities",
        "Rent",
        "Transportation",
        "Dining Out",
        "Healthcare",
        "Entertainment",
        "Education",
        "Other",
    ];

    // Function to count the number of letters in a string (excluding spaces)
    const countLetters = (text: string): number => {
        return text.replace(/\s+/g, '').length;
    };

    // Function to count the number of digits in a string
    const countDigits = (text: string): number => {
        return text.replace(/[^0-9]/g, '').length;
    };

    // Handler for form submission
    const handleSubmit = () => {
        // Check if all fields are filled
        if (!amount || !category || !note || !date) {
            setError("Please fill in all fields before submitting.");
            return;
        }

        // Validate note length
        if (countLetters(note) > 30) {
            setError("Note cannot exceed 30 words.");
            return;
        }

        // Validate amount digit count
        if (countDigits(amount.toString()) > 10) {
            setAmountError("Amount cannot exceed 10 digits.");
            return;
        }

        // Clear error messages if validation passes
        setError("");

        // Create new expense object
        const newExpense: ExpenseListTypes = {
            id: expense?.id || Date.now(), // Use existing ID or generate a new one
            amount: parseFloat(amount.toFixed(2)), // Format amount to 2 decimal places
            category,
            note,
            date,
        };

        // Call the appropriate handler based on whether we're editing or adding
        if (expense) {
            onUpdateHandler?.(newExpense); // Optional chaining in case the handler is not defined
        } else {
            onAddExpense(newExpense);
        }

        // Clear fields after submission
        resetForm();
        onClose(); // Close the modal
    };

    // Reset form fields and error messages
    const resetForm = () => {
        setAmount(0);
        setCategory("");
        setNote("");
        setDate("");
        setError("");
        setAmountError(""); // Reset amount error as well
    };

    // Effect to initialize form fields when the modal opens
    useEffect(() => {
        if (isOpen) {
            if (expense) {
                // If editing, populate fields with existing expense data
                setAmount(expense.amount);
                setCategory(expense.category);
                setNote(expense.note);
                setDate(expense.date);
            } else {
                resetForm(); // Reset form if adding new expense
            }
        }
    }, [isOpen, expense]); // Runs when `isOpen` or `expense` changes

    return (
        <div className={`${isOpen ? "fixed inset-0 z-50 flex justify-center items-center" : "hidden"}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-white z-50 border border-gray-200 shadow-xl rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{expense ? "Edit Expense" : "Add Expense"}</h1>
                    <button className="text-gray-500 hover:text-red-500 transition font-semibold duration-300" onClick={onClose}>
                        <RxCross2 size={24} /> {/* Close button */}
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Amount</h3>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                        />
                        {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Category</h3>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Note</h3>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Add a note"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Date</h3>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-right mt-6">
                        <button
                            onClick={handleSubmit}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                        >
                            {expense ? "Update Expense" : "Add Expense"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}