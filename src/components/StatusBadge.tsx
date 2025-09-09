import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'pending' | 'quoted' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary' as const, label: 'Pending Review' };
      case 'quoted':
        return { variant: 'outline' as const, label: 'Quote Ready' };
      case 'approved':
        return { variant: 'default' as const, label: 'Approved', className: 'bg-success text-success-foreground' };
      case 'in-progress':
        return { variant: 'default' as const, label: 'In Progress', className: 'bg-warning text-warning-foreground' };
      case 'completed':
        return { variant: 'default' as const, label: 'Completed', className: 'bg-success text-success-foreground' };
      case 'rejected':
        return { variant: 'destructive' as const, label: 'Rejected' };
      default:
        return { variant: 'secondary' as const, label: status };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${className}`}
    >
      {config.label}
    </Badge>
  );
};