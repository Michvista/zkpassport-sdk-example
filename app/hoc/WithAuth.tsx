import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(Component: any) {
  return function Protected(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/auth"); // redirect only AFTER loading
      }
    }, [loading, user, router]);

    if (loading) return <p>Loading...</p>;

    return <Component {...props} />;
  };
}
