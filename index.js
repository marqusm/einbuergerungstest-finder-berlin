require('dotenv').config();
const {checkAppointment} = require("./src/checkAppointments");

// Run every INTERVAL minutes
setInterval(checkAppointment, process.env.CHECKING_INTERVAL * 60 * 1000); // INTERVAL minutes
checkAppointment().finally(); // Run once immediately
