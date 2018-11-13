
/**
 * @typedef Card
 * @property {string} name.required - the card's name
 * @property {string} desc - the card's description (team)
 * @property {number} position.required - the card's position (team)
 * @property {string} due - a due date for the card
 * @property {boolean} dueComplete - a due date check
 * @property {string} idList - The ID of the list the card should be created in
 * @property {string} idBoard - The ID of the board the card should be created in
 * @property {Array.<string>} idMembers - list of member IDs to add to the card
 * @property {Array.<string>} idLabels - list of labels IDs to add to the card
 */


/**
 * @typedef NewComment
 * @property {string} text.required - the comment's text
 */

/**
 * @typedef Comment
 * @property {string} id.required - the comment's id
 * @property {string} text.required - the comment's text
 * @property {string} idAuthor.required - the comment's author
 * @property {string} idCard.required - the card's id attach at the comment
 * @property {date} date.required - the date of the comment
 */