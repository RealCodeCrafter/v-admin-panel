import React, { useState } from 'react';
import './gifts.scss';
import { useGetGiftsQuery } from '../../../context/api/giftsApi';
import { VscDebugRestart } from 'react-icons/vsc';

const Gifts = () => {
  const { data } = useGetGiftsQuery()
  console.log(data);

  const [giftAssignments, setGiftAssignments] = useState([
    { id: '', code: '', gift: '', usedBy: '',number: "", usedAt: '' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({ gift: '' });

  const availableGifts = [''];

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({ gift: assignment.gift });
    setShowModal(true);
  };

  const handleSubmit = () => {
    setGiftAssignments(
      giftAssignments.map(a => 
        a.id === editingAssignment.id ? { ...a, gift: formData.gift } : a
      )
    );
    setShowModal(false);
  };

  const filteredAssignments = giftAssignments.filter(a => 
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.usedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: giftAssignments.length,
    assigned: giftAssignments.filter(a => a.gift).length,
    unassigned: giftAssignments.filter(a => !a.gift).length
  };

  return (
    <div className="gifts">
      <div className="gifts__header">
        
        <div className="gifts__search-wrapper">
          <input
            type="text"
            className="gifts__search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="gifts__header-actions">

          <select className="gifts__select">
            <option>All data</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>
               
          <button className="gifts__icon-btn">
            <VscDebugRestart />
          </button>

        </div>
        
      </div>

      <div className="gifts__table-wrapper">
        <table className="gifts__table">

          <thead>
            <tr>
              <th style={{textAlign: "center"}}>INDEX</th>
              <th>VALUE</th>
              <th>NAME</th>
              <th>PHONE NUMBER</th>
              <th>GIFT</th>
              <th>USED AT</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map(assignment => (
              <tr key={assignment.id}>
                <td style={{textAlign: "center"}} className="gifts__index">{assignment.id}</td>
                <td className="gifts__code">{assignment.code}</td>
                <td className="gifts__code">{assignment.usedBy}</td>
                <td className="gifts__code">{assignment.number}</td>
                <td className="gifts__gift-name">
                  {assignment.gift || <span className="gifts__empty">-</span>}
                </td>
                <td className="gifts__date">{assignment.usedAt}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {showModal && (
        <div className="gifts__modal" onClick={() => setShowModal(false)}>
          <div className="gifts__modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="gifts__modal-title">Sovg'a belgilash</h2>

            <div className="gifts__modal-info">
              <div className="gifts__info-row">
                <span className="gifts__info-label">Stiker kodi:</span>
                <span className="gifts__info-value">{editingAssignment?.code}</span>
              </div>
              <div className="gifts__info-row">
                <span className="gifts__info-label">Foydalanuvchi:</span>
                <span className="gifts__info-value">{editingAssignment?.usedBy}</span>
              </div>
            </div>

            <div className="gifts__form">

              <div className="gifts__form-group">
                <label>Sovg'ani tanlang</label>
                <select 
                  value={formData.gift} 
                  onChange={(e) => setFormData({ gift: e.target.value })}
                >
                  <option value="">Sovg'a tanlanmagan</option>
                  {availableGifts.map(gift => (
                    <option key={gift} value={gift}>{gift}</option>
                  ))}
                </select>
              </div>

              <div className="gifts__form-actions">
                <button className="gifts__btn gifts__btn--save" onClick={handleSubmit}>
                  Saqlash
                </button>
                <button className="gifts__btn gifts__btn--cancel" onClick={() => setShowModal(false)}>
                  Bekor qilish
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gifts;