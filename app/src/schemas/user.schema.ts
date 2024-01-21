import z from 'zod';

export const userSchema = z.object({
    name: z.string().min(3, "minimum 3 letters").max(20, "maximum 20 letters"),
    email: z.string().email("Not a valide mail"),
    location: z.string().min(1, "Location required"),
    phoneNo: z.string().min(1, "Phone Number required"),
}).required({
    location: true,
});

export type TuserSchema = z.infer<typeof userSchema>;