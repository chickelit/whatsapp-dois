import { Router } from "express";
import { SignInController } from "Src/controllers/authentication/sign-in.controller";
import { SignUpController } from "Src/controllers/authentication/sign-up.controller";
import { authenticationMiddleware } from "Src/middleware/authentication.middleware";

export const router = Router({ strict: true });

router.post("/sign-in", SignInController.store);
router.get("/sign-in", authenticationMiddleware, SignInController.show);

router.post("/sign-up", SignUpController.store);
