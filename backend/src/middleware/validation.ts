import { ZodSchema, z } from 'zod';

type SchemaFactory = (z: typeof import('zod')) => ZodSchema<any>;

export const validateRequest = (schemaOrFactory: ZodSchema<any> | SchemaFactory) => {
  // @ts-ignore
  const schema = typeof schemaOrFactory === 'function' ? schemaOrFactory(z) : schemaOrFactory;

  return (req: any, _res: any, next: any) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const err = new Error('Validation Error') as any;
      err.statusCode = 400;
      err.issues = parsed.error.issues;
      return next(err);
    }
    req.body = parsed.data;
    next();
  };
};