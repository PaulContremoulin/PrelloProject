/**
* Thoses exported constants can be used across the whole application
* Changing a constant can imply a big loss of legacy compatibility
*/


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
* labelNames	LabelNames{...}
*/
export const DEFAULT_BOARD = {
  boardId: "default",
  boardName: "My first board name",
  color: "white",
  creator: "default",
  boardTeam: {},
  guests: [],
  lists: [
    {listId: 1, listName: "Prello", cards: [{cardId: 1, cardName: "AWI"}, {cardId: 2, cardName: "WI"}]},
    {listId: 2, listName: "Main", cards: [{cardId: 3, cardName: "AWI"}, {cardId: 4, cardName: "WI"}]},
    {listId: 3, listName: "Castle", cards: [{cardId: 5, cardName: "AWI"}, {cardId: 6, cardName: "WI"}]}
  ],
  tags: {},
};


// Default list schema
/*
* List
* name	string, the list’s name
* closed	boolean, if the board is closed
* pos	number, the list’s position in the board
* idBoard	string, the ID of the board the list is on
*/
export const DEFAULT_LIST = {
  name: "",
  closed: false,
  pos: 0,
  idBoard: "",
};
