const fs = require('fs');
const puppeteer = require('puppeteer');
const {sendNotification} = require("./notifications");
const {logWithTimestamp} = require("./utils");

async function checkAppointment() {
    const options = {
        headless: true,
        args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
    };
    // If there is a local Chromium installed, we'll be using that one.
    if (fs.existsSync('/usr/bin/chromium')) {
        options.executablePath = '/usr/bin/chromium'; // Your own lightweight Chromium
    }
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    try {
        const urlPageA = 'https://service.berlin.de/dienstleistung/351180/';
        await page.goto(urlPageA, {waitUntil: 'networkidle2'});

        const urlPageB = 'https://service.berlin.de/terminvereinbarung/termin/all/351180/';
        const responsePageB = await page.goto(urlPageB, {waitUntil: 'networkidle2'});
        const contentPageB = await page.content();

        if (responsePageB.status() === 403) {
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
    } finally {
        await browser.close();
    }
}

module.exports = {checkAppointment};
