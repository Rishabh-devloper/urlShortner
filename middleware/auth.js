const { getUser  } = require('../service/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
        console.log('User UID from cookie:', userUid); // Debugging line

        if (!userUid) {
            console.log('No user UID found, redirecting to login.');
            return res.redirect("/login");
        }

        const user = await getUser(userUid);
        console.log('Retrieved user:', user); // Debugging line

        if (!user) {
            console.log('User not found, redirecting to login.');
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in restrictToLoggedInUserOnly:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    restrictToLoggedInUserOnly
};