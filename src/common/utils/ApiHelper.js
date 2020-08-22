import Config from "./Config";

const CallApi = async (endpoint, headers, callback) => {
    let response = await fetch(endpoint, headers);
    let jsonResponse = await response.json();
    if(response.ok){
        callback(true, jsonResponse);
    }
    else{
        callback(false, null);
    }
}

const GetEndpointURI = (name, param, value) => {
    let uri = Config.endpointPrefix + Config.endpoints.find(endpoint => endpoint.name === name).uri;
    if (param && value) {
        return "ERROR";
    } else {
        return uri;
    }
}

const GetHttpHeaders = (httpMethod, accessToken, content) => {
    let settings = {
        method: httpMethod,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: accessToken
        },
        body: content
    };
    if(!settings.headers.authorization)
        delete settings.headers.authorization;
    if(!settings.body)
        delete settings.body;
    return settings;
}

export {GetEndpointURI, GetHttpHeaders, CallApi};