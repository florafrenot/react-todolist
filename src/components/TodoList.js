import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {

    // afin de récupérer un Json et de le sauvegarder
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks') || [])
    });
    const [taskList, setTaskList] = useState([]);

    //permet l'ajout d'une tâche et d(un ID aléatoire
    function addTask(name) {
        const newTask = { id: Math.floor(Math.random() * 100), name, completed: false };
        // console.log(`La nouvelle tâche ${name} ajoutée & a l'ID : ${newTask.id}`)
        setTasks([...tasks, newTask]);
        setTaskList([...taskList, newTask]);
    }

    //j'utilise useEffect qui permet d'effectuer une action à un moment donné
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTaskList(tasks);
    }, [tasks]);


    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    //suppresion d'une tâche, ajout une prop au tableau de composant Todo, je mets une alerte de confirmation
    function deleteTask(id) {
        const isConfirmed = window.confirm("Etes-vous sûr de vouloir  supprimer cette tâche ?");
        if (isConfirmed) {
            const remainingTasks = tasks.filter((task) => id !== task.id);
            // console.log(`La tâche avec l'id: ${id} a bien été supprimée.`);
            setTasks(remainingTasks);
            setTaskList(remainingTasks);
        }
    }


    //éditer une tâche, les 2 états (setTasks + setTaskList sont mis à jour)
    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTaskList);
        setTaskList(editedTaskList);
    }

    //pour le filtrage des filtrages des tâches
    function updateTodosToShow(filter) {
        switch (filter) {
            case "completed":
                setTaskList(tasks.filter(task => task.completed === true));
                break;
            case "uncompleted":
                setTaskList(tasks.filter(task => !task.completed));
                break;
            default:
                setTaskList(tasks);
                break;
        }
    }

    //afficher le nombre de tâches non réalisées
    // const tasksWords = taskList.length !== 1 ? "tâches restantes" : "tâche restante";
    // const headingText = `${taskList.length} ${tasksWords}`;

    return (
        <>
            <div className="pb-2 form">
                {/* formulaire */}
                <TodoForm addTask={addTask} />
                {/* fin du formulaire */}
            </div>
            <div className="mt-2">
                {/* <p className="" id="list-heading">{headingText}</p> */}

                {/* boutons de filtrage */}
                <div className="d-flex justify-content-end">
                    <div className="btn-group mb-4" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-dark ms-2" onClick={() => updateTodosToShow("all")}>Toutes</button>
                        <button type="button" className="btn btn-outline-danger ms-2" onClick={() => updateTodosToShow("uncompleted")}>A faire</button>
                        <button type="button" className="btn btn-outline-success ms-2" onClick={() => updateTodosToShow("completed")}>Terminées</button>
                    </div>
                </div>
                {/* fin des boutons de filtrage */}

                {taskList.map((task) => (
                    <Todo
                        id={task.id}
                        name={task.name}
                        completed={task.completed}
                        key={task.id}
                        toggleTaskCompleted={toggleTaskCompleted}
                        deleteTask={deleteTask}
                        editTask={editTask}

                    />
                ))}
            </div>
        </>
    )
}

export default TodoList
