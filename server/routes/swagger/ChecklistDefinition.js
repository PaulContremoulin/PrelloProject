/**
 * @typedef Checklist
 * @property {string} name.required - the checklist's name
 * @property {number} pos.required - the checklist's pos
 * @property {string} idCard - the checklist's card attached
 * @property {string} idBoard - the checklist's board attached
 * @property {Array.<CheckItem>} checkItems - the list of checkItems to do
 */

/**
 * @typedef CheckItem
 * @property {string} name.required - the CheckItem's name
 * @property {number} pos.required - the CheckItem's pos in the checklist
 * @property {string} idChecklist - the checkItem's checklist attached
 * @property {string} state - the state of the checkItem ['incomplete' or 'completed']
 */