import { z, ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

type Schemas = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
};

const formatZodError = (error: ZodError) =>
  error.issues.map((i) => ({
    path: i.path.join("."),
    message: i.message,
  }));

export const validate =
  (schemas: Schemas) => (req: Request, res: Response, next: NextFunction) => {
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success)
        return res.status(400).json({ errors: formatZodError(result.error) });

      req.params = result.data;
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success)
        return res.status(400).json({ errors: formatZodError(result.error) });

      req.query = result.data;
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success)
        return res.status(400).json({ errors: formatZodError(result.error) });

      req.body = result.data;
    }

    next();
  };
