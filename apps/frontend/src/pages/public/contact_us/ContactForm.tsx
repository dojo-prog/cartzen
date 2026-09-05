import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

// TODO Apply functionality in the future

const ContactForm = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>

        <p className="text-sm text-muted-foreground">
          Fill out the form below and we'll get back to you.
        </p>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          {/* Name */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" placeholder="John" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="How can we help?" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>

            <Textarea
              id="message"
              name="message"
              placeholder="Tell us how we can help..."
              className="min-h-36 resize-none"
            />
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full">
            <Send className="mr-2 size-4" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
