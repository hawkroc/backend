import SimpleSchema  from 'simpl-schema'

const MetadataSchema = new SimpleSchema({
    version: {
        type: String,
        optional: false
    },
    enabled: {
        type: Boolean,
        optional: false
    },
    dependencies: {
        type: Array,
        optional: false
    }
})

const schema = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    
    metadata: {
        type: MetadataSchema
    }
})

export default schema