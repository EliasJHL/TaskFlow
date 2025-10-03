/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** auth
*/

import fp from "fastify-plugin";
import fastifyAuth from "@fastify/auth";

export default fp(async function authPlugin(fastify, options) {
  fastify.decorate("verifyJWT", async function (request, reply, done) {
    try {
      await request.jwtVerify({ cookie: "session" });
      done();
    } catch (err) {
      done(new Error("Not authenticated", { cause: err }));
    }
  });
  await fastify.register(fastifyAuth);
});