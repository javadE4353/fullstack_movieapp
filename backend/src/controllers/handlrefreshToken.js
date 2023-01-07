import db from "../model/index.js";
import chalk from "chalk";
import { createRequire } from "module";
import * as dotenv from "dotenv";
import { Console } from "console";
import { Op } from "sequelize";
import { responce } from "../util/configResponce.js";
dotenv.config();
const require = createRequire(import.meta.url);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
   return responce({
      res,
      code: 400,
      message: "The cookie is not set in the url",
    });
  }
  const refreshToken = cookies.jwt;
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const TokensRefresh = await db.Token.findOne({
    where: { name: refreshToken },
  });

  if (!TokensRefresh) {
    return responce({
      res,
      code: 403,
      message: "There is no token refresh",
    });
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser = await db.user.findOne({
    where: { id: TokensRefresh?.toJSON().userId },
  });

  if (foundUser === null) {
    jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          return;
        }

        const hackedUser = await db.user.findOne({
          username: decoded.username,
        });
      // const remove=  await db.Token.destroy({
      //     where: { userId: hackedUser.toJSON().id },
      //   });
      }
    );
    return responce({
      res,
      code: 403,
      message: "There are no users with this token",
    });
  }

  jwt.verify(
    refreshToken,
    process.env.SECRET_KEY_REFRESH_TOKEN,
    async (err, decoded) => {
      if (err) {
        console.log(err);
        return responce({
          res,
          code: 403,
          message: "The token has expired",
        });
      }
      if (err || foundUser.toJSON().username !== decoded.username) return res.sendStatus(403);
      const roles = await db.RoleHasUser.findOne({
        where: { userId: foundUser.toJSON().id },
      });
      if (!roles?.toJSON()?.roleId) {
        return;
      }

      const newRole = await db.Role.findOne({ where: { id: roles.roleId } });
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: decoded.username,
            role: newRole.toJSON().name,
          },
        },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: "30s" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.toJSON().username, id: decoded.id },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "1d" }
      );
      await db.Token.destroy({
        where: {
          [Op.and]: [{ name: refreshToken }, { userId: foundUser.toJSON().id }],
        },
      });
       try {
        await db.Token.create({
          userId: foundUser.toJSON().id,
          name: newRefreshToken,
        });
        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000
        });
        const userInfo = {
          role: newRole.toJSON().name,
          username: decoded.username,
          id: decoded.id,
        };
        responce({
          res,
          code: 200,
          message: "The token has been updated",
          data: { userInfo, accessToken },
        });
       } catch (error) {
        console.log(error)
       }
    //   res.cookie("jwt", newRefreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
    //     maxAge: 24 * 60 * 60 * 1000
    //   });
    // req.newRefreshTokenRequest=newRefreshToken;
    //   const userInfo = {
    //     role: newRole.toJSON().name,
    //     username: decoded.username,
    //     id: decoded.id,
    //   };
    //   responce({
    //     res,
    //     code: 200,
    //     message: "ok",
    //     data: { userInfo, accessToken },
    //   });
    }
  );
};

export default handleRefreshToken;
