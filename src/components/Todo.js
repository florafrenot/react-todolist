import React, { useEffect, useRef, useState } from 'react';

function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(props.name);

    const editFieldRef = useRef(null);
    // const editButtonRef = useRef(null);

    //si l'utilisateur clique sur le bouton "éditer" et je passe à vrai
    const handleEditClick = () => {
        setEditing(true);
    };

    //si l'utilisateur clique sur le bouton "sauvegarder" et ke passe l'état à faux
    const handleSaveClick = () => {
        props.editTask(props.id, newName);
        setEditing(false);
    };

    //si l'utilisateur clique sur le bouton "annuler" et ke passe l'état à faux, j'annule
    const handleCancelClick = () => {
        setNewName(props.name);
        setEditing(false);
    };

    useEffect(() => {
        if (isEditing) {
            editFieldRef.current.focus();
        }
    }, [isEditing]);


    return (
        // si la tâche est cochée, je la surligne
        <div className={`d-flex justify-content-between align-items-center px-2 mb-2 border rounded-3 ${props.completed ? 'completed-task' : ''}`}>
            <div>
                {/* j'utilise une condition ternaire pour afficher le contenu de l'éditioon */}
                {isEditing ? (
                    <div className="form-group">
                        <input
                            id={props.id}
                            className="form-control"
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            ref={editFieldRef}
                        />
                    </div>
                ) : (
                    <>
                        <div className="form-check">
                            <input
                                id={props.id}
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={props.completed}
                                onChange={() => props.toggleTaskCompleted(props.id)}
                            />
                            <label className={`form-check-label ${props.completed ? 'completed-task' : ''}`} htmlFor={props.id}>
                                {props.name}
                            </label>
                        </div>
                    </>
                )
                }
            </div>
            <div className="btn-group ms-2">
                {isEditing ? (
                    <>
                        {/* boutons dédition et d'annulation */}
                        <div>
                            <button
                                type="button"
                                className="btn btn-success m-2"
                                data-bs-toggle="tooltip"
                                title="Sauvegarder"
                                onClick={handleSaveClick}
                            ><i className="fa-solid fa-check"></i>
                                {/* Sauvegarder */}
                            </button>
                            {/* j'ajoute également une infobulle data-bs-toogle */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="tooltip"
                                title="Annuler"
                                onClick={handleCancelClick}
                            ><i className="fa-solid fa-xmark"></i>
                                {/* Annuler */}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* si la condition est fausse, je montre les boutons supprimer et éditer */}
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary m-2"
                                data-bs-toggle="tooltip"
                                title="Editer"
                                onClick={handleEditClick}><i className="fa-solid fa-pen"></i>
                                <span className="visually-hidden">{props.name}</span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="tooltip"
                                title="Supprimer"
                                onClick={() => props.deleteTask(props.id)}
                            ><i className="fa-solid fa-trash"></i><span className="visually-hidden">{props.name}</span>
                            </button>
                        </div>
                        {/* fin de l'ajout des boutons supprimer et éditer */}
                    </>
                )}
            </div>
        </div>
    );
}

export default Todo