import React from "react";
import TodoList from "./components/TodoList";

function App() {


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="title mb-3 text-center mt-3">Ma ToDoList</h1>
            {/* <TodoList /> */}
            <TodoList />

          </div>

        </div>
      </div >
    </>
  );
}

export default App;
