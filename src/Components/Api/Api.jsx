class Api {
    constructor (groupId){
        this.url = `https://api.react-learning.ru`;
        this.groupId = groupId;
    };

    registration() {
        return
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
        return fetch (`${this.url}/products`),{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + token,
            }

        }
    }
};
const api = new Api("9-gr");
export {api};