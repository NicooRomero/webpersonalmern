const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/authenticated');
const multipart = require('connect-multiparty');

const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/get-users', [auth.ensureAuth], userController.getUsers);
router.get('/user-active', [auth.ensureAuth], userController.getUsersActive);
router.put('/upload-avatar/:id', [auth.ensureAuth, md_upload_avatar], userController.uploadAvatar);
router.get('/avatar/:avatarName', userController.getAvatar);
router.put('/update-user/:id', [auth.ensureAuth], userController.updateUser);
router.put('/activate/:id', [auth.ensureAuth], userController.activeUser);
router.delete('/delete/:id', [auth.ensureAuth], userController.deleteUser);
router.post('/signup-admin', [auth.ensureAuth], userController.signUpAdmin);
router.get('/total-users', [auth.ensureAuth], userController.totalUsers);

module.exports = router;