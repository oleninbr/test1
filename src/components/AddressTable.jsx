import React, { useState } from 'react';

const AddressTable = ({ contacts, editId, setEditId, onUpdate }) => {
  // Локальний стан для полів редагування рядка
  const [editForm, setEditForm] = useState({});
  const [errors, setErrors] = useState({});

  const startEdit = (contact) => {
    setEditId(contact.id);
    setEditForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    ['firstName', 'lastName', 'phone'].forEach((field) => {
      if (!editForm[field] || !editForm[field].trim()) {
        const prettyField = field.replace(/([A-Z])/g, ' $1').toLowerCase();
        newErrors[field] = `The ${prettyField} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const saveEdit = (id) => {
    if (!validate()) return;
    onUpdate(id, editForm);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
    setErrors({});
  };

  return (
    <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>
              No data to display.
            </td>
          </tr>
        ) : (
          contacts.map((contact) =>
            editId === contact.id ? (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                {['firstName', 'lastName', 'phone'].map((field) => (
                  <td key={field}>
                    <input
                      type="text"
                      name={field}
                      value={editForm[field] || ''}
                      onChange={handleChange}
                      style={{ borderColor: errors[field] ? 'red' : undefined }}
                    />
                    {errors[field] && (
                      <div style={{ color: 'red', fontSize: '0.7em' }}>{errors[field]}</div>
                    )}
                  </td>
                ))}
                <td>
                  <button onClick={() => saveEdit(contact.id)}>Save</button>
                  <button onClick={cancelEdit} style={{ marginLeft: '5px' }}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => startEdit(contact)}>Edit</button>
                </td>
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
};

export default AddressTable;
