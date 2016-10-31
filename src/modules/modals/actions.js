import * as types from './types';
import * as schema from 'schema/modals';
import {normalize} from 'normalizr';

let nId = 0;
export const showModal = (component, props = {}) => {
  return (dispatch, getState) => {
    const modalId = nId;
    const modalProps = Object.assign({}, {
      size: 'small',
      style: 'standard',
      isOpen: true,
      onClose: () => dispatch(closeModal(modalId))
    }, props);
    const modal = {
      id: modalId,
      component,
      props: {
        ...modalProps
      }
    };
    const normalized = normalize(modal, schema.modal);
    dispatch({
      type: types.SHOW_MODAL,
      byId: normalized.entities.modals,
      modalId: normalized.result
    });
    nId++;
  };
};

export const closeModal = (modalId) => ({
  type: types.CLOSE_MODAL,
  modalId
});

