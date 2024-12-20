import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./lib/session"

const protectedRoutesExact = ["/"]
const protectedRoutesStartingWith = ["/games"]
const publicRoutes = ["/auth/login", "/auth/signup"]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute =
    protectedRoutesExact.includes(path) ||
    protectedRoutesStartingWith.some((route) => path.startsWith(route))

  const isPublicRoute = publicRoutes.includes(path)

  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
}
