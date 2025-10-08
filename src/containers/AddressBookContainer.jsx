import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import AddressTable from '../components/AddressTable';
import { generateUniqueId } from '../utils/idGenerator';

const AddressBookContainer = () => {
  // Стан списку контактів
  const [contacts, setContacts] = useState([]);
  // Стан для редагування: id редагованого контакту
  const [editId, setEditId] = useState(null);
  // Стан для пошукового рядка
  const [searchTerm, setSearchTerm] = useState('');

  // Додавання нового контакту
  const addContact = (contact) => {
    const newContact = { ...contact, id: generateUniqueId() };
    setContacts((prev) => [...prev, newContact]);
  };

  // Оновлення існуючого контакту (редагування)
  const updateContact = (id, updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedContact } : c))
    );
    setEditId(null);
  };

  // Фільтрація контактів за пошуковим запитом (пошук по філах)
  const filteredContacts = contacts.filter(({ firstName, lastName, phone }) => {
    const term = searchTerm.toLowerCase();
    return (
      firstName.toLowerCase().includes(term) ||
      lastName.toLowerCase().includes(term) ||
      phone.includes(term)
    );
  });

  return (
    <div>
      <h1>Address Book</h1>
      <AddressForm
        onAdd={addContact}
        onUpdate={updateContact}
        editId={editId}
        contacts={contacts}
        setEditId={setEditId}
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', padding: '5px', width: '100%' }}
      />
      <AddressTable
        contacts={filteredContacts}
        editId={editId}
        setEditId={setEditId}
        onUpdate={updateContact}
      />
      {contacts.length === 0 && <p>No data to display.</p>}
    </div>
  );
};

export default AddressBookContainer;
