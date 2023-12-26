import * as z from "zod";

const userProfileValidations = z.object({
  gender: z.string().optional(),
  dateOfBirth: z.date().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.number().optional(),
  aboutMe: z.string().optional(),
  contactNumber: z.number().optional(),
});

export default userProfileValidations;
