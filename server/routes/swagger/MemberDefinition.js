/**
 * @typedef Creadential
 * @property {string} username.required - the user's username
 * @property {string} password.required - the user's password
 */

/**
 * @typedef MemberNew
 * @property {string} username.required - the user's username
 * @property {string} password.required - the user's password
 * @property {string} email.required - the user's email
 * @property {string} firstName.required - the user's firstName
 * @property {string} lastName.required - the user's lastName
 * @property {string} organization.required - the user's organization
 */

/**
 * @typedef MemberNew
 * @property {string} username.required - the user's username
 * @property {string} password.required - the user's password
 * @property {string} email.required - the user's email
 * @property {string} firstName.required - the user's firstName
 * @property {string} lastName.required - the user's lastName
 * @property {string} organization.required - the user's organization
 */

/**
 * @typedef Member
 * @property {string} username.required - the user's username
 * @property {string} bio - the user's biography
 * @property {string} firstName.required - the user's firstName
 * @property {string} lastName.required - the user's lastName
 * @property {string} email.required - the user's email
 * @property {string} organization.required - the user's organization
 * @property {Array.<string>} idBoards - the user's boards
 * @property {Array.<string>} idOrganizations - the user's organizations (teams)
 * @property {boolean} confirmed - if the user has confirmed his email address
 */