/**
 * Client only - subscribe to published collections.
 * 
 */
export default {
    apply: () => {
        Meteor.subscribe('accounts');
    }
}