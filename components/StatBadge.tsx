interface StatBadgeProps {
  icon: string;
  label: string;
  value: string;
}

export default function StatBadge({ icon, label, value }: StatBadgeProps) {
  return (
    <div className="card px-4 py-3 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-muted text-xs font-body uppercase tracking-wide">{label}</p>
        <p className="text-primary font-body font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}
