export const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_TYPEDB_VERSION":
            return {
                ...state,
                typeDBVersion: action.data
            };
        default:
            return state;
    }
}
