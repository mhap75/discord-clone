import { ChannelType } from "@prisma/client";
import * as z from "zod";

export const initialServerForm = z.object({
  name: z.string().min(1, "You should assign a name to your server."),
  imageUrl: z.string().min(1, "Your server" + " needs an image to stand out."),
});

export const initialChannelForm = z.object({
  name: z
    .string()
    .min(1, "You should assign a name to your channel.")
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'General'",
    }),
  type: z.nativeEnum(ChannelType),
});
