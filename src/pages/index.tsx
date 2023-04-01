import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    const redirectId = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => {
      clearTimeout(redirectId);
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center align-middle mt-32">
      <Image
        src={`/ball.png`}
        alt="loading"
        width={100}
        height={100}
        className="animate-bounce"
        priority
      ></Image>
    </div>
  );
}
