"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Link,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Progress,
} from "@nextui-org/react";
import {
  Headphones,
  Cloud,
  Shield,
  Network,
  Lock,
  Code,
  CheckCircle,
  ArrowRight,
  Server,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Cpu,
  Zap,
  BarChart3,
  Users,
  FileCheck,
  Settings,
  AlertTriangle,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const services = [
  {
    id: "helpdesk",
    title: "HelpDesk",
    subtitle: "Service Principal",
    description:
      "Support technique complet disponible 24/7 avec suivi en temps réel",
    icon: <Headphones className="w-8 h-8" />,
    color: "primary",
    isPrimary: true,
    features: [
      "Création et gestion de tickets illimités",
      "Support par chat, email et téléphone",
      "Tableau de bord personnalisé",
      "Statistiques détaillées",
      "SLA garantis",
      "Base de connaissances intégrée",
    ],
    benefits: [
      { title: "Réduction des temps d'arrêt", value: "85%" },
      { title: "Satisfaction client", value: "98%" },
      { title: "Résolution premier contact", value: "75%" },
      { title: "Temps de réponse moyen", value: "15min" },
    ],
    cta: "Créer un compte gratuit",
    ctaLink: "/register",
  },
  {
    id: "cloud-migration",
    title: "Migration Cloud (AWS)",
    subtitle: "Service Secondaire",
    description:
      "Migration sécurisée et optimisée de vos infrastructures vers AWS",
    icon: <Cloud className="w-8 h-8" />,
    color: "secondary",
    features: [
      "Audit complet de l'infrastructure existante",
      "Plan de migration personnalisé",
      "Migration sans interruption de service",
      "Optimisation des coûts AWS",
      "Formation des équipes",
      "Support post-migration",
    ],
    technologies: ["AWS EC2", "S3", "RDS", "Lambda", "CloudFront", "Route 53"],
    process: [
      "Analyse et audit initial",
      "Conception de l'architecture cloud",
      "Migration pilote",
      "Migration complète",
      "Optimisation et monitoring",
    ],
  },
  {
    id: "infrastructure",
    title: "Gestion des Infrastructures Cloud",
    subtitle: "Service Secondaire",
    description:
      "Supervision, maintenance et optimisation de vos environnements cloud",
    icon: <Server className="w-8 h-8" />,
    color: "success",
    features: [
      "Monitoring 24/7",
      "Gestion des incidents",
      "Mises à jour et patches",
      "Optimisation des performances",
      "Gestion des sauvegardes",
      "Rapports mensuels détaillés",
    ],
    technologies: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "Prometheus",
      "Grafana",
    ],
    services: [
      "Infrastructure as Code",
      "DevOps et CI/CD",
      "Automatisation",
      "Disaster Recovery",
    ],
  },
  {
    id: "network",
    title: "Conception des Réseaux",
    subtitle: "Service Secondaire",
    description:
      "Architecture réseau sur mesure pour environnements locaux et cloud",
    icon: <Network className="w-8 h-8" />,
    color: "warning",
    features: [
      "Design d'architecture réseau",
      "Configuration VPN et SD-WAN",
      "Segmentation réseau",
      "Optimisation de la bande passante",
      "Redondance et haute disponibilité",
      "Documentation complète",
    ],
    solutions: [
      "Réseaux d'entreprise",
      "Réseaux hybrides cloud",
      "Software-Defined Networking",
      "Network Security",
    ],
  },
  {
    id: "security",
    title: "Sécurité des Infrastructures",
    subtitle: "Service Secondaire",
    description:
      "Protection complète contre les menaces et conformité réglementaire",
    icon: <Lock className="w-8 h-8" />,
    color: "danger",
    features: [
      "Audit de sécurité complet",
      "Tests de pénétration",
      "Mise en place de pare-feu",
      "Gestion des identités (IAM)",
      "Conformité RGPD",
      "Formation sécurité",
    ],
    certifications: ["ISO 27001", "SOC 2", "PCI DSS", "HIPAA"],
    services: [
      "Security Operations Center",
      "Incident Response",
      "Vulnerability Management",
      "Compliance Management",
    ],
  },
  {
    id: "development",
    title: "Développement Web & Mobile",
    subtitle: "Service Secondaire",
    description: "Applications sur mesure pour transformer votre business",
    icon: <Code className="w-8 h-8" />,
    color: "secondary",
    features: [
      "Applications web responsive",
      "Applications mobiles natives",
      "Progressive Web Apps",
      "API REST et GraphQL",
      "Intégrations tierces",
      "Maintenance et évolution",
    ],
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "Python",
      "PostgreSQL",
    ],
    projects: [
      "E-commerce",
      "Applications SaaS",
      "Portails d'entreprise",
      "Applications mobiles",
    ],
  },
];

const faqs = [
  {
    question: "Comment fonctionne le service HelpDesk ?",
    answer:
      "Notre service HelpDesk vous permet de créer des tickets pour tout problème technique. Nos experts prennent en charge votre demande dans les 15 minutes et vous accompagnent jusqu'à la résolution complète.",
  },
  {
    question: "Quelle est la durée d'une migration cloud ?",
    answer:
      "La durée dépend de la complexité de votre infrastructure. En moyenne, une migration complète prend entre 2 et 6 mois, incluant l'audit, la planification, la migration et l'optimisation.",
  },
  {
    question: "Proposez-vous des contrats de maintenance ?",
    answer:
      "Oui, nous proposons différents niveaux de contrats de maintenance adaptés à vos besoins, allant du support basique au support premium 24/7 avec SLA garantis.",
  },
  {
    question: "Comment garantissez-vous la sécurité de nos données ?",
    answer:
      "Nous appliquons les meilleures pratiques de sécurité incluant le chiffrement, la segmentation réseau, les audits réguliers et sommes certifiés ISO 27001.",
  },
];

export default function ServicesPage() {
  const [selectedTab, setSelectedTab] = React.useState("all");

  const filteredServices =
    selectedTab === "all"
      ? services
      : services.filter((s) => s.id === selectedTab);

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
              Nos Services IT Professionnels
            </h1>
            <p className="text-xl text-default-600 max-w-3xl mx-auto">
              Une gamme complète de services pour accompagner votre
              transformation digitale et assurer la performance de vos systèmes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-8 sticky top-16 bg-background/95 backdrop-blur-md z-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "flex-wrap justify-center",
              tab: "text-sm md:text-base",
            }}
          >
            <Tab key="all" title="Tous les services" />
            <Tab key="helpdesk" title="HelpDesk" />
            <Tab key="cloud-migration" title="Migration Cloud" />
            <Tab key="infrastructure" title="Infrastructure" />
            <Tab key="network" title="Réseau" />
            <Tab key="security" title="Sécurité" />
            <Tab key="development" title="Développement" />
          </Tabs>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`overflow-hidden ${
                    service.isPrimary ? "border-2 border-primary" : ""
                  }`}
                >
                  {service.isPrimary && (
                    <div className="bg-primary text-white text-center py-2 text-sm font-semibold">
                      Service Principal - Accès Direct via la Plateforme
                    </div>
                  )}

                  <CardHeader className="pb-0 pt-8">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-${service.color} bg-${service.color}/10 p-4 rounded-xl`}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">
                            {service.title}
                          </h2>
                          <Chip
                            size="sm"
                            variant="flat"
                            color={service.isPrimary ? "primary" : "default"}
                          >
                            {service.subtitle}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="pt-6">
                    <p className="text-lg text-default-600 mb-8">
                      {service.description}
                    </p>

                    {/* Primary Service Content */}
                    {service.isPrimary && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">
                            Fonctionnalités Incluses
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {service.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-4">
                            Performances Garanties
                          </h3>
                          <div className="grid md:grid-cols-4 gap-4">
                            {service.benefits?.map((benefit, idx) => (
                              <Card key={idx} className="bg-content2">
                                <CardBody className="text-center p-4">
                                  <p className="text-2xl font-bold text-primary">
                                    {benefit.value}
                                  </p>
                                  <p className="text-sm text-default-600">
                                    {benefit.title}
                                  </p>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <Button
                            as={Link}
                            href={service.ctaLink}
                            color="primary"
                            size="lg"
                            endContent={<ArrowRight className="w-5 h-5" />}
                            className="font-semibold"
                          >
                            {service.cta}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Secondary Service Content */}
                    {!service.isPrimary && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">
                            Services Inclus
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {service.technologies && (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">
                              Technologies Utilisées
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, idx) => (
                                <Chip key={idx} variant="flat" size="sm">
                                  {tech}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        )}

                        {service.process && (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">
                              Notre Processus
                            </h3>
                            <div className="space-y-3">
                              {service.process.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {service.certifications && (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">
                              Certifications
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {service.certifications.map((cert, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 bg-content2 px-4 py-2 rounded-lg"
                                >
                                  <FileCheck className="w-5 h-5 text-success" />
                                  <span className="font-medium">{cert}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-center pt-4">
                          <Button
                            as={Link}
                            href="/contact"
                            color={service.color as any}
                            variant="flat"
                            endContent={<ArrowRight className="w-5 h-5" />}
                            className="font-semibold"
                          >
                            Demander un devis
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-content1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-default-600">
              Trouvez rapidement des réponses à vos questions
            </p>
          </motion.div>

          <Accordion variant="bordered">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={faq.question}
                className="text-base"
              >
                <p className="text-default-600">{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Besoin d&apos;un Service Personnalisé ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nos experts sont là pour analyser vos besoins et vous proposer la
              solution idéale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-white text-primary font-semibold"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Contactez-nous
              </Button>
              <Button
                as={Link}
                href="tel:+237600000000"
                size="lg"
                variant="bordered"
                className="border-white text-white font-semibold"
                startContent={<Headphones className="w-5 h-5" />}
              >
                Appelez-nous
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
