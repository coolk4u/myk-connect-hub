import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { AlertCircle, Shield, FileText, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockComplaints = [
  {
    id: 'CMP001',
    title: 'Tile alignment issue',
    description: 'Some tiles in the bathroom are not properly aligned',
    status: 'in-progress',
    createdAt: '2024-01-15',
    project: 'Bathroom Renovation'
  },
  {
    id: 'CMP002', 
    title: 'Grout color mismatch',
    description: 'The grout color does not match what was agreed upon',
    status: 'resolved',
    createdAt: '2024-01-10',
    project: 'Kitchen Backsplash'
  }
];

const mockWarranties = [
  {
    id: 'WAR001',
    project: 'Bathroom Renovation',
    startDate: '2024-01-01',
    endDate: '2026-01-01',
    status: 'active',
    coverage: 'Full material and workmanship warranty',
    terms: 'Covers defects in materials and workmanship for 2 years from completion date'
  },
  {
    id: 'WAR002',
    project: 'Kitchen Backsplash', 
    startDate: '2023-12-15',
    endDate: '2025-12-15',
    status: 'active',
    coverage: 'Material warranty',
    terms: 'Covers tile defects and installation issues for 2 years'
  }
];

export default function Complaints() {
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    description: '',
    project: '',
    priority: ''
  });
  const { toast } = useToast();

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been registered. We'll contact you within 24 hours.",
    });
    setComplaintForm({ title: '', description: '', project: '', priority: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWarrantyStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Complaints & Warranty</h1>
        <p className="text-muted-foreground mt-2">
          Raise concerns and access your project warranty information
        </p>
      </div>

      <Tabs defaultValue="complaints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="complaints" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Complaints
          </TabsTrigger>
          <TabsTrigger value="warranty" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Warranty
          </TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="space-y-6">
          {/* Raise New Complaint */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Raise a Complaint
              </CardTitle>
              <CardDescription>
                Report any issues with your completed projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Complaint Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={complaintForm.title}
                      onChange={(e) => setComplaintForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select
                      value={complaintForm.project}
                      onValueChange={(value) => setComplaintForm(prev => ({ ...prev, project: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                        <SelectItem value="kitchen">Kitchen Backsplash</SelectItem>
                        <SelectItem value="living">Living Room Flooring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={complaintForm.priority}
                    onValueChange={(value) => setComplaintForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Submit Complaint
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Complaints */}
          <Card>
            <CardHeader>
              <CardTitle>Your Complaints</CardTitle>
              <CardDescription>Track the status of your submitted complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{complaint.title}</h4>
                        <p className="text-sm text-muted-foreground">{complaint.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Project: {complaint.project} • ID: {complaint.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty" className="space-y-6">
          <div className="grid gap-6">
            {mockWarranties.map((warranty) => (
              <Card key={warranty.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {warranty.project}
                      </CardTitle>
                      <CardDescription>Warranty ID: {warranty.id}</CardDescription>
                    </div>
                    <Badge className={getWarrantyStatusColor(warranty.status)}>
                      {warranty.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Coverage Period</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(warranty.startDate).toLocaleDateString()} - {new Date(warranty.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Coverage Type</h4>
                      <p className="text-sm text-muted-foreground">{warranty.coverage}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Terms & Conditions</h4>
                    <p className="text-sm text-muted-foreground">{warranty.terms}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">
                      Valid until {new Date(warranty.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
