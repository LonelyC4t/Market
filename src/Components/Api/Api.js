class Api {
    constructor (group){
        this.url = `https://api.react-learning.ru`;
        this.group = group;
    };

    registration(values) {
        values.group = this.group;
        return fetch(`${this.url}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(values)
        
        })
    };

    authorization (values){
        
        return fetch (`${this.url}/signin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(values)
        })
    };

    getProducts(token){
        return fetch (`${this.url}/products`,{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            }

        })
    };

    getUser(token){
        return fetch(`${this.url}/v2/${this.group}/users/me`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            }
        })
    };
    getSearchProduct(query, token){

        return fetch(`https://api.react-learning.ru/products/search?query=${query}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            }
        })
    }
};
const api = new Api("9-gr");

export {api};