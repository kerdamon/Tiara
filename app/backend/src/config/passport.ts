import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "@/models/user.js";
import { publicRsaKey } from "@/utils.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicRsaKey,
  // algorithms: ["RS256"],
};

export function configurePassport() {
  const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  });
  passport.use(jwtStrategy);
}
