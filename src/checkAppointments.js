const puppeteer = require("puppeteer");
const {sendNotification} = require("./notifications");

async function checkAppointment() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const urlPageA = 'https://service.berlin.de/dienstleistung/351180/';
        await page.goto(urlPageA, { waitUntil: 'networkidle2' });

        const urlPageB = 'https://service.berlin.de/terminvereinbarung/termin/all/351180/';
        const responsePageB = await page.goto(urlPageB, { waitUntil: 'networkidle2' });
        const contentPageB = await page.content();

        if (responsePageB.status() === 403) {
            console.log('❌ Forbidden access (Suspicious network, malware scanning, intrusion attempt, ...).');
        } else if (contentPageB.includes('Leider sind aktuell keine Termine für ihre Auswahl verfügbar.')) {
            console.log('❌ No appointment available.');
        } else {
            await sendNotification();
        }
    } catch (err) {
        console.error('Error checking the page:', err);
    } finally {
        await browser.close();
    }
}

module.exports = {checkAppointment};
