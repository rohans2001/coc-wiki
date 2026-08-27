import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Shield, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="py-24 text-center space-y-6 max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-stone-900 border border-stone-700 text-amber-400 shadow-2xl">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black font-display text-stone-100">404 - Page Not Found</h1>
        <p className="text-sm text-stone-400 leading-relaxed">
          Looks like this village has been cleared or the route has been moved. Explore our main directories below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/troops"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Browse Troops</span>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
