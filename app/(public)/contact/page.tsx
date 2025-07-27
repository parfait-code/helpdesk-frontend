"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Chip,
  Link,
  RadioGroup,
  Radio,
  Divider,
} from "@nextui-org/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Globe,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    description: "Réponse sous 24h",
    value: "contact@helpdeskpro.com",
    link: "mailto:contact@helpdeskpro.com",
    color: "primary",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Téléphone",
    description: "Lun-Ven 8h-18h",
    value: "+237 6XX XXX XXX",
    link: "tel:+237600000000",
    color: "success",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Chat en direct",
    description: "Support instantané",
    value: "Disponible 24/7",
    link: "#",
    color: "secondary",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Bureau",
    description: "Visites sur RDV",
    value: "Yaoundé, Cameroun",
    link: "#",
    color: "warning",
  },
];

const services = [
  "HelpDesk - Support Technique",
  "Migration Cloud (AWS)",
  "Gestion des Infrastructures",
  "Conception Réseau",
  "Sécurité Infrastructure",
  "Audit IT",
  "Développement Web",
  "Développement Mobile",
  "Autre",
];

const companySize = [
  "1-10 employés",
  "11-50 employés",
  "51-200 employés",
  "201-500 employés",
  "500+ employés",
];

const urgencyLevels = [
  { value: "low", label: "Faible - Sous 1 semaine", color: "success" },
  { value: "medium", label: "Moyenne - Sous 3 jours", color: "warning" },
  { value: "high", label: "Élevée - Sous 24h", color: "danger" },
  { value: "critical", label: "Critique - Immédiat", color: "danger" },
];

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    service: "",
    urgency: "medium",
    message: "",
    acceptTerms: false,
    newsletter: false,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Message envoyé avec succès !
          </h2>
          <p className="text-default-600 mb-8">
            Nous avons bien reçu votre message et nous vous répondrons dans les
            plus brefs délais.
          </p>
          <div className="flex gap-4 justify-center">
            <Button as={Link} href="/" variant="flat">
              Retour à l&apos;accueil
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  company: "",
                  companySize: "",
                  service: "",
                  urgency: "medium",
                  message: "",
                  acceptTerms: false,
                  newsletter: false,
                });
              }}
            >
              Envoyer un autre message
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              Notre équipe est à votre écoute pour répondre à toutes vos
              questions et vous accompagner dans vos projets IT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={method.link !== "#" ? method.link : undefined}>
                  <Card
                    as={method.link !== "#" ? Link : "div"}
                    isPressable={method.link !== "#"}
                    className="h-full hover:shadow-lg transition-shadow"
                  >
                    <CardBody className="text-center p-6">
                      <div
                        className={`text-${method.color} bg-${method.color}/10 p-3 rounded-xl w-fit mx-auto mb-4`}
                      >
                        {method.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      <p className="text-sm text-default-500 mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium">{method.value}</p>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="pb-0">
                  <h2 className="text-2xl font-bold">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-default-600">
                    Remplissez le formulaire ci-dessous et nous vous répondrons
                    rapidement
                  </p>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Prénom"
                        placeholder="Jean"
                        value={formData.firstName}
                        onValueChange={(value) =>
                          handleInputChange("firstName", value)
                        }
                        isRequired
                        variant="bordered"
                      />
                      <Input
                        label="Nom"
                        placeholder="Dupont"
                        value={formData.lastName}
                        onValueChange={(value) =>
                          handleInputChange("lastName", value)
                        }
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    {/* Contact Fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        label="Email"
                        placeholder="jean.dupont@entreprise.com"
                        value={formData.email}
                        onValueChange={(value) =>
                          handleInputChange("email", value)
                        }
                        isRequired
                        variant="bordered"
                        startContent={
                          <Mail className="w-4 h-4 text-default-400" />
                        }
                      />
                      <Input
                        type="tel"
                        label="Téléphone"
                        placeholder="+237 6XX XXX XXX"
                        value={formData.phone}
                        onValueChange={(value) =>
                          handleInputChange("phone", value)
                        }
                        variant="bordered"
                        startContent={
                          <Phone className="w-4 h-4 text-default-400" />
                        }
                      />
                    </div>

                    {/* Company Fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Entreprise"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onValueChange={(value) =>
                          handleInputChange("company", value)
                        }
                        variant="bordered"
                        startContent={
                          <Users className="w-4 h-4 text-default-400" />
                        }
                      />
                      <Select
                        label="Taille de l'entreprise"
                        placeholder="Sélectionnez"
                        value={formData.companySize}
                        onChange={(e) =>
                          handleInputChange("companySize", e.target.value)
                        }
                        variant="bordered"
                      >
                        {companySize.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Service Selection */}
                    <Select
                      label="Service concerné"
                      placeholder="Quel service vous intéresse ?"
                      value={formData.service}
                      onChange={(e) =>
                        handleInputChange("service", e.target.value)
                      }
                      isRequired
                      variant="bordered"
                      startContent={
                        <Headphones className="w-4 h-4 text-default-400" />
                      }
                    >
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </Select>

                    {/* Urgency Level */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Niveau d&apos;urgence
                      </label>
                      <RadioGroup
                        value={formData.urgency}
                        onValueChange={(value) =>
                          handleInputChange("urgency", value)
                        }
                        orientation="horizontal"
                        className="gap-4"
                      >
                        {urgencyLevels.map((level) => (
                          <Radio
                            key={level.value}
                            value={level.value}
                            classNames={{
                              base: "inline-flex",
                              wrapper: `border-${level.color}`,
                            }}
                          >
                            <span className="text-sm">{level.label}</span>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Message */}
                    <Textarea
                      label="Votre message"
                      placeholder="Décrivez votre projet ou votre problème..."
                      value={formData.message}
                      onValueChange={(value) =>
                        handleInputChange("message", value)
                      }
                      isRequired
                      variant="bordered"
                      minRows={4}
                      maxRows={8}
                    />

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <Checkbox
                        isSelected={formData.acceptTerms}
                        onValueChange={(value) =>
                          handleInputChange("acceptTerms", value)
                        }
                        size="sm"
                      >
                        <span className="text-sm">
                          J&apos;accepte les{" "}
                          <Link href="/terms" size="sm" className="underline">
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="/privacy" size="sm" className="underline">
                            politique de confidentialité
                          </Link>
                        </span>
                      </Checkbox>

                      <Checkbox
                        isSelected={formData.newsletter}
                        onValueChange={(value) =>
                          handleInputChange("newsletter", value)
                        }
                        size="sm"
                      >
                        <span className="text-sm">
                          Je souhaite recevoir la newsletter et les offres de
                          HelpDesk Pro
                        </span>
                      </Checkbox>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      isDisabled={!formData.acceptTerms}
                      className="w-full font-semibold"
                      endContent={!isSubmitting && <Send className="w-5 h-5" />}
                    >
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Envoyer le message"}
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Response Card */}
              <Card className="bg-primary text-white">
                <CardBody className="p-6">
                  <Headphones className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Besoin d&apos;une réponse immédiate ?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Créez un compte et accédez directement à notre plateforme
                    HelpDesk pour un support instantané.
                  </p>
                  <Button
                    as={Link}
                    href="/register"
                    className="bg-white text-primary font-semibold"
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Créer un compte
                  </Button>
                </CardBody>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Horaires d&apos;ouverture
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-default-600">Lundi - Vendredi</span>
                      <span className="font-medium">8h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Samedi</span>
                      <span className="font-medium">9h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-600">Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                    <Divider className="my-3" />
                    <div className="bg-warning/10 text-warning-600 p-3 rounded-lg">
                      <p className="text-sm font-medium flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        Support HelpDesk disponible 24/7 pour les clients
                        inscrits
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Suivez-nous
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-default-600 mb-4">
                    Restez informé de nos actualités et conseils IT
                  </p>
                  <div className="flex gap-3">
                    <Button
                      as={Link}
                      href="#"
                      isIconOnly
                      variant="flat"
                      aria-label="Facebook"
                    >
                      f
                    </Button>
                    <Button
                      as={Link}
                      href="#"
                      isIconOnly
                      variant="flat"
                      aria-label="Twitter"
                    >
                      X
                    </Button>
                    <Button
                      as={Link}
                      href="#"
                      isIconOnly
                      variant="flat"
                      aria-label="LinkedIn"
                    >
                      in
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 bg-content1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              Notre Localisation
            </h2>
            <Card>
              <CardBody className="p-0">
                <div className="bg-default-100 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">Yaoundé, Cameroun</p>
                    <p className="text-default-600">
                      Centre-ville, Quartier Administratif
                    </p>
                    <Button
                      as={Link}
                      href="#"
                      color="primary"
                      variant="flat"
                      className="mt-4"
                    >
                      Obtenir l&apos;itinéraire
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
