import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import { mockInterests } from '@/data/mockData';
import { 
  Plus,
  Calendar,
  DollarSign,
  Eye,
  Filter
} from 'lucide-react';

export default function Projects() {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Projects</h1>
          <p className="text-muted-foreground">Manage all your tiling project interests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Link to="/register">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Interest
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {mockInterests.map((interest) => (
          <Card key={interest.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{interest.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{interest.category}</Badge>
                    <StatusBadge status={interest.status} />
                  </div>
                </div>
                <Link to={`/projects/${interest.id}`}>
                  <Button size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{interest.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {formatDate(interest.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {interest.totalAmount > 0 
                      ? `${interest.totalPaid.toLocaleString()} / $${interest.totalAmount.toLocaleString()}`
                      : 'Quote pending'
                    }
                  </span>
                </div>
              </div>

              {interest.totalAmount > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Payment Progress</span>
                    <span>{Math.round((interest.totalPaid / interest.totalAmount) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(interest.totalPaid / interest.totalAmount) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              {!interest.assessmentPaid && interest.status !== 'pending' && (
                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="text-sm">
                    <p className="font-medium text-warning-foreground">Assessment Payment Required</p>
                    <p className="text-warning-foreground/80">Complete initial assessment payment to proceed</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Pay Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {mockInterests.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Projects Yet</h3>
              <p className="text-muted-foreground">
                Start by registering your interest in a tiling project
              </p>
            </div>
            <Link to="/register">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Register Your First Interest
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}