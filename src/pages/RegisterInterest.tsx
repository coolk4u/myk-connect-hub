import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { tilingCategories } from '@/data/mockData';
import { ArrowLeft, Send } from 'lucide-react';

export default function RegisterInterest() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    timeline: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Interest Registered Successfully!",
      description: "Your tiling project interest has been submitted. Our team will review and provide a quote within 2-3 business days.",
    });

    setIsSubmitting(false);
    navigate('/projects');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Register Interest</h1>
          <p className="text-muted-foreground mt-1">Tell us about your tiling project requirements</p>
        </div>
      </div>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bathroom Renovation, Kitchen Backsplash"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tiling category" />
                  </SelectTrigger>
                  <SelectContent>
                    {tilingCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your tiling project in detail, including room dimensions, preferred materials, and any specific requirements..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Project Location</Label>
                <Input
                  id="location"
                  placeholder="City, State or Full Address"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., Within 2 months, ASAP"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget Range</Label>
              <Input
                id="budget"
                placeholder="e.g., ₹5,000 - ₹10,000"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gradient"
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Register Interest
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-lg">1</div>
            <div>
              <h4 className="font-semibold text-foreground">Initial Assessment</h4>
              <p className="text-sm text-muted-foreground">Our experts will review your project and schedule a site visit</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-lg">2</div>
            <div>
              <h4 className="font-semibold text-foreground">Detailed Quote</h4>
              <p className="text-sm text-muted-foreground">Receive a comprehensive quote with materials and timeline</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-lg">3</div>
            <div>
              <h4 className="font-semibold text-foreground">Project Execution</h4>
              <p className="text-sm text-muted-foreground">Track progress and make milestone-based payments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}