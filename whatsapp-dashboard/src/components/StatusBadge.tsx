interface Props {
  status: "pending" | "confirmed";
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: Props) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const statusConfig = {
    pending: {
      label: "En attente",
      className: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-md",
      dot: "bg-yellow-600",
    },
    confirmed: {
      label: "Confirmé",
      className: "bg-gradient-to-r from-green-400 to-green-500 text-green-900 shadow-md",
      dot: "bg-green-600",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`${sizeClasses[size]} ${config.className} rounded-full font-bold flex items-center gap-2 inline-flex`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
      {config.label}
    </span>
  );
}

