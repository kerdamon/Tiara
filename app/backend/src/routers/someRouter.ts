import {
  doSomething,
  doSomethingPrivate,
} from "@/controllers/someController.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/test", doSomething);
router.get(
  "/test-private",
  passport.authenticate("jwt", { session: false }),
  doSomethingPrivate
);

export default router;
