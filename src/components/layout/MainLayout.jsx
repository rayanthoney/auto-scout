import { Link, Outlet } from 'react-router-dom';
import { Search, GitCompare } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img src={logo} alt="AutoScout Logo" className="w-8 h-8 object-contain" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                            AutoScout
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            to="/search"
                            className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </Link>
                        <Link
                            to="/compare"
                            className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                        >
                            <GitCompare size={18} />
                            <span>Compare</span>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-neutral-200 mt-auto">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-neutral-600 text-sm">
                            © {new Date().getFullYear()} AutoScout. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a
                                href="#"
                                className="text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
