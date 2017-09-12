import SimpleSchema  from 'simpl-schema'

/**
 * User profile information sub document.
 * 
 */
const InfoSchema = new SimpleSchema({
	_id: { type: String },
	username: { type: String }
})

export default InfoSchema
