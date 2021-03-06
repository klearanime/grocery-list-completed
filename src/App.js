import React, { useEffect, useState } from "react"
import GroceryInput from "./GroceryInput"
import List from "./List"
import { GroceryInputContext, GroceryContext } from "./context/context"
import { v4 as uuidv4 } from 'uuid';
import "./App.css"



let listObj = [
  {
    id: 1,
    items: "milk",
    isDone: false,
  },
  {
    id: 2,
    items: "bread",
    isDone: false,
  },
]

function App() {
  const initialItems = window.localStorage.getItem("items")
  ? JSON.parse(window.localStorage.getItem("items")) 
  : []
  const [listArray, setListArray] = useState(listObj)

  function addGrocery(items) {
    let newAddedItemArray = [
      ...listArray,
    {
      id: uuidv4(),
      items,
      isDone: false,
    },
    ]
    setListArray(newAddedItemArray)
  }

  function showListInput() {
    return (
      <GroceryInputContext.Provider value={{ addGrocery }}>
        <GroceryInput />
      </GroceryInputContext.Provider>
    )
  }

  function handleDeleteByID(id) {
    let newListArray = listArray.filter((item) => item.id !== id)

    setListArray(newListArray)
  }

  function handleDoneByID(id) {
    let newListArray = listArray.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone
      }
      return item
  })
  setListArray(newListArray)
  }

  function showItem() {
    return listArray.map((item) => {
      return (
        <GroceryContext.Provider 
        key={item.id} value={{listItem: item, handleDoneByID, handleDeleteByID}}>
          <List />
        </GroceryContext.Provider>
      )
    })
  }

  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(listArray));
  }, [listArray])

  return (
    <div>
      <h1 className="name">Grocery List Completed</h1>
      <div className="App">
        {showListInput()}
        {showItem()}
      </div>
    </div>
  );
}



export default App;