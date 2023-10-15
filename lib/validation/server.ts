import * as z from "zod";

export const initialServerForm = z.object({
  name: z.string().min(1, "You should assign a name to your server."),
  imageUrl: z.string().min(1, "Your server" + " needs an image to stand out."),
});