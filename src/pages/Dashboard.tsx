import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import { mockInterests } from '@/data/mockData';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const activeProjects = mockInterests.filter(interest => 
    ['quoted', 'approved', 'in-progress'].includes(interest.status)
  );
  
  const totalPaid = mockInterests.reduce((sum, interest) => sum + interest.totalPaid, 0);
  const totalAmount = mockInterests.reduce((sum, interest) => sum + interest.totalAmount, 0);
  
  const completedProjects = mockInterests.filter(interest => interest.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your tiling projects and payments</p>
        </div>
        <Link to="/register">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Register New Interest
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total project value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Projects</CardTitle>
            <Link to="/projects">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active projects</p>
              <Link to="/register">
                <Button className="mt-4">Register Your First Interest</Button>
              </Link>
            </div>
          ) : (
            activeProjects.map((interest) => (
              <div key={interest.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{interest.title}</h3>
                    <StatusBadge status={interest.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{interest.description}</p>
                  
                  {interest.totalAmount > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>${interest.totalPaid.toLocaleString()} / ${interest.totalAmount.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(interest.totalPaid / interest.totalAmount) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
                
                <Link to={`/projects/${interest.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}