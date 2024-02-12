import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="text-center mb-auto p-4">
        &copy; {year} All right reserved. Developed by
        <Link to="https://github.com/gopaladhikari" className="hover:underline">
          gopaladhikari
        </Link>
      </p>
    </footer>
  );
}
