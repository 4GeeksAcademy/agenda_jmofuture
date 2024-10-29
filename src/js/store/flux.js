const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            showModal: false,
            contactToEdit: null,
        },
        actions: {
            loadContacts: async () => {
                try {
                    const resp = await fetch("https://playground.4geeks.com/contact/agendas/jmofuture_agenda/contacts", {
                        mode: "cors"
                    });

                    if (!resp.ok) {
                        if (resp.status === 404) {
                            await getActions().createAgenda();
                            await getActions().loadContacts(); 
                        } else {
                            throw new Error(`Failed to load contacts: ${resp.status}`);
                        }
                    } else {
                        const data = await resp.json();

                        setStore({ contacts: Array.isArray(data.contacts) ? data.contacts : [] });
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            },

            createAgenda: async () => {
                try {
                    const resp = await fetch("https://playground.4geeks.com/contact/agendas/jmofuture_agenda", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ agenda_name: "jmofuture_agenda" }),
                        mode: "cors"
                    });
                    if (!resp.ok) throw new Error(`Error creando la agenda: ${resp.status}`);

                    console.log("Agenda creada");
                    getActions().loadContacts();
                } catch (error) {
                    console.error("Error:", error);
                }
            },

            addContact: async (contact) => {
                try {
                    const resp = await fetch("https://playground.4geeks.com/contact/agendas/jmofuture_agenda/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contact),
                    });
                    if (!resp.ok) throw new Error("Error agregando el contacto");
                    const newContact = await resp.json();
                    const store = getStore();
                    setStore({ contacts: [...store.contacts, newContact] });
                } catch (error) {
                    console.error("Error:", error);
                }
            },

            updateContact: async (id, contact) => {
                try {
                    const resp = await fetch(`https://playground.4geeks.com/contact/agendas/jmofuture_agenda/contacts/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contact),
                    });
                    if (!resp.ok) throw new Error("Error creando contacto");
                    const updatedContact = await resp.json();
                    const store = getStore();
                    const updatedContacts = store.contacts.map((c) => (c.id === id ? updatedContact : c));
                    setStore({ contacts: updatedContacts });
                } catch (error) {
                    console.error("Error:", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/jmofuture_agenda/contacts/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        console.log('Contact deleted:', id);
                        setStore(prevStore => ({
                            ...prevStore,
                            contacts: prevStore.contacts.filter(contact => contact.id !== id),
                        }));
                    } else {
                        throw new Error(`Failed: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            openEditModal: (contact) => {
                setStore({ showModal: true, contactToEdit: contact });
            },

            closeEditModal: () => {
                setStore({ showModal: false, contactToEdit: null });
            },
        },
    };
};

export default getState;
