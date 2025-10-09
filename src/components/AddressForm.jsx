import React, { useMemo } from 'react';
import useForm from '../hooks/useForm';

const AddressForm = ({ onAdd, onUpdate, editId, contacts, setEditId }) => {
  const initialForm = useMemo(() => {
    return editId
      ? contacts.find((c) => c.id === editId) || { firstName: '', lastName: '', phone: '' }
      : { firstName: '', lastName: '', phone: '' };
  }, [editId, contacts]);

  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(initialForm);

  const submit = () => {
    if (editId) {
      onUpdate(editId, values);
      setEditId(null);
    } else {
      onAdd(values);
    }
    resetForm();
  };

  const cancelEdit = () => {
    setEditId(null);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      {['firstName', 'lastName', 'phone'].map((field) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <label>
            {field.replace(/([A-Z])/g, ' $1')}
            <input
              type="text"
              name={field}
              value={values[field] || ''}
              onChange={handleChange}
              style={{ marginLeft: '10px', borderColor: errors[field] ? 'red' : undefined }}
            />
          </label>
          {errors[field] && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors[field]}</div>}
        </div>
      ))}
      <button type="submit" style={{ marginRight: '10px' }}>
        {editId ? 'Update' : 'Add'}
      </button>
      {editId && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddressForm;
