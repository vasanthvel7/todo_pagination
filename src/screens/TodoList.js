import React, { useCallback, useEffect, useState } from 'react'
import { getTodos } from '../services/Services'
import TodoItem from '../components/TodoItem'
import classes from "../components/TodoItem.module.css"
import lodash, { debounce } from 'lodash'

function TodoList() {
  const [TodoData, setTodoData] = useState([])
  const [SearchText, setSearchText] = useState("")
  const [Pages, setPages] = useState({
    page: 1,
    size: 10,
    total_page:0
  })

  const splitArrayByPageandSize = (array, page = 1, size = 20, search_text= SearchText) => {
    let validArray = array
    if (search_text || SearchText)
      {
        validArray = validArray.filter((elem)=> elem.title.includes(search_text || SearchText))
      }
      console.log(validArray,"===>validArray");
    let findValidData = validArray.filter((elem, index) => {
      let startindex = (page - 1) * size;
      let endindex = page * size - 1;
      // console.log(startindex,endindex)
      return startindex <= index && endindex >= index
    })
    
    console.log(findValidData,page,size)
    return {
      data: findValidData,
      current_page:page,
      total_pages: validArray.length !== 0 ?  Math.ceil(validArray.length/size):0,
    };
  }


console.log(Pages)
  const getTodoData = (page = 1, size = 20,search_text = null) => {
    
    getTodos().then((response) => {
      const validFilteredArray = splitArrayByPageandSize(response.data, page, size,search_text)
      setTodoData(validFilteredArray.data)
      setPages({
        total_page: validFilteredArray.total_pages,
        page: page,
        size:size,
      })
      // console.log(response.data)
    }).catch((error) => {
      console.log(error.message)
    })
  }
  

  useEffect(() => {
    getTodoData()
  }, [])


  const SearchData =useCallback(lodash.debounce((search_key)=>getTodoData(1,Pages.size,search_key),2000),[])
  
  return (
    <div style={{
      width:"100%"
    }}>
      <div className={classes.pageperSec}>
        <div className={classes.pageSec}>
        <p>Count Per Page:</p>
      <select onChange={(e) => {
        setPages((pre)=>({
          ...pre,
          size:e.target.value
        }))
        getTodoData(1,e.target.value)
        // console.log(e.target.value)
      }}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
          </select>
          </div>
        <div className={classes.searchSec}>
          <input value={SearchText} onChange={(e) => {
            SearchData(e.target.value)
            setSearchText(e.target.value)
          }} />
          <button onClick={() => {
            
            setSearchText("")
            SearchData("")
          }} disabled={SearchText === ""}>Clear</button>
        </div>
        
      </div>
      
      {TodoData.length !== 0 ? TodoData.map((ele, index) => <TodoItem item={ele} key={`ele_${index}`} />) : <div>No Data Found</div>}
      {Pages.total_page !== 0 && <div className={classes.pageSec}>
        <button disabled={Pages.page === 1} onClick={() => {
          getTodoData(Pages.page - 1, Pages.size)
        }}>{"< Prev"}</button>
        {[...new Array(Pages.total_page)].map((ele, index) => <div onClick={() => {
          getTodoData(index + 1, Pages.size)
        }} className={Pages.page === index + 1 ? classes.active : ""}>{index + 1}</div>)}
        <button disabled={Pages.page === Pages.total_page} onClick={() => {
          getTodoData(Pages.page + 1, Pages.size)
        }}>{"Next >"}</button>
      </div>}
      
      </div>
  )
}

export default TodoList