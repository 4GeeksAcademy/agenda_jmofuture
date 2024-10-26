import React, { useContext, useEffect } from "react";
import ContactList from "../component/ContactList"; // Asegúrate de que la ruta sea correcta
import ContactFormModal from "../component/ContactFormModal";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadContacts();
    }, []);

    return (
        <div className="container" style={{ maxWidth: "50vw" }}>

			<div className="d-flex justify-content-end">
				<button className="btn btn-success my-3" onClick={() => actions.openEditModal(null)}>
					Agregar Contacto
				</button>
			</div>

            <ContactList /> 

            <ContactFormModal 
                show={store.showModal} 
                onClose={actions.closeEditModal} 
                contactToEdit={store.contactToEdit} 
            />
        </div>
    );
};
