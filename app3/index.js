const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require("./ServiceAccountKey.json");
const cors = require('cors')
// Initialize Firebase Admin SDK
admin.initializeApp({
    apiKey: "AIzaSyB32u1-H2a2S8aujjoFV_T7IGQzWVRaJ7M",
    authDomain: "localhost:4000",
    projectId: "personal-productivity-hub",
    storageBucket: "personal-productivity-hub.firebasestorage.ap",
    messagingSenderId: "944388494371",
    appId: "1:944388494371:web:7a94b93b8b1be29a808d96",
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/generateToken', async (req, res) => {
    try {
        const { uidToken } = req.body;

        // Call Firebase Admin to generate custom token
        const customToken = await admin.auth().createCustomToken(uidToken);

        console.log('sent cookie', customToken);
        res.json({ customToken });
    } catch (error) {
        console.error('Error generating custom token:', error);
        res.status(500).json({ error: 'Failed to generate custom token' });
    }
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});