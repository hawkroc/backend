import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

/**
 * User profile information sub document.
 * 
 */
const InfoSchema = new SimpleSchema({
    _id: { type: String },
    username: { type: String } 
})

export default InfoSchema