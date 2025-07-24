import { z } from 'zod';

// registerSchema
export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required!',
      invalid_type_error: 'Name must be a string!',
    })
    .trim()
    .nonempty({ message: 'Name is Required!' })
    .min(3, 'Name must be between 3 and 30 characters!')
    .max(30, 'Name must be between 3 and 30 characters!'),

  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string!',
    })
    .email('Invalid email address!')
    .trim()
    .nonempty({ message: 'Email is Required!' }),

  password: z
    .string({
      required_error: 'Password is required!',
      invalid_type_error: 'Password must be a string!',
    })
    .trim()
    .nonempty({ message: 'Password is Required!' })
    .min(8, 'Password must be between 8 and 30 characters!')
    .max(20, 'Password must be between 8 and 30 characters!'),
});

// loginSchema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string!',
    })
    .email('Invalid email address!')
    .trim()
    .nonempty({ message: 'Email is Required!' }),

  password: z
    .string({
      required_error: 'Password is required!',
      invalid_type_error: 'Password must be a string!',
    })
    .trim()
    .nonempty({ message: 'Password is Required!' })
    .min(8, 'Password must be between 8 and 30 characters!')
    .max(20, 'Password must be between 8 and 30 characters!'),
});

// createAnArticleSchema
export const createAnArticleSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required!',
      invalid_type_error: 'Title must be string!',
    })
    .trim()
    .nonempty({ message: 'Title is Required!' })
    .min(10, { message: 'Title must have minimum 10 characters!' })
    .max(100, { message: "Title can't exceed 100 characters!" }),

  body: z
    .string({
      required_error: 'Body is required!',
      invalid_type_error: 'Body must be string!',
    })
    .trim()
    .nonempty({ message: 'Body is Required!' })
    .min(100, { message: 'Body must have minimum 100 characters!' }),

  tags: z
    .string({
      required_error: 'Tags are required!',
      invalid_type_error: 'Tags must be string!',
    })
    .trim()
    .nonempty({ message: 'Tags are Required!' })
    .min(2, { message: 'Body must have minimum 2 characters!' }),
});
