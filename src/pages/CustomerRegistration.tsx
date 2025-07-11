import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, MapPin, Phone, Mail, Save, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerData {
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  zone: string;
  meterType: string;
  connectionType: string;
}

const zones = [
  "Zone A - Thika Town",
  "Zone B - Kiganjo",
  "Zone C - Makongeni", 
  "Zone D - Kiandutu",
  "Zone E - Stadium"
];

const meterTypes = [
  "Domestic - Standard",
  "Domestic - Prepaid",
  "Commercial - Standard", 
  "Industrial - Standard"
];

const connectionTypes = [
  "New Connection",
  "Reconnection",
  "Meter Replacement",
  "Transfer of Ownership"
];

export default function CustomerRegistration() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    zone: "",
    meterType: "",
    connectionType: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const customerId = `C${Date.now().toString().slice(-6)}`;
      setNewCustomerId(customerId);
      setShowSuccessDialog(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        idNumber: "",
        phoneNumber: "",
        email: "",
        address: "",
        zone: "",
        meterType: "",
        connectionType: ""
      });

      toast({
        title: "Customer Registered Successfully",
        description: `Customer ID: ${customerId}`,
      });
    }, 2000);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Registration</h1>
            <p className="text-muted-foreground">Register new water connection customers</p>
          </div>
          <Badge variant="outline" className="text-sm">
            <Users className="h-4 w-4 mr-2" />
            Total: 1,245 Customers
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <CardDescription>
                  Fill in all required details for the new customer registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Personal Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="idNumber">ID Number *</Label>
                        <Input
                          id="idNumber"
                          value={formData.idNumber}
                          onChange={(e) => handleInputChange("idNumber", e.target.value)}
                          placeholder="Enter ID number"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="+254 7XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location Details
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Physical Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter complete physical address"
                        required
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zone">Service Zone *</Label>
                      <Select value={formData.zone} onValueChange={(value) => handleInputChange("zone", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {zones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              {zone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Connection Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Connection Details</h3>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="meterType">Meter Type *</Label>
                        <Select value={formData.meterType} onValueChange={(value) => handleInputChange("meterType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meter type" />
                          </SelectTrigger>
                          <SelectContent>
                            {meterTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="connectionType">Connection Type *</Label>
                        <Select value={formData.connectionType} onValueChange={(value) => handleInputChange("connectionType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select connection type" />
                          </SelectTrigger>
                          <SelectContent>
                            {connectionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="water"
                      size="lg"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Register Customer
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Registration Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Required Documents:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Copy of National ID</li>
                    <li>• Proof of property ownership</li>
                    <li>• Location sketch/map</li>
                    <li>• Application form</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Connection Fees:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Domestic: KSh 15,000</li>
                    <li>• Commercial: KSh 25,000</li>
                    <li>• Industrial: KSh 50,000</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Today's Registrations</span>
                  <Badge className="bg-success text-success-foreground">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <Badge variant="secondary">47</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Approvals</span>
                  <Badge className="bg-warning text-warning-foreground">8</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <DialogTitle className="text-xl">Registration Successful!</DialogTitle>
              <DialogDescription className="text-center">
                Customer has been successfully registered in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Customer ID:</p>
                <p className="text-2xl font-bold text-primary">{newCustomerId}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowSuccessDialog(false)}
                >
                  Register Another
                </Button>
                <Button 
                  variant="water" 
                  className="flex-1"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    // Navigate to customer details or dashboard
                  }}
                >
                  View Customer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}