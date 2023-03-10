import React from 'react'

export default function Email() {

    const ABCD = () => {
        const config = {
            // Username: 'jp212212212@gmail.com',
            // Password: '303EA312545ED65B49A089CCFF69F2D4320C',
            // Host: 'smtp.elasticemail.com',
            // Port: 2525,
            SecureToken: '25892221-9e02-4fe1-8b6d-a26b695c878f',
            To: 'hpjob212212@gmail.com',
            From: "jp212212212@gmail.com",
            Subject: "This is the subject 1",
            Body: "From jp212212212@gmail.com to hpjob212212@gmail.com"
        }
        if (window.Email) {
            window.Email.send(config).then(() => alert("EmailSent."));
        }

    }
    return (
        <>
            <button onClick={ABCD}>ABCD</button>
        </>
    )
}
