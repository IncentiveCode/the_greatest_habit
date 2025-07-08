import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";
import { useEffect, useState } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/components/navigation";
import { Settings } from "luxon";
import { makeSSRClient } from "./supa-client";
import { cn } from "./lib/utils";
import { getUserById } from "./features/users/queries";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  // locale, timezone setting
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";

  useEffect(() => {
    // 시스템 다크 모드 설정 확인
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');

    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 페이지 전환 시에도 테마 유지
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme, location]);

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { client } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, { id: user?.id });
    return { user, profile };
  }

  return { user: null, profile: null };
};


export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSignIn = loaderData.user !== null;

  return (
    <div className={cn({
        "py-28 px-5 md:px-20": !pathname.includes("/auth/") && pathname !== "/",
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      {pathname.includes("/auth/") ? null : (
        <Navigation 
          isSignIn={isSignIn} 
          email={loaderData.profile?.email}
          avatar={loaderData.profile?.avatar}
          username={loaderData.profile?.username}
          // onSignInChange={setSignIn} 
          hasNotification={false}
        />
      )}
      <Outlet />
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
