const getSearchParams = () => {
    const serchingValue = window.location.search;
    if (!serchingValue) return "";

    const params = new Proxy(new URLSearchParams(serchingValue), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    return params.search
};

export const getInitialState = () => {
    const lcStore = localStorage.getItem("reduxState");
    if (lcStore) {
        return JSON.parse(lcStore)
    }
    return {
        user: initialState.user,
        cart: initialState.cart,
        filter: initialState.filter,
        favorite: initialState.favorite
    } 
};

export const initialState = {
    filter: {
        search: getSearchParams(),
        sorting: "",

    },

    user: {
        token: "",
        name: "",
        about: "",
        avatar: "",
        _id: "",
        email: "",
        group: "",
        __v: 0
    },

    cart: [],
    
    favorite: []

};

