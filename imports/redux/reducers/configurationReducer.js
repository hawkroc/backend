import * as actions from '../actions/configurationActions'

const getDefaultLabelState = () =>{
    return {
        name: "New label",
        gst: false
    }
}

const initialState = {
    
    /**
     * Collection of available transaction labels.
     * 
     */
    labels: [
        {
            name: "Rental income",
            gst: false
        },
        {
            name: "Computer expenses",
            gst: true
        }
    ]
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {

        default:
            return state;
    }
};

export default reducer