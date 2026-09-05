import Header from "./contact_us/Header";
import ContactInformation from "./contact_us/ContactInformation";
import ContactForm from "./contact_us/ContactForm";

const ContactUsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Header />

      {/* Content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <ContactInformation />

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
