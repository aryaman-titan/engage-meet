import dotenv from 'dotenv';
dotenv.config();

const twilio = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET
};

export default twilio;
