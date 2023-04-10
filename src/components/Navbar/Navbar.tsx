import Link from "next/link";

const Navbar = ({ }) => {
  return (
    <ul className="flex md:flex-col items-center justify-evenly p-4 bg-white shadow-2xl">
      <li>
        <Link href="/dashboard">Games</Link>
      </li>
      <li>
        <Link href="/standings">Standings</Link>
      </li>
      <li>
        <Link href="/players">Players</Link>
      </li>
      <li>
        <Link href="/teams">Teams</Link>
      </li>
      <li>
        <Link href="/live">Live</Link>
      </li>
    </ul>
  );
};

export default Navbar;
