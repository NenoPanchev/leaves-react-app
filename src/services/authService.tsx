const baseUrl = 'http://localhost:8080';

export const login = async (email:string, password:string) => {
    let res = await fetch(`${baseUrl}/authenticate`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
};

export const register = (email:string, password:string) => {
    return fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json()); 
};

export const logout = (token:string) => {
    return fetch(`${baseUrl}/users/logout`, {
        headers: {
            'X-Authorization': token,
        }
    })
};

export const getUser = () => {
    let username = localStorage.getItem('username');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser())
};
