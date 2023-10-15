import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  //? Prevents uploading problems with Uploadthing
  publicRoutes: ["/api/uploadthing"],
  //?
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
