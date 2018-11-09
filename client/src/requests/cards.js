import { putRequest, getRequest } from './genericRequest';


  export function changeCardName(cardId, cardName) {
      return putRequest('/api/cards/' + cardId + '/?name=' + cardName)
  }

  export function changeCardDesc(cardId, cardDesc) {
      return putRequest('/api/cards/' + cardId + '/?desc=' + cardDesc)
  }

  export function changeCardDueDate(cardId, cardDueDate) {
      return putRequest('/api/cards/' + cardId + '/?due=' + cardDueDate)
  }

  export function changeCardClosed(cardId, cardClosed) {
      return putRequest('/api/cards/' + cardId + '/?closed=' + cardClosed)
  }
