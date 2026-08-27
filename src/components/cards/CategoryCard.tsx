import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryMeta } from '../../types/search';
import { Users, Crown, Shield, Sparkles, Hammer, Footprints, Truck, Coins, BookOpen, ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryMeta;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return <Users className="w-6 h-6 text-amber-400" />;
      case 'Crown': return <Crown className="w-6 h-6 text-purple-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-pink-400" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-emerald-400" />;
      case 'Footprints': return <Footprints className="w-6 h-6 text-teal-400" />;
      case 'Truck': return <Truck className="w-6 h-6 text-orange-400" />;
      case 'Coins': return <Coins className="w-6 h-6 text-yellow-400" />;
      default: return <BookOpen className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <Link
      to={category.path}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#141926] to-[#0A0D14] p-5 transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
    >
      {/* Glow highlight */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-700/60 group-hover:border-amber-500/40 transition-colors">
              {getIcon(category.iconName)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700/60 text-stone-300">
                {category.itemCount} Items
              </span>
              <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <h3 className="mt-4 text-lg font-bold font-display text-stone-100 group-hover:text-amber-300 transition-colors">
            {category.pluralName}
          </h3>
          <p className="mt-1 text-xs text-stone-400 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
          <span>Explore directory</span>
          <span className="text-amber-400/80 group-hover:text-amber-300 font-medium">Browse &rarr;</span>
        </div>
      </div>
    </Link>
  );
};
