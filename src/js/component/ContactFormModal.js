import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const ContactFormModal = ({ show, onClose, contactToEdit }) => {
    const { actions } = useContext(Context);
    const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });

    useEffect(() => {
        if (contactToEdit) {
            setContact(contactToEdit);
        } else {
            setContact({ name: "", phone: "", email: "", address: "" });
        }
    }, [contactToEdit]);

    const handleSubmit = async () => {
        if (!contact.name || !contact.phone || !contact.email || !contact.address) {
            alert("Todos los campos son necesarios!");
            return;
        }
        
        try {
            if (contactToEdit) {
                await actions.updateContact(contact.id, contact); 
            } else {
                await actions.addContact(contact); 
            }
            onClose(); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        show && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{contactToEdit ? "Editar Contacto" : "Agregar Contacto"}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Name"
                                value={contact.name}
                                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                className="form-control mb-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={contact.email}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={contact.address}
                                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                                className="form-control mb-2"
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ContactFormModal;
