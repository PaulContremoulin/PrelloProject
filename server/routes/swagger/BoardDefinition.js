
/**
 * @typedef NewBoard
 * @property {string} name.required - the board's name
 * @property {string} idOrganization - the board's organization (team)
 * @property {string} desc - the board's description
 * @property {Array.<Membership>}  memberships - the board's members
 * @property {Prefs.model}  prefs - the board's preferences
 */

/**
 * @typedef Board
 * @property {string} _id - the board's id
 * @property {string} name.required - the board's name
 * @property {string} idOrganization - the board's organization
 * @property {string} desc - the board's description
 * @property {boolean} closed - the board's close status
 * @property {Array.<Membership>}  memberships - the board's members
 * @property {Prefs.model}  prefs - the board's preferences
 * @property {LabelNames.model}  labelNames - the board's labels
 */

/**
 * @typedef LabelNames
 * @property {string} colorname.required - the board's background color like #123456
 */

/**
 * @typedef Prefs
 * @property {string} background.required - the board's background color like #123456
 */

/**
 * @typedef Membership
 * @property {string} idMember.required - the member id
 * @property {string} memberType - the member type
 * @property {string} unconfirmed - the member confirmation (join board)
 */

/**
 * @typedef MembershipDetail
 * @property {Member.model} idMember.required - the member id
 * @property {string} memberType - the member type
 * @property {string} unconfirmed - the member confirmation (join board)
 */
