"use client";

import React from "react";
import { Input, Button, Checkbox, Link, Divider } from "@nextui-org/react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    ArrowRight,
    Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth, useAuthValidation } from "@/lib/utils/hooks/use-auth";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function LoginPage() {
    const { login, isLoading, error, clearError } = useAuth();
    const { validateEmail, validatePassword, getPasswordCriteria } =
        useAuthValidation();

    const [isVisible, setIsVisible] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] = React.useState({
        email: "",
        password: "",
    });

    // Password criteria state for checklist
    const [passwordCriteria, setPasswordCriteria] = React.useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
    });

    // Show checklist only when password input is focused
    const [passwordFocused, setPasswordFocused] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateForm = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        const errors = {
            email: emailError,
            password: passwordError,
        };

        setValidationErrors(errors);
        return !emailError && !passwordError;
    };

    // Validate a single field in real-time
    const validateField = (field: string, value: string) => {
        let message = "";

        if (field === "email") {
            message = validateEmail(value);
        }

        if (field === "password") {
            message = validatePassword(value);
            // Update checklist criteria
            setPasswordCriteria(getPasswordCriteria(value));
        }

        setValidationErrors((prev) => ({ ...prev, [field]: message }));
        return !message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) {
            return;
        }

        await login(formData, rememberMe);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Run per-field validation so errors appear while typing
        validateField(field, value);
        if (error) clearError();
    };

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
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-default-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Entrer votre Email"
                            className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                            value={formData.email}
                            onValueChange={(value) =>
                                handleInputChange("email", value)
                            }
                            isInvalid={!!validationErrors.email}
                            startContent={
                                <Mail className="w-4 h-4 text-default-400" />
                            }
                            classNames={{
                                input: "text-default-800",
                            }}
                        />
                        {validationErrors.email && (
                            <p className="text-danger text-sm mt-1">
                                {validationErrors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-default-700">
                            Mot de passe
                        </label>
                        <Input
                            id="password"
                            placeholder="Entrez votre mot de passe"
                            className="!border-[1px] !border-default-300 rounded-xl focus-within:!border-primary"
                            value={formData.password}
                            onValueChange={(value) =>
                                handleInputChange("password", value)
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
                            classNames={{
                                input: "text-default-800",
                            }}
                        />
                        {validationErrors.password && (
                            <p className="text-danger text-sm mt-1">
                                {validationErrors.password}
                            </p>
                        )}

                        {/* Password checklist - visible only when focused */}
                        {passwordFocused && (
                            <motion.ul className="mt-2 space-y-1 text-sm animate-fade-in">
                                <li
                                    className={`flex items-center gap-2 ${
                                        passwordCriteria.length
                                            ? "text-green-600"
                                            : "text-default-500"
                                    }`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Au moins 8 caractères</span>
                                </li>
                                <li
                                    className={`flex items-center gap-2 ${
                                        passwordCriteria.uppercase
                                            ? "text-green-600"
                                            : "text-default-500"
                                    }`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Au moins une majuscule (A-Z)</span>
                                </li>
                                <li
                                    className={`flex items-center gap-2 ${
                                        passwordCriteria.lowercase
                                            ? "text-green-600"
                                            : "text-default-500"
                                    }`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Au moins une minuscule (a-z)</span>
                                </li>
                                <li
                                    className={`flex items-center gap-2 ${
                                        passwordCriteria.digit
                                            ? "text-green-600"
                                            : "text-default-500"
                                    }`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Au moins un chiffre (0-9)</span>
                                </li>
                            </motion.ul>
                        )}
                    </div>

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
                        <Link
                            href="/forgot-password"
                            size="sm"
                            className="text-primary"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold"
                        isLoading={isLoading}
                        endContent={
                            !isLoading && <ArrowRight className="w-5 h-5" />
                        }
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

                <div className="text-center space-y-4">
                    <p className="text-sm text-default-600">
                        Pas encore de compte ?{" "}
                        <Link
                            href="/register"
                            className="text-primary font-medium"
                        >
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
