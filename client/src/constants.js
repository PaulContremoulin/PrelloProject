// Default user schema
/*
* Member
* username*	string, the user’s username
* bio	string, the user’s biography
* firstName*	string, the user’s firstName
* lastName*	string, the user’s lastName
* email*	string, the user’s email
* organization*	string, the user’s organization
* idBoards	[...]
* idLabels	[...]
* idOrganizations	[...]
* confirmed	boolean, if the user has confirmed his email address
*/
export const DEFAULT_USER = {
  username: "",
  bio: "",
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  idBoards: [],
  idLabels: [],
  idOrganizations: [],
  confirmed: false,
};

// Default board schema
/*
* Board
* _id	string, the board’s id
* name*	string, the board’s name
* idOrganization	string, the board’s organization
* desc	string, the board’s description
* closed	boolean, the board’s close status
* memberships	[...]
* prefs	Prefs{...}
*/
export const DEFAULT_BOARD = {
  _id: "default",
  name: " ",
  idOrganization: " ",
  prefs: {
    background: "#ffffff"
  },
  desc: " ",
  closed: false,
  memberships: [],
  lists: [],
};
/*
_id: "5be29595dadfa448f6c4b220"
closed: false​
desc: "for test"​
idOrganization: null​
labelNames: Object { green: "", yellow: "", orange: "", … }​
memberships: Array [ {…} ]
​name: "test"​
prefs: Object { background: "#000000" }
*/


// Default list schema
/*
* List
* name	string, the list’s name
* closed	boolean, if the board is closed
* pos	number, the list’s position in the board
* idBoard	string, the ID of the board the list is on
* cards	Array[Card], the cards contained in the list
*/
export const DEFAULT_LIST = {
  id: "default",
  name: "",
  closed: false,
  pos: 0,
  idBoard: "",
  cards: []
};

// Result Object schema for drag and drop
/*
*
*/
export const RESULT = {
    draggableId: 'task-1',
    type: 'TYPE',
    reason: 'DROP',
    source: {
        droppableId: 'column-1',
        index: 0,
    },
    destination: {
        droppableId: 'column-1',
        index: 1,
    },
}

// Default card schema
/*
* id string, The ID of the card
* closed boolean, Whether the card is closed (archived). Note: Archived lists and boards do not cascade archives to cards. A card can have closed: false but be on an archived board.
* desc string, The description for the card. Up to 16384 chars.
* due date, The due date on the card, if one exists
* dueComplete boolean, Whether the due date has been marked complete
* idBoard string, The ID of the board the card is on
* idChecklists array of strings, An array of checklist IDs that are on this card
* idLabels array of strings, An array of label IDs that are on this card
* idList string, The ID of the list the card is in
* idMembers array of strings, An array of member IDs that are on this card
* labels array of Labels, Array of label objects on this card
* name string, Name of the card
* pos float, Position of the card in the list
*/
export const DEFAULT_CARD = {
  id: "",
  closed: false,
  desc: "",
  due: "",
  dueComplete: false,
  name: "",
  pos: 0,
  idMembers: [],
  idLabels: [],
  idBoard: "",
  idList: "",
}

// Default label schema
/*
* id string, The ID of the label
* idBoard string, The ID of the board the label is in
* name string, Name of the label
* color string, color of the label
*/
export const DEFAULT_LABEL = {
  id: "",
  name: "",
  color: "",
  idBoard: "",
};
