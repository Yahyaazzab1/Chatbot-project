import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  trend?: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgGradient, trend }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${bgGradient} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      {/* Effet de brillance animé */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
            <Icon className={`w-6 h-6 ${color}`} strokeWidth={2.5} />
          </div>
          {trend && (
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color} drop-shadow-lg`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
