"use client";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "./NavBar";
import { useRouter } from 'next/router';

const AddTodo = () => {
  const [todo, setTodo] = useState<any>("");
  const [todos, setTodos] = useState<any[]>([]);
  const [AddmoretodoId, setAddMoreTodoId] = useState<number>();
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  let filteredTodos = todos;

  useEffect(() => {
    let localdata:any=localStorage.getItem("TODO") || [];
    setTodos(JSON.parse(localdata));
}, [])

  if (todosFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }
   const router = useRouter();
  

  //////////////////////////////////Add Todo//////////////////////////////////////////////////////////////////////////

  const handleFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (AddmoretodoId !== undefined) {
      let data3=  todos.map((task) =>
      task.id === AddmoretodoId
        ? {
            ...task,
            subtask: [
              ...task.subtask,
              {
                id: Math.random().toString(),
                todo: todo,
                completed: false,
                createddate: Date().toLocaleString(),
                updateddate: Date().toLocaleString(),
              },
            ],
          }
        : task
    )
    setTodos(data3);
    localStorage.setItem("TODO", JSON.stringify(data3));
  
    
    // return false;

      // await setTodos((prevTasks) =>
      //   prevTasks.map((task) =>
      //     task.id === AddmoretodoId
      //       ? {
      //           ...task,
      //           subtask: [
      //             ...task.subtask,
      //             {
      //               id: Math.random().toString(),
      //               todo: todo,
      //               completed: false,
      //               createddate: Date().toLocaleString(),
      //               updateddate: Date().toLocaleString(),
      //             },
      //           ],
      //         }
      //       : task
      //   )
      // );
      // localStorage.setItem("TODO", JSON.stringify(todos));
      setAddMoreTodoId(undefined);
    } else {
      let data4=[
        {
          id: Math.random().toString(),
          todo: todo,
          completed: false,
          createddate: Date().toLocaleString(),
          updateddate: Date().toLocaleString(),
          subtask: [],
        },
        ...todos,
      ]
      setTodos(data4);
      localStorage.setItem("TODO", JSON.stringify(data4));
    };
    setTodo("");
  };
  //////////////////////////////////////////Delete Todo///////////////////////////////////////////////////////////////////////////////////////////

  function handleDelete(id:number) {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      localStorage.setItem("TODO", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  function AddSubtodo(id: number) {
    setAddMoreTodoId(id);
  }


  /////////////////////////////////Delete TODO Finish//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////Completed task//////////////////////////////////////////////////////////////////////////////////////////

  function toggleTodoAsCompleted(id: number) {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("TODO", JSON.stringify(newTodos));
      return newTodos;
    });
  };
////////////////////////////////////////////Finish///////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////Delete Subtask /////////////////////////////////////////////////////////////////////////////
 const handleDeleteSubtask=(id:number,_id:number)=>{ 
    let MyTask=todos;
    let IndexData=MyTask.findIndex((item)=>item.id===id);
    let task=MyTask[IndexData];
    let Subtask=task.subtask;
    let SubtaskIndex=Subtask.findIndex((data:any)=>data.id===_id);
    if(SubtaskIndex!==-1){
      Subtask.splice(SubtaskIndex,1);
    }
    task.subtask=Subtask;
    MyTask[IndexData]=task;
    localStorage.setItem("TODO", JSON.stringify(MyTask));
    setTodos(MyTask);    
    window.location.reload();
  }

  //////////////////////////////////////////////Finish delete Subtask//////////////////////////////////////////////////////////////

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container" >
          <div className="row d-flex justify-content-center align-items-center h-100" >
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "15px" }} id="example3">
                <div className="card-body p-5">
                  <h1 className="mb-3">
                    {AddmoretodoId !== undefined ? (
                      <>ADD SUB TODO</>
                    ) : (
                      <>ADD TODO</>
                    )}
                  </h1>

                  <form
                    className="d-flex justify-content-center align-items-center mb-4 "
                    onSubmit={handleFormSubmit}
                  >
                    <div className="form-outline flex-fill">
                      <input
                        className="form-control"
                        style={{ backgroundColor: "#e2d5de" }}
                        type="text"
                        value={todo}
                        placeholder="Write your todo"
                        data-testid="todo-input"
                        onChange={(event) => setTodo(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg ms-2"
                      disabled={!todo}
                      data-testid="add-todo"
                    >
                      {AddmoretodoId !== undefined ? (
                        <>Add more Todo</>
                      ) : (
                        <>ADD</>
                      )}
                    </button>
                  </form>
                  <NavBar />

                  {filteredTodos !== undefined &&
                    filteredTodos.map((item: any, index: number) => {
                      return (
                        <div key={item.id}>
                          <ul className="list-group mb-0" data-testid="todo-list">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                              <div className="d-flex align-items-center">
                                <input
                                  className="form-check-input me-2"
                                  type="checkbox"
                                  id={`todo-${item.id}`}
                                  checked={item.completed}
                                  onChange={() =>
                                    toggleTodoAsCompleted(item.id)
                                  }
                                />
                                {item.todo}
                              </div>
                              {item.completed &&(
                                <button
                                data-testid={`delete-todo-${index}`}
                                  className="btn btn-danger btn-lg ms-2"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              )}


                              {router.query.todos===undefined?(<button
                                className="btn btn-primary btn-lg ms-2"
                                onClick={() => AddSubtodo(item.id)}
                              >
                                Add more Todo
                              </button>):""}
                      
                            </li>
                            
                          </ul>
                          <div >
                          {item.subtask.length>0?
                            <>{item.subtask.map((data:any)=>{
                              return(
                                <div style={{marginLeft:"120px"}}>
                                 <ul style={{display:"flex"}}className="list-group list-group-horizontal rounded-0 bg-transparent" >
                                  <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent" style={{marginBottom:"2px"}}>{data.todo}</li>
                                  <button style={{marginBottom:"2px"}} className="btn btn-danger btn-sm ms-2 " onClick={()=>handleDeleteSubtask(item.id,data.id)}>Delete</button>
                                 </ul>
                                </div>
                              )
                            })
                              }</>:""}
                          </div>
                          
                        </div>
                      );
                    })};
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTodo;
