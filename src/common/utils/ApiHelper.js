import Config from "./Config";

const CallApi = async (endpoint, headers, callback) => {
    let response = await fetch(endpoint, headers);
    let jsonResponse = await response.json();
    console.log(response.ok);
    console.log(jsonResponse);
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
    let headers = {
        method: httpMethod,
        accept: "application/json"
    };
    if (accessToken !== null || accessToken !== "") {
        headers['access-token'] = accessToken;
    }
    if (content !== null) {
        headers['body'] = JSON.stringify(content);
    }
}

export {GetEndpointURI, GetHttpHeaders, CallApi};