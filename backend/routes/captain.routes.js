const exprerss= require("express");
const router=exprerss.Router();
const CaptainController=require("../controllers/captain.controller");
const authMiddleware=require("../middlerwares/auth.middleware")




router.post('/register',CaptainController.RegisterCaptain);
router.post('/login',CaptainController.LoginCaptain);
router.get('/profile',authMiddleware.authCaptain,CaptainController.getCaptainProfile);
router.get('/logout',authMiddleware.authCaptain,CaptainController.Logoutcaptain);





module.exports = router;

