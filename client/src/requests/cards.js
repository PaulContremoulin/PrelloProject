import { putRequest, getRequest } from './genericRequest';


  export function changeCard(cardId, params) {
      return putRequest('/api/cards/' + cardId , {
        ...params
      })
  }
