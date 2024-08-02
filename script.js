const discordID = "1267730107565477909";
const api = `https://api.lanyard.rest/v1/users/${discordID}`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data && data.data) {
                ///////////////////////////////////////////////////////////////////////////
                const display_name = data.data.discord_user.display_name;
                document.getElementById('display_name').innerText = display_name;
                console.log(display_name);
                ///////////////////////////////////////////////////////////////////////////
                const activities = data.data.activities;
                if (activities.length > 0) {
                    const activitie_status = activities[0].name;
                    if (activitie_status === "Spotify") {
                        document.getElementById('activitie_status').innerText = "Listening to Spotify";
                    } else if (activitie_status === "Code") {
                        document.getElementById('activitie_status').innerText = "Playing Code";
                    } else if (activitie_status === "Custom Status") {
                        const state = activities[0].state;
                        document.getElementById('activitie_status').innerText = "Playing " + state;
                    } else {
                        document.getElementById('activitie_status').innerText = "Doing something else";
                    }
                    console.log(activitie_status);
                } else {
                    document.getElementById('activitie_status').innerText = "Doing nothing";
                }
                ///////////////////////////////////////////////////////////////////////////
                const discord_status = data.data.discord_status;
                const circleElement = document.getElementById('circle');

                if (discord_status === "online") {
                    circleElement.style.backgroundImage = "url('./assets/status/online.png')";
                } else if (discord_status === "dnd") {
                    circleElement.style.backgroundImage = "url('./assets/status/dnd.png')";
                } else if (discord_status === "idle") {
                    circleElement.style.backgroundImage = "url('./assets/status/idle.png')";
                } else if (discord_status === "offline") {
                    circleElement.style.backgroundImage = "url('./assets/status/offline.png')";
                }

                circleElement.style.backgroundSize = "cover"; 

                console.log(discord_status);
                ///////////////////////////////////////////////////////////////////////////
            } else {
                throw new Error('Invalid response structure');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});
