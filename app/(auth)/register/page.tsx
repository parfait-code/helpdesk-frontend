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
  Progress,
  Chip,
} from "@nextui-org/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface PasswordStrength {
  score: number;
  label: string;
  color: "danger" | "warning" | "success";
}

export default function RegisterPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(false);
  const [error, setError] = React.useState("");
  const [step, setStep] = React.useState(1); // 1: Info, 2: Password

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score: 33, label: "Faible", color: "danger" };
    if (score <= 4) return { score: 66, label: "Moyen", color: "warning" };
    return { score: 100, label: "Fort", color: "success" };
  };

  const passwordStrength = React.useMemo(
    () => calculatePasswordStrength(formData.password),
    [formData.password]
  );

  const validateStep1 = () => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName) errors.firstName = "Le prénom est requis";
    if (!formData.lastName) errors.lastName = "Le nom est requis";

    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email invalide";
    }

    if (
      formData.phone &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/.test(
        formData.phone
      )
    ) {
      errors.phone = "Numéro de téléphone invalide";
    }

    setValidationErrors(errors);
    return (
      !errors.firstName && !errors.lastName && !errors.email && !errors.phone
    );
  };

  const validateStep2 = () => {
    const errors = { ...validationErrors };

    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (passwordStrength.score < 66) {
      errors.password = "Le mot de passe est trop faible";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setValidationErrors(errors);
    return !errors.password && !errors.confirmPassword;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateStep2()) {
      return;
    }

    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setIsLoading(true);

    try {
      // Simulation de l'appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Inscription avec:", formData);

      // Redirection vers la page de connexion avec message de succès
      router.push("/login?registered=true");
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription");
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

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "Au moins 8 caractères" },
    {
      met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
      text: "Majuscules et minuscules",
    },
    { met: /[0-9]/.test(formData.password), text: "Au moins un chiffre" },
    {
      met: /[^a-zA-Z0-9]/.test(formData.password),
      text: "Au moins un caractère spécial",
    },
  ];

  return (
    <motion.div initial="initial" animate="animate" variants={fadeIn}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Créez votre compte</h2>
          <p className="text-default-600 mt-2">
            Commencez à utiliser HelpDesk Pro gratuitement
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                step >= 1 ? "bg-primary" : "bg-default-300"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              Informations
            </span>
          </div>
          <div
            className={`w-16 h-0.5 ${
              step >= 2 ? "bg-primary" : "bg-default-300"
            }`}
          />
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                step >= 2 ? "bg-primary" : "bg-default-300"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              Sécurité
            </span>
          </div>
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
          {step === 1 ? (
            <>
              {/* Step 1: Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Prénom"
                  placeholder="Jean"
                  variant="bordered"
                  value={formData.firstName}
                  onValueChange={(value) =>
                    handleInputChange("firstName", value)
                  }
                  isInvalid={!!validationErrors.firstName}
                  errorMessage={validationErrors.firstName}
                  startContent={<User className="w-4 h-4 text-default-400" />}
                />
                <Input
                  label="Nom"
                  placeholder="Dupont"
                  variant="bordered"
                  value={formData.lastName}
                  onValueChange={(value) =>
                    handleInputChange("lastName", value)
                  }
                  isInvalid={!!validationErrors.lastName}
                  errorMessage={validationErrors.lastName}
                />
              </div>

              <Input
                label="Email professionnel"
                placeholder="vous@entreprise.com"
                type="email"
                variant="bordered"
                value={formData.email}
                onValueChange={(value) => handleInputChange("email", value)}
                isInvalid={!!validationErrors.email}
                errorMessage={validationErrors.email}
                startContent={<Mail className="w-4 h-4 text-default-400" />}
              />

              <Input
                label="Téléphone (optionnel)"
                placeholder="+237 6XX XXX XXX"
                type="tel"
                variant="bordered"
                value={formData.phone}
                onValueChange={(value) => handleInputChange("phone", value)}
                isInvalid={!!validationErrors.phone}
                errorMessage={validationErrors.phone}
                startContent={<Phone className="w-4 h-4 text-default-400" />}
              />

              <Input
                label="Entreprise (optionnel)"
                placeholder="Nom de votre entreprise"
                variant="bordered"
                value={formData.company}
                onValueChange={(value) => handleInputChange("company", value)}
                startContent={<Building className="w-4 h-4 text-default-400" />}
              />

              <Button
                color="primary"
                className="w-full font-semibold"
                size="lg"
                onClick={handleNextStep}
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Continuer
              </Button>
            </>
          ) : (
            <>
              {/* Step 2: Password */}
              <div className="space-y-4">
                <Input
                  label="Mot de passe"
                  placeholder="Créez un mot de passe sécurisé"
                  variant="bordered"
                  value={formData.password}
                  onValueChange={(value) =>
                    handleInputChange("password", value)
                  }
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
                />

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-default-600">
                        Force du mot de passe
                      </span>
                      <Chip
                        size="sm"
                        color={passwordStrength.color}
                        variant="flat"
                      >
                        {passwordStrength.label}
                      </Chip>
                    </div>
                    <Progress
                      value={passwordStrength.score}
                      color={passwordStrength.color}
                      size="sm"
                    />
                    <div className="space-y-1 mt-2">
                      {passwordRequirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle
                            className={`w-4 h-4 ${
                              req.met ? "text-success" : "text-default-300"
                            }`}
                          />
                          <span
                            className={
                              req.met ? "text-default-700" : "text-default-500"
                            }
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Input
                  label="Confirmer le mot de passe"
                  placeholder="Confirmez votre mot de passe"
                  variant="bordered"
                  value={formData.confirmPassword}
                  onValueChange={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  isInvalid={!!validationErrors.confirmPassword}
                  errorMessage={validationErrors.confirmPassword}
                  type={isVisible ? "text" : "password"}
                  startContent={<Shield className="w-4 h-4 text-default-400" />}
                />
              </div>

              <div className="space-y-3">
                <Checkbox
                  size="sm"
                  isSelected={acceptTerms}
                  onValueChange={setAcceptTerms}
                  classNames={{
                    label: "text-sm text-default-600",
                  }}
                >
                  J&apos;accepte les{" "}
                  <Link href="/terms" size="sm" className="underline">
                    conditions d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" size="sm" className="underline">
                    politique de confidentialité
                  </Link>
                </Checkbox>

                <Checkbox
                  size="sm"
                  isSelected={newsletter}
                  onValueChange={setNewsletter}
                  classNames={{
                    label: "text-sm text-default-600",
                  }}
                >
                  Je souhaite recevoir des actualités et offres par email
                </Checkbox>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="flat"
                  className="font-semibold"
                  size="lg"
                  onClick={() => setStep(1)}
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="flex-1 font-semibold"
                  size="lg"
                  isLoading={isLoading}
                  isDisabled={!acceptTerms}
                  endContent={!isLoading && <CheckCircle className="w-5 h-5" />}
                >
                  {isLoading ? "Création..." : "Créer mon compte"}
                </Button>
              </div>
            </>
          )}
        </form>

        {step === 1 && (
          <>
            <div className="relative">
              <Divider />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-content1 px-4 text-sm text-default-500">
                OU
              </span>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-default-600">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-primary font-medium">
                  Connectez-vous
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
          </>
        )}
      </div>
    </motion.div>
  );
}
