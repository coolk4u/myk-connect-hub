import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/StatusBadge';
import { mockInterests } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  Calendar,
  CreditCard
} from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const project = mockInterests.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  const handleQuoteAction = (action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Quote Approved!" : "Quote Rejected",
      description: action === 'approve' 
        ? "Your project will proceed to the next phase."
        : "We'll work on revising the quote for you.",
    });
  };

  const handlePayment = (milestoneId: string, amount: number) => {
    toast({
      title: "Payment Successful!",
      description: `Payment of ₹${amount.toLocaleString()} has been processed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/projects')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quote Section */}
          {project.quote && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Quote</CardTitle>
                  <Badge variant={project.quote.status === 'approved' ? 'default' : 'outline'} className={
                    project.quote.status === 'approved' ? 'bg-success text-success-foreground' : ''
                  }>
                    {project.quote.status === 'pending' && 'Awaiting Approval'}
                    {project.quote.status === 'approved' && 'Approved'}
                    {project.quote.status === 'rejected' && 'Rejected'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">₹{project.quote.amount.toLocaleString()}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Valid Until:</strong> {new Date(project.quote.validUntil).toLocaleDateString()}</p>
                  <p><strong>Notes:</strong> {project.quote.notes}</p>
                </div>

                {project.quote.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => handleQuoteAction('approve')} 
                      className="flex-1 gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve Quote
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleQuoteAction('reject')}
                      className="flex-1 gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject Quote
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Materials */}
          {project.quote?.materials && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Materials & Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.quote.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{material.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {material.quantity} {material.unit} × ₹{material.unitPrice} = ₹{material.totalPrice.toLocaleString()}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {material.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹{material.totalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress & Milestones */}
          {project.progress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.progress.map((milestone, index) => (
                  <div key={milestone.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          milestone.status === 'completed' ? 'bg-success text-success-foreground' :
                          milestone.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : milestone.status === 'in-progress' ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{milestone.milestone}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          {milestone.completedAt && (
                            <p className="text-xs text-muted-foreground">
                              Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="font-medium">₹{milestone.paymentDue.toLocaleString()}</div>
                        {milestone.paymentStatus === 'paid' ? (
                          <Badge className="bg-success text-success-foreground">Paid</Badge>
                        ) : milestone.status === 'completed' ? (
                          <Button 
                            size="sm" 
                            onClick={() => handlePayment(milestone.id, milestone.paymentDue)}
                            className="gap-1"
                          >
                            <CreditCard className="h-3 w-3" />
                            Pay Now
                          </Button>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                    </div>
                    {index < project.progress!.length - 1 && (
                      <div className="ml-4 h-6 w-px bg-border"></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Category:</span>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Created:</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Updated:</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <Separator />
              
              {project.totalAmount > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Payment Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Paid:</span>
                      <span className="font-medium">₹{project.totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Remaining:</span>
                      <span className="font-medium">₹{(project.totalAmount - project.totalPaid).toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(project.totalPaid / project.totalAmount) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {Math.round((project.totalPaid / project.totalAmount) * 100)}% Complete
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assessment Payment */}
          {!project.assessmentPaid && project.status !== 'pending' && (
            <Card>
              <CardHeader>
                <CardTitle>Assessment Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Complete the initial assessment payment to proceed with your project.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">₹300</div>
                  <Button className="w-full gap-2">
                    <CreditCard className="h-4 w-4" />
                    Pay Assessment Fee
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}