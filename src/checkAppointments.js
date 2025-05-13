const axios = require('axios').default;
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const {sendNotification} = require("./notifications");
const {logWithTimestamp} = require("./utils");

async function checkAppointment() {
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));

    try {
        const urlPageA = 'https://service.berlin.de/dienstleistung/351180/';
        const urlPageB = 'https://service.berlin.de/terminvereinbarung/termin/all/351180/';

        await client.get(urlPageA);
        const responsePageB = await client.get(urlPageB);
        const contentPageB = responsePageB.data;

        if (responsePageB.status === 403) {
            logWithTimestamp('❌ Forbidden access (Suspicious network, malware scanning, intrusion attempt, ...).');
        } else if (contentPageB.includes('Leider sind aktuell keine Termine für ihre Auswahl verfügbar')) {
            logWithTimestamp('❌ No appointment available');
        } else if (contentPageB.includes('Die Terminverwaltung wird momentan gewartet')) {
            logWithTimestamp('️⚠️ Maintenance');
        } else {
            await sendNotification();
        }
    } catch (err) {
        console.error('Error checking the page:', err);
    }
}

module.exports = {checkAppointment};
