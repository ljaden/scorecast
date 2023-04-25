import Link from "next/link";
import { useRouter } from "next/router";

const navRoutes: { name: string; path: string }[] = [
  { name: "Home", path: "/" },
  { name: "Standings", path: "/standings" },
  { name: "Teams", path: "/teams" },
  { name: "Players", path: "/players" },
];

const Navbar = ({ }) => {
  const router = useRouter();

  console.log(router.pathname);
  return (
    <nav>
      <ul className="flex md:flex-col items-center justify-evenly p-4 bg-white shadow-2xl">
        {navRoutes.map((singleRoute) => (
          <Link
            key={singleRoute.name}
            href={singleRoute.path}
            className={`${router.pathname === singleRoute.path ||
                router.pathname.startsWith(singleRoute.path + "/")
                ? "font-bold"
                : ""
              } py-2`}
          >
            {singleRoute.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
