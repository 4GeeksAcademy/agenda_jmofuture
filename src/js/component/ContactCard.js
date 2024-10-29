import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!contact) return null;

    const handleDelete = () => {
        actions.deleteContact(contact.id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="card mb-3" style={{ maxWidth: "100%" }}>
                <div className="row g-0">
                    <div className="col-md-4 d-flex justify-content-center align-items-center" style={{ height: "150px" }}> 
                        <img 
                            src="https://via.placeholder.com/150" 
                            className="img-fluid rounded-circle" 
                            alt={`${contact.name}'foto`} 
                            style={{ width: "100px", height: "100px" }} 
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p className="card-text"><strong><i class="fa-solid fa-location-dot"></i> Address:</strong> {contact.address}</p>
                            <p className="card-text"><strong><i class="fa-solid fa-phone"></i> Phone:</strong> {contact.phone}</p>
                            <p className="card-text"><i class="fa-solid fa-envelope"></i><strong> Email:</strong> {contact.email}</p>
                            <div className="d-flex gap-2 justify-content-end">
                                <button className="btn btn-primary" onClick={() => actions.openEditModal(contact)}><i class="fa-solid fa-pencil"></i></button>
                                <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Quieres eliminar este contacto?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>No</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Sí, Borrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactCard;
