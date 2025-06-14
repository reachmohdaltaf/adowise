    import { google } from 'googleapis';
    import path from 'path';
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];

    async function getAuthClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../../service-account.json'),
        scopes: SCOPES,
    });
    return auth;
    }

    export async function createGoogleMeetEvent(userId, startTime, endTime, title) {
    try {
        const auth = await getAuthClient();
        const calendar = google.calendar({ version: 'v3', auth });

        const event = {
        summary: title || 'Scheduled Meeting',
        start: {
            dateTime: startTime,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: endTime,
            timeZone: 'Asia/Kolkata',
        },
        conferenceData: {
            createRequest: {
            requestId: `meet-${Date.now()}-${userId}`,
            conferenceSolutionKey: {
                type: 'hangoutsMeet'
            }
            }
        },
        attendees: [
            { email: `${userId}@yourdomain.com` } // Replace with actual user email
        ]
        };

        const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        });

        return {
        meetLink: response.data.hangoutLink,
        eventId: response.data.id
        };
    } catch (error) {
        console.error('Error creating Google Meet:', error);
        throw error;
    }
    }