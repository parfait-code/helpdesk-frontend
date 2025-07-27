"use client";

import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Link,
  Divider,
  Avatar,
} from "@nextui-org/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = React.useState({
    email: "",
    password: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email invalide";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulation de l'appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulation de succès - redirection vers le dashboard
      console.log("Login avec:", formData);

      // Stockage temporaire pour la démo
      if (rememberMe) {
        localStorage.setItem("userEmail", formData.email);
      }

      // Redirection vers le dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
    // Clear general error
    if (error) setError("");
  };

  // Demo accounts for testing
  const demoAccounts = [
    { email: "demo@helpdeskpro.com", password: "demo123", role: "Client" },
    { email: "admin@helpdeskpro.com", password: "admin123", role: "Admin" },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Bon retour !</h2>
          <p className="text-default-600 mt-2">
            Connectez-vous pour accéder à votre espace HelpDesk
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-danger/10 border border-danger/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 text-danger">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            placeholder="vous@exemple.com"
            type="email"
            variant="bordered"
            value={formData.email}
            onValueChange={(value) => handleInputChange("email", value)}
            isInvalid={!!validationErrors.email}
            errorMessage={validationErrors.email}
            startContent={<Mail className="w-4 h-4 text-default-400" />}
            classNames={{
              label: "text-default-700",
              input: "text-default-800",
              errorMessage: "text-danger text-sm",
            }}
          />

          <Input
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            variant="bordered"
            value={formData.password}
            onValueChange={(value) => handleInputChange("password", value)}
            isInvalid={!!validationErrors.password}
            errorMessage={validationErrors.password}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label={
                  isVisible
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-default-400" />
                ) : (
                  <Eye className="w-4 h-4 text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            startContent={<Lock className="w-4 h-4 text-default-400" />}
            classNames={{
              label: "text-default-700",
              input: "text-default-800",
              errorMessage: "text-danger text-sm",
            }}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              size="sm"
              isSelected={rememberMe}
              onValueChange={setRememberMe}
              classNames={{
                label: "text-sm text-default-600",
              }}
            >
              Se souvenir de moi
            </Checkbox>
            <Link href="/forgot-password" size="sm" className="text-primary">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold"
            size="lg"
            isLoading={isLoading}
            endContent={!isLoading && <ArrowRight className="w-5 h-5" />}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="relative">
          <Divider />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-content1 px-4 text-sm text-default-500">
            OU
          </span>
        </div>

        {/* Demo Accounts */}
        <div className="space-y-3">
          <p className="text-sm text-default-600 text-center">
            Comptes de démonstration pour tester :
          </p>
          {demoAccounts.map((account, index) => (
            <Card
              key={index}
              isPressable
              className="cursor-pointer hover:bg-default-100"
              onClick={() => {
                setFormData({
                  email: account.email,
                  password: account.password,
                });
                setValidationErrors({ email: "", password: "" });
                setError("");
              }}
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    name={account.role}
                    className="bg-primary text-white"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{account.role}</p>
                    <p className="text-xs text-default-500">{account.email}</p>
                  </div>
                  <p className="text-xs text-default-400">
                    Cliquez pour remplir
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-default-600">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-primary font-medium">
              Créez-en un gratuitement
            </Link>
          </p>

          <Link
            href="/"
            size="sm"
            className="text-default-500 inline-flex items-center gap-1"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
