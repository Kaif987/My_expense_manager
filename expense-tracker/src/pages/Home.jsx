import React, { useState } from 'react'
import { useExpenseContext } from '../Hooks/useExpenseContext'
import CreateNewExpense from '../Components/CreateNewExpense'
import ExpenseItem from '../Components/ExpenseItem'

export default function Home() {
    const {expense} = useExpenseContext()    
    const [newExpenseModalOpen, setNewExpenseModalOpen] = useState(false)
    const [filterValue, setFilterValue] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const toggle = () => {
        setNewExpenseModalOpen(prev => !prev)
    }

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }

    const filteredExpense = expense.filter(item => {
        if (filterValue === '' && searchValue === '') {
          return true
        } else if (filterValue !== '' && item.date.includes(filterValue)) {
          return true
        } else if (searchValue !== '' && item.name.toLowerCase().includes(searchValue.toLowerCase())) {
          return true
        } else {
          return false
        }
      })
      


  return (
    <div className=''>
        {newExpenseModalOpen  ?
             <CreateNewExpense toggle= {toggle} />
             :
            <div>
                <div className='flex flex-col justify-between md:flex-row'>
                    <h1 className='font-semibold text-2xl'>My Expense Manager</h1>
                    <div className='flex flex-col  gap-2 lg:flex-row'>
                        <div className='flex gap-2'>
                            <input type="date" className='border-4 rounded border-black px-4 font-medium text-gray-600' onChange={handleFilterChange} placeholder= "Filter By Date of Expense"></input>
                            <input placeholder='Search Expense by Name' className='border-4 rounded border-black px-4 font-medium text-gray-600' onChange={(e) => setSearchValue(e.target.value)}></input>
                        </div>
                        <button className='px-5  py-1 rounded font-medium bg-green-500 text-white' onClick={toggle}>+ New Expense</button>
                    </div>
                </div>
                <table className='w-full  rounded-md mt-6 border overflow-x-auto'>
                    <thead className='text-gray-700'>
                        <tr className='bg-gray-300 border border-black'>
                            <th className='font-semibold py-3 border border-black'>Name</th>
                            <th className='font-semibold py-3 border border-black'>Category</th>
                            <th className='font-semibold py-3 border border-black'>Date of Expense</th>
                            <th className='font-semibold py-3 border border-black'>Amount</th>
                            <th className='font-semibold py-3 border border-black'>Updated At</th>
                            <th className='font-semibold py-3 border border-black'>Created By</th>
                            <th className='font-semibold py-3 border border-black w-20'>{" "}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpense.map((item) => {
                            return <ExpenseItem item= {item} key={item._id} />
                        })}
                    </tbody>
                </table>
            </div>
        }
    </div>
  )
}
