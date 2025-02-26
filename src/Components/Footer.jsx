const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">CrowdFund &copy; {new Date().getFullYear()}</p>
          <p className="text-sm text-gray-400">Empowering ideas, one campaign at a time.</p>
          <div className="flex justify-center gap-6 mt-3">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="/campaigns" className="hover:text-gray-300">Campaigns</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  