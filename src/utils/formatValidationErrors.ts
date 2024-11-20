import { ZodError } from "zod";

export const formatValidationErrors = (err: ZodError): string[] => {
  return err.issues.map(issue => `"The field(s) '${issue.path.join(',')}'" ${issue.message}`);
};
