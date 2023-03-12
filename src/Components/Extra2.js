import React from 'react'
import $ from 'jquery'

// export const GetAdminsApi = () => {
//     let xxx = []
//     $.ajax({
//         url: 'https://hp212212.github.io/Horel-Management-RoomList-Api/RoomList.json',
//         type: "GET",
//         async: false,
//         success: function (abc) { xxx = abc },
//         error: function (err) { }
//     })
//     return xxx;
// }

// export const GetAdminsApi = () => {

// fetch('https://hp212212.github.io/Horel-Management-RoomList-Api/RoomList.json')
// .then(response => response.json())
// .then(json => console.log(json))
// }

export default function Extra2() {
    // const GetAdminsApi = () => {

    //     fetch("https://hp212212.github.io/Horel-Management-RoomList-Api/RoomList.json")
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    // }
    const GetAdminsApi = () => {
        let xxx = []
        $.ajax({
            url: 'https://hp212212.github.io/Horel-Management-RoomList-Api/RoomList.json',
            type: "GET",
            async: false,
            success: function (abc) { xxx = abc },
            error: function (err) { }
        })
        return console.log(xxx);
    }
    return (
        <>
            Extra2
            <button type="button" onClick={GetAdminsApi}>button</button>
        </>
    )
}
