import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/api/webhook"],
  // Routes that can always be accessed, and have
  // no authentication information
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/booking", req.url));
  }
    
    if (!auth.userId && !auth.isPublicRoute ) {
        return redirectToSignIn({returnBackUrl: req.url});
    }

    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
}
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};