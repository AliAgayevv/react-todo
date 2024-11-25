function Header() {
    return (
      <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 w-full py-8 shadow-lg">
        <h1 className="text-white text-center text-4xl md:text-6xl font-bold tracking-wide">
          React Todo List
        </h1>
        <p className="text-white text-center mt-2 text-lg md:text-xl font-light">
          Organize your tasks efficiently
        </p>
      </header>
    );
  }
  
  export default Header;