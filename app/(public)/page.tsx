"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Avatar,
  Progress,
  Divider,
} from "@nextui-org/react";
import {
  Headphones,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  BarChart3,
  MessageSquare,
  Cloud,
  Network,
  Code,
  Mail,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const statistics = [
  {
    label: "Tickets résolus",
    value: "10,000+",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    label: "Clients satisfaits",
    value: "500+",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Temps de réponse",
    value: "< 15min",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    label: "Disponibilité",
    value: "99.9%",
    icon: <Shield className="w-6 h-6" />,
  },
];

const features = [
  {
    title: "Support 24/7",
    description:
      "Notre équipe est disponible à tout moment pour résoudre vos problèmes techniques",
    icon: <Clock className="w-8 h-8" />,
    color: "primary",
  },
  {
    title: "Réponse Rapide",
    description:
      "Temps de réponse moyen inférieur à 15 minutes pour les urgences",
    icon: <Zap className="w-8 h-8" />,
    color: "success",
  },
  {
    title: "Expertise Certifiée",
    description:
      "Équipe d'experts certifiés dans les dernières technologies cloud et infrastructure",
    icon: <Shield className="w-8 h-8" />,
    color: "secondary",
  },
  {
    title: "Suivi en Temps Réel",
    description:
      "Suivez l'évolution de vos tickets et communiquez directement avec nos techniciens",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "warning",
  },
];

const secondaryServices = [
  {
    title: "Migration Cloud (AWS)",
    description: "Migrez vos infrastructures vers le cloud en toute sécurité",
    icon: <Cloud className="w-6 h-6" />,
    href: "/services#cloud-migration",
  },
  {
    title: "Gestion Infrastructure",
    description: "Supervision et maintenance de vos serveurs et réseaux",
    icon: <Shield className="w-6 h-6" />,
    href: "/services#infrastructure",
  },
  {
    title: "Conception Réseau",
    description: "Architecture réseau sur mesure pour votre entreprise",
    icon: <Network className="w-6 h-6" />,
    href: "/services#network",
  },
  {
    title: "Développement",
    description: "Applications web et mobiles personnalisées",
    icon: <Code className="w-6 h-6" />,
    href: "/services#development",
  },
];

const testimonials = [
  {
    name: "Jean Dupont",
    role: "DSI, TechCorp",
    content:
      "HelpDesk Pro a transformé notre support technique. La réactivité et l'expertise de leur équipe sont exceptionnelles.",
    rating: 5,
    avatar: "JD",
  },
  {
    name: "Marie Martin",
    role: "CEO, StartupXYZ",
    content:
      "Un service client irréprochable et des solutions toujours adaptées à nos besoins. Je recommande vivement.",
    rating: 5,
    avatar: "MM",
  },
  {
    name: "Paul Bernard",
    role: "CTO, InnovateTech",
    content:
      "La migration cloud s'est déroulée sans accroc grâce à leur expertise. Un partenaire de confiance.",
    rating: 5,
    avatar: "PB",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <Chip
              color="primary"
              variant="flat"
              className="mb-6"
              startContent={<Headphones className="w-4 h-4" />}
            >
              Support Technique Professionnel
            </Chip>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Votre HelpDesk Intelligent
              <br />
              Disponible 24/7
            </h1>

            <p className="text-xl text-default-600 mb-8 max-w-3xl mx-auto">
              Résolvez vos problèmes techniques instantanément avec notre
              plateforme de support innovante. Créez des tickets, suivez leur
              progression et communiquez avec nos experts en temps réel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/register"
                color="primary"
                size="lg"
                endContent={<ArrowRight className="w-5 h-5" />}
                className="font-semibold"
              >
                Commencer Gratuitement
              </Button>
              <Button
                as={Link}
                href="/services"
                variant="bordered"
                size="lg"
                className="font-semibold"
              >
                Découvrir nos Services
              </Button>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {statistics.map((stat, index) => (
              <Card key={index} className="bg-content1/50 backdrop-blur-md">
                <CardBody className="text-center p-6">
                  <div className="flex justify-center mb-3 text-primary">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-default-600 text-sm">{stat.label}</p>
                </CardBody>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-content1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi Choisir HelpDesk Pro ?
            </h2>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              Une solution complète pour gérer efficacement tous vos besoins en
              support technique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className={`text-${feature.color} mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-default-600">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça Fonctionne ?
            </h2>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              Trois étapes simples pour résoudre vos problèmes techniques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Créez un Ticket",
                description:
                  "Décrivez votre problème en quelques clics via notre interface intuitive",
              },
              {
                step: "2",
                title: "Suivi en Temps Réel",
                description:
                  "Suivez l'avancement de votre ticket et communiquez avec nos techniciens",
              },
              {
                step: "3",
                title: "Résolution Rapide",
                description:
                  "Obtenez une solution dans les meilleurs délais avec un support continu",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-default-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Services Section */}
      <section className="py-20 bg-content1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Autres Services
            </h2>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              Au-delà du HelpDesk, nous offrons une gamme complète de services
              IT
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {secondaryServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  as={Link}
                  href={service.href}
                  isPressable
                  className="h-full hover:shadow-lg transition-all"
                >
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary bg-primary/10 p-3 rounded-lg">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {service.title}
                        </h3>
                        <p className="text-default-600">
                          {service.description}
                        </p>
                        <Link
                          href={service.href}
                          className="text-primary text-sm mt-2 inline-flex items-center gap-1"
                        >
                          En savoir plus <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              as={Link}
              href="/services"
              variant="bordered"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Voir tous nos services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que Disent nos Clients
            </h2>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              La satisfaction de nos clients est notre priorité absolue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-warning text-warning"
                        />
                      ))}
                    </div>
                    <p className="text-default-600 mb-6 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={testimonial.avatar}
                        className="bg-primary text-white"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-default-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Transformer votre Support Technique ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez des centaines d&apos;entreprises qui font confiance à
              HelpDesk Pro pour leur support technique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/register"
                size="lg"
                className="bg-white text-primary font-semibold"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Créer un Compte Gratuit
              </Button>
              <Button
                as={Link}
                href="/contact"
                size="lg"
                variant="bordered"
                className="border-white text-white font-semibold"
                startContent={<MessageSquare className="w-5 h-5" />}
              >
                Contactez-nous
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              Aucune carte de crédit requise • Support gratuit inclus
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
