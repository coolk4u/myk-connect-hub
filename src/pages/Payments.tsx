import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockInterests } from '@/data/mockData';
import { 
  DollarSign,
  Calendar,
  CreditCard,
  Download,
  TrendingUp
} from 'lucide-react';

export default function Payments() {
  // Generate payment history from mock data
  const paymentHistory = mockInterests.flatMap(interest => {
    const payments = [];
    
    // Assessment payment
    if (interest.assessmentPaid) {
      payments.push({
        id: `assess-${interest.id}`,
        projectId: interest.id,
        projectTitle: interest.title,
        type: 'Assessment',
        amount: 300,
        date: interest.createdAt,
        status: 'completed'
      });
    }

    // Milestone payments
    if (interest.progress) {
      interest.progress
        .filter(p => p.paymentStatus === 'paid')
        .forEach(milestone => {
          payments.push({
            id: `milestone-${milestone.id}`,
            projectId: interest.id,
            projectTitle: interest.title,
            type: milestone.milestone,
            amount: milestone.paymentDue,
            date: milestone.completedAt || interest.updatedAt,
            status: 'completed'
          });
        });
    }

    return payments;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const totalProjects = mockInterests.filter(i => i.totalPaid > 0).length;
  const pendingPayments = mockInterests.flatMap(interest => 
    interest.progress?.filter(p => p.status === 'completed' && p.paymentStatus === 'pending') || []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground">Track your project payments and download receipts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              With payments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments.length}</div>
            <p className="text-xs text-muted-foreground">
              Milestones ready
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${paymentHistory
                .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
                .reduce((sum, p) => sum + p.amount, 0)
                .toLocaleString()
              }
            </div>
            <p className="text-xs text-muted-foreground">
              January payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments */}
      {pendingPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPayments.map((payment) => {
              const project = mockInterests.find(i => i.progress?.includes(payment));
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">{project?.title}</h4>
                    <p className="text-sm text-muted-foreground">{payment.milestone}</p>
                    <p className="text-xs text-muted-foreground">{payment.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">${payment.paymentDue.toLocaleString()}</div>
                      <Badge className="bg-warning text-warning-foreground">Due Now</Badge>
                    </div>
                    <Button className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payment history available</p>
              </div>
            ) : (
              paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                      <CreditCard className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">{payment.type}</h4>
                      <p className="text-sm text-muted-foreground">{payment.projectTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold">${payment.amount.toLocaleString()}</div>
                      <Badge className="bg-success text-success-foreground">Completed</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Receipt
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}