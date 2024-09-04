const API_URL = (api) => `/api/${api}`;

const headers = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    }
};

export const getAllRecords = async (api) => {
    return await fetch(API_URL(api), { headers: headers() })
        .then(response => response.json());
};

export const getRecordById = async (api, id) => {
    return await fetch(`${API_URL(api)}/${id}`, { headers: headers() })
        .then(response => response.json());
};

export const addRecord = async (api, obj) => {
    return await fetch(API_URL(api), {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(obj),
    })
        .then(response => response.json());
};

export const updateRecord = async (api, id, product) => {
    return await fetch(`${API_URL(api)}/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(product),
    })
        .then(response => response.json());
};

export const deleteRecord = async (api, id) => {
    return await fetch(`${API_URL(api)}/${id}`, {
        method: 'DELETE',
        headers: headers(),
    }).then(response => response.json());
};
