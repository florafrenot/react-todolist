import React, { useState } from 'react'

function TodoForm(props) {
    //setName permet de modifier le nom & useState renvoie les deux valeurs
    // const [name, setName] = useState("Juste un test");
    const [name, setName] = useState('');

    //pour la saisie du formulaire
    function handleChange(e) {
        setName(e.target.value);
    }

    //lors de la soumission du fomulaire, je mets un preventDefault pour empêcher la soumission
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }


    return (
        //ajout de l'attribut onSubmit et de la fonction
        <div className="d-flex align-items-center justify-content-center mt-5">

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-11">
                        <input
                            type="text"
                            id="new-todo-input"
                            className="form-control fw-medium fst-italic"
                            placeholder="Renseigne ta mission Padawan..."
                            name="text"
                            autoComplete="off"
                            value={name}
                            onChange={handleChange} //pour capturer ce qui est saisi
                        />
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary mb-3">
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default TodoForm