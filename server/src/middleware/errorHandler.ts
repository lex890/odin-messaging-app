import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log the full error server-side (never send this to the client)
  console.error(err);

  // Some errors carry their own status, e.g. malformed JSON from express.json()
  const status =
    typeof err.status === "number" && err.status >= 400 && err.status < 600
      ? err.status
      : 500;

  // Don't leak internals on 500s
  const message =
    status === 500 ? "Something went wrong" : err.message;

  res.status(status).json({ message });
};