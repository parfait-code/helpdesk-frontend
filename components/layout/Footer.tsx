import React from "react";
import { Link, Divider, Button } from "@nextui-org/react";
import {
  Headphones,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "HelpDesk", href: "/" },
    { name: "Migration Cloud", href: "/services#cloud-migration" },
    { name: "Infrastructure", href: "/services#infrastructure" },
    { name: "Réseau", href: "/services#network" },
    { name: "Sécurité", href: "/services#security" },
    { name: "Développement", href: "/services#development" },
  ];

  const company = [
    { name: "À propos", href: "/about" },
    { name: "Équipe", href: "/team" },
    { name: "Carrières", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ];

  const support = [
    { name: "Centre d'aide", href: "/help" },
    { name: "Documentation", href: "/docs" },
    { name: "Statut des services", href: "/status" },
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-content1 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Restez informé de nos dernières actualités
          </h3>
          <p className="text-default-600 mb-6 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir des conseils IT, des
            mises à jour sur nos services et des offres exclusives.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-lg border border-default-200 focus:outline-none focus:border-primary"
            />
            <Button color="primary" type="submit">
              S&apos;inscrire
            </Button>
          </form>
        </div>

        <Divider className="my-8" />

        {/* Links Section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">HelpDesk Pro</span>
            </div>
            <p className="text-default-600 mb-6">
              Votre partenaire de confiance pour tous vos besoins en support
              technique et services IT. Disponible 24/7 pour votre entreprise.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-default-600">
                <Mail className="w-4 h-4" />
                <span>contact@helpdeskpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-default-600">
                <Phone className="w-4 h-4" />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2 text-default-600">
                <MapPin className="w-4 h-4" />
                <span>Yaoundé, Cameroun</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    color="foreground"
                    size="sm"
                    className="hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    color="foreground"
                    size="sm"
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    color="foreground"
                    size="sm"
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-8" />

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-default-600 text-sm">
            © {currentYear} HelpDesk Pro. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-default-600 hover:text-primary transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
