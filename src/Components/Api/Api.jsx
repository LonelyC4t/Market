class Api {
    constructor (groupId){
        this.url = `https://api.react-learning.ru`;
        this.groupId = groupId;
    };

    registration(values, groupId) {
        return fetch(`${this.url}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(values, groupId)
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
        return fetch(`${this.url}/v2/${this.groupId}/users/me`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            }
        })
    };
};
const api = new Api("9-gr");
export {api};