import http from './Http'
import $ from 'jquery'

export const GetMainDataApi = () => {
    let xxx = []
    $.ajax({
        url: 'http://localhost:5000/MainDataApi',
        type: "GET",
        async: false,
        success: function (abc) { xxx = abc },
        error: function (err) { }
    })
    return xxx;
}
export const GetRoomList = () => {
    let xxx = []
    $.ajax({
        url: 'https://hp212212.github.io/Horel-Management-RoomList-Api/RoomList.json',
        type: "GET",
        async: false,
        success: function (abc) { xxx = abc },
        error: function (err) { }
    })
    return xxx;
}

export const PostMainDataApi = (Data, url) => {
    return http.post(url, Data).then((response) => {
        return Promise.resolve(response.data);
    }).catch((err) => {
        return err;
    })
}
export const PutMainDataApi = (Data, url, id) => {
    return http.put(`${url}/${id}`, Data).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}
export const PostReservation = (Data, url) => {
    return http.post(url, Data).then((response) => {
        return Promise.resolve(response.data);
    }).catch((err) => {
        return err;
    })
}
export const GetUsers = () => {
    let xxx = []
    $.ajax({
        url: 'http://localhost:5000/Users',
        type: "GET",
        async: false,
        success: function (abc) { xxx = abc },
        error: function (err) { }
    })
    return xxx;
}
export const GetAdmins = () => {
    let xxx = []
    $.ajax({
        url: 'https://hp212212.github.io/Horel-Management-RoomList-Api/AdminName.json',
        type: "GET",
        async: false,
        success: function (abc) { xxx = abc },
        error: function (err) { }
    })
    return xxx;
}
export const PostUsers = (Data, url) => {
    return http.post(url, Data).then((response) => {
        return response;
    }).catch((err) => {
        return err;
    })
}