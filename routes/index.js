const router = require("express").Router();
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

const { login, createUser } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { NOT_FOUND } = require("../utils/errors");
const { getItems } = require("../controllers/clothingItems");

router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

module.exports = router;
