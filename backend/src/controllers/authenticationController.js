import AuthService from "../services/authenticationService.js";
import getAccessToken from "../utils/getAccessToken.js";

const register = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        const message = await AuthService.register(name, username, password, role);
        res.status(message.status).json({ message: message.message });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error to register user', error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.login(username, password);

        if (result.success) {
            // res.cookie('access_token', result.data, {
            //     httpOnly: false,
            //     secure: false,
            //     sameSite: 'Lax',
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            // });

            return res.status(200).json({token: result.data});
        } else {
            return res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login error', error: error.message });
    }
};

const logout = async (req, res, next) => {
    try {
        const access_token = getAccessToken(req);

        if(!access_token) {
            return res.status(403).json({ message: 'You are not logged in!' });
        }

        // res.clearCookie('access_token');

        const result = await AuthService.logout(access_token);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Logout error', error: error.message });
    }
};

const getUserInfos = async (req, res, next) => {
    try {
        const access_token = getAccessToken(req);

        const result = await AuthService.getUserInfos(access_token);

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(401).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error during getting user infos:', error);
        res.status(500).json({ message: 'Get user error', error: error.message });
    }
};

const isAuthenticated = async (req, res, next) => {
    try{
        return res.status(200).json({ message: 'User is authenticated' });
    } catch (error){
        console.error('Error during isAuthenticated:', error);
        res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
}

export default {
    register,
    login,
    logout,
    getUserInfos,
    isAuthenticated
}