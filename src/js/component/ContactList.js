import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadContacts(); 
    }, []); 

    return (
        <div>
            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                store.contacts.map(contact => (
                    <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        onDelete={() => actions.deleteContact(contact.id)} 
                    />
                ))
            ) : (
                <p>No hay contactos.</p>
            )}
        </div>
    );
};

export default ContactList;
