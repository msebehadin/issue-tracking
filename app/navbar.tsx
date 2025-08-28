import { AiFillBug } from 'react-icons/ai';
import Link from 'next/link'


const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" }
  ];

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-md">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-yellow-400">
        <AiFillBug className="text-2xl" />
        
        IssueTracker
      </Link>
      <ul className="flex gap-6">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
