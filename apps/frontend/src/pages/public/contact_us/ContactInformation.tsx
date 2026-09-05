import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import ContactItem from "./ContactItem";

const ContactInformation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Contact information</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Prefer to reach us directly? Here are the best ways to get in touch
          with the Cartzen team.
        </p>
      </div>

      <div className="space-y-3">
        <ContactItem
          icon={Mail}
          title="Email"
          description="Send us an email anytime"
          value="support@cartzen.com"
        />

        <ContactItem
          icon={Phone}
          title="Phone"
          description="Mon–Fri, 9:00 AM–6:00 PM"
          value="+63 912 345 6789"
        />

        <ContactItem
          icon={MapPin}
          title="Location"
          description="Our main office"
          value="Quezon City, Philippines"
        />

        <ContactItem
          icon={Clock}
          title="Business hours"
          description="We're available"
          value="Monday – Friday, 9:00 AM – 6:00 PM"
        />
      </div>

      {/* Response time */}
      <div className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="size-4 text-primary" />
          </div>

          <div>
            <p className="text-sm font-semibold">We'll get back to you</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              We typically respond to messages within 1–2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
