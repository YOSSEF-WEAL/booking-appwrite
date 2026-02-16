function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-zinc-400">
          &copy; {currentYear} Bookit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
