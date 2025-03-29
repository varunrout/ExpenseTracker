import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, fetch all expenses
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/expenses');
      setExpenses(res.data); // Expecting an array of expenses
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await axios.post('/expenses', expenseData);
      setExpenses((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // For updating or deleting expenses, you'd define similar functions

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        fetchExpenses,
        addExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
