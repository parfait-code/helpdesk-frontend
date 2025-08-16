"use client";

import React from "react";
import { Input, Button, Checkbox, Link, Divider } from "@nextui-org/react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth, useAuthValidation } from "@/lib/utils/hooks/use-auth";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45 },
};

export default function RegisterPage() {
    const { register, isLoading, error, clearError } = useAuth();
    const {
        validateEmail,
        validatePassword,
        validateName,
        validateConfirmPassword,
        getPasswordCriteria,
    } = useAuthValidation();

    const [isVisible, setIsVisible] = React.useState(false);

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [validationErrors, setValidationErrors] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [acceptTerms, setAcceptTerms] = React.useState(false);
    const [newsletter, setNewsletter] = React.useState(false);

    const [passwordCriteria, setPasswordCriteria] = React.useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
    });
    const [passwordFocused, setPasswordFocused] = React.useState(false);

    const toggleVisibility = () => setIsVisible((v) => !v);

    const validateField = (field: string, value: string) => {
        let message = "";

        if (field === "firstName") {
            message = validateName(value, "Le prénom");
        } else if (field === "lastName") {
            message = validateName(value, "Le nom");
        } else if (field === "email") {
            message = validateEmail(value);
        } else if (field === "password") {
            message = validatePassword(value);
            setPasswordCriteria(getPasswordCriteria(value));
        } else if (field === "confirmPassword") {
            message = validateConfirmPassword(formData.password, value);
        }

        setValidationErrors((prev) => ({ ...prev, [field]: message }));
        return message === "";
    };

    const validateForm = () => {
        const fields = [
            "firstName",
            "lastName",
            "email",
            "password",
            "confirmPassword",
        ];

        let isValid = true;

        for (const field of fields) {
            const value = (formData as Record<string, string>)[field] || "";
            const isFieldValid = validateField(field, value);
            if (!isFieldValid) {
                isValid = false;
            }
        }

        if (!acceptTerms) {
            clearError();
            // On pourrait ajouter une erreur spécifique pour les conditions
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        clearError();

        if (!acceptTerms) {
            // Créer une erreur temporaire pour les conditions
            return;
        }

        if (!validateForm()) {
            return;
        }

        await register(formData);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
        if (error) clearError();
    };

    const passwordRequirements = [
        { text: "Au moins 8 caractères", met: passwordCriteria.length },
        {
            text: "Au moins une majuscule (A-Z)",
            met: passwordCriteria.uppercase,
        },
        {
            text: "Au moins une minuscule (a-z)",
            met: passwordCriteria.lowercase,
        },
        { text: "Au moins un chiffre (0-9)", met: passwordCriteria.digit },
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-xl mx-auto p-2"
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Créer un compte</h2>
                    <p className="text-default-600 mt-2">
                        Inscrivez-vous pour accéder à HelpDesk
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-default-700">Prénom</label>
                            <Input
                                placeholder="Jean"
                                className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                                value={formData.firstName}
                                onValueChange={(v) =>
                                    handleInputChange("firstName", v)
                                }
                                isInvalid={!!validationErrors.firstName}
                                startContent={
                                    <User className="w-4 h-4 text-default-400" />
                                }
                                classNames={{ input: "text-default-800" }}
                            />
                            {validationErrors.firstName && (
                                <p className="text-danger text-sm mt-1">
                                    {validationErrors.firstName}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-default-700">Nom</label>
                            <Input
                                placeholder="Dupont"
                                className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                                value={formData.lastName}
                                onValueChange={(v) =>
                                    handleInputChange("lastName", v)
                                }
                                isInvalid={!!validationErrors.lastName}
                                classNames={{ input: "text-default-800" }}
                            />
                            {validationErrors.lastName && (
                                <p className="text-danger text-sm mt-1">
                                    {validationErrors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-default-700">Email</label>
                        <Input
                            placeholder="vous@entreprise.com"
                            type="email"
                            className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                            value={formData.email}
                            onValueChange={(v) => handleInputChange("email", v)}
                            isInvalid={!!validationErrors.email}
                            startContent={
                                <Mail className="w-4 h-4 text-default-400" />
                            }
                            classNames={{ input: "text-default-800" }}
                        />
                        {validationErrors.email && (
                            <p className="text-danger text-sm mt-1">
                                {validationErrors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-default-700">Mot de passe</label>
                        <Input
                            placeholder="Créez un mot de passe sécurisé"
                            className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                            value={formData.password}
                            onValueChange={(v) =>
                                handleInputChange("password", v)
                            }
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            isInvalid={!!validationErrors.password}
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
                            startContent={
                                <Lock className="w-4 h-4 text-default-400" />
                            }
                            classNames={{ input: "text-default-800" }}
                        />
                        {validationErrors.password && (
                            <p className="text-danger text-sm mt-1">
                                {validationErrors.password}
                            </p>
                        )}

                        {passwordFocused && (
                            <motion.ul
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 space-y-1 text-sm"
                            >
                                {passwordRequirements.map((req, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex items-center gap-2 ${
                                            req.met
                                                ? "text-green-600"
                                                : "text-default-500"
                                        }`}
                                    >
                                        <Check className="w-4 h-4" />
                                        <span>{req.text}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-default-700">
                            Confirmer le mot de passe
                        </label>
                        <Input
                            placeholder="Confirmez le mot de passe"
                            className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                            value={formData.confirmPassword}
                            onValueChange={(v) =>
                                handleInputChange("confirmPassword", v)
                            }
                            isInvalid={!!validationErrors.confirmPassword}
                            startContent={
                                <Lock className="w-4 h-4 text-default-400" />
                            }
                            classNames={{ input: "text-default-800" }}
                        />
                        {validationErrors.confirmPassword && (
                            <p className="text-danger text-sm mt-1">
                                {validationErrors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <Checkbox
                            isSelected={acceptTerms}
                            onChange={(s) => setAcceptTerms(!!s)}
                        />
                        <p className="text-sm">
                            J&apos;accepte les <Link>conditions</Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Checkbox
                            isSelected={newsletter}
                            onChange={(s) => setNewsletter(!!s)}
                        />
                        <p className="text-sm">
                            S&apos;inscrire &agrave; la newsletter
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button
                            isDisabled={isLoading}
                            type="submit"
                            color="primary"
                            onClick={handleSubmit}
                            className="w-full"
                        >
                            {isLoading ? "Création..." : "Créer mon compte"}
                        </Button>
                    </div>

                    <Divider />

                    <p className="text-sm text-center">
                        Vous avez déjà un compte ?{" "}
                        <Link href="/login">Se connecter</Link>
                    </p>
                </form>
            </div>
        </motion.div>
    );
}
