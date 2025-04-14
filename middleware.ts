import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard", // Match exact /dashboard route
  "/dashboard/(.*)", // Match all routes under /dashboard/
  "/workspace",
  "/workspace/(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware running for:", req.url);
  if (isProtectedRoute(req)) {
    console.log("Protected route detected:", req.url);
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
