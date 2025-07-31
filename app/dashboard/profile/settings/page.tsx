"use client";

import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Input,
    Switch,
    Select,
    SelectItem,
    Tabs,
    Tab,
    Divider,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    RadioGroup,
    Radio,
    Slider,
    Link,
    Avatar,
    Textarea,
    Checkbox,
    Badge,
} from "@nextui-org/react";
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Key,
    Database,
    Save,
    Mail,
    Smartphone,
    Monitor,
    Volume2,
    Zap,
    Link2,
    Trash2,
    Download,
    Upload,
    AlertTriangle,
    Check,
    X,
    HelpCircle,
    ChevronRight,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    CreditCard,
    Package,
    LogOut,
    RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

// Types pour les paramètres
interface NotificationSettings {
    email: {
        ticketUpdates: boolean;
        newAssignments: boolean;
        mentions: boolean;
        newsletter: boolean;
        marketing: boolean;
    };
    push: {
        enabled: boolean;
        ticketUpdates: boolean;
        mentions: boolean;
        sound: boolean;
    };
    sms: {
        enabled: boolean;
        criticalOnly: boolean;
    };
}

interface DisplaySettings {
    theme: "light" | "dark" | "system";
    language: string;
    timezone: string;
    dateFormat: string;
    compactMode: boolean;
    animations: boolean;
}

interface SecuritySettings {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    loginNotifications: boolean;
    apiAccess: boolean;
}

// Données mockées
const mockSettings = {
    notifications: {
        email: {
            ticketUpdates: true,
            newAssignments: true,
            mentions: true,
            newsletter: true,
            marketing: false,
        },
        push: {
            enabled: true,
            ticketUpdates: true,
            mentions: true,
            sound: true,
        },
        sms: {
            enabled: false,
            criticalOnly: true,
        },
    },
    display: {
        theme: "light" as const,
        language: "fr",
        timezone: "Africa/Douala",
        dateFormat: "DD/MM/YYYY",
        compactMode: false,
        animations: true,
    },
    security: {
        twoFactorEnabled: false,
        sessionTimeout: 30,
        loginNotifications: true,
        apiAccess: false,
    },
};

const languages = [
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "de", label: "Deutsch", flag: "🇩🇪" },
];

const timezones = [
    { value: "Africa/Douala", label: "Yaoundé/Douala (GMT+1)" },
    { value: "Europe/Paris", label: "Paris (GMT+1)" },
    { value: "Europe/London", label: "Londres (GMT+0)" },
    { value: "America/New_York", label: "New York (GMT-5)" },
    { value: "UTC", label: "UTC (GMT+0)" },
];

const dateFormats = [
    { value: "DD/MM/YYYY", label: "31/12/2024" },
    { value: "MM/DD/YYYY", label: "12/31/2024" },
    { value: "YYYY-MM-DD", label: "2024-12-31" },
    { value: "DD.MM.YYYY", label: "31.12.2024" },
];

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = React.useState("account");
    const [notifications, setNotifications] = React.useState(
        mockSettings.notifications
    );
    const [display, setDisplay] = React.useState(mockSettings.display);
    const [security, setSecurity] = React.useState(mockSettings.security);
    const [isSaving, setIsSaving] = React.useState(false);
    const [savedSection, setSavedSection] = React.useState<string | null>(null);

    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();
    const {
        isOpen: is2FAOpen,
        onOpen: on2FAOpen,
        onClose: on2FAClose,
    } = useDisclosure();
    const {
        isOpen: isPasswordOpen,
        onOpen: onPasswordOpen,
        onClose: onPasswordClose,
    } = useDisclosure();

    const handleSave = async (section: string) => {
        setIsSaving(true);
        setSavedSection(null);

        // Simulation de sauvegarde
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSaving(false);
        setSavedSection(section);

        // Réinitialiser le message après 3 secondes
        setTimeout(() => setSavedSection(null), 3000);
    };

    const tabContent = {
        account: (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Informations du compte
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Prénom"
                                defaultValue="Jean"
                                variant="bordered"
                                startContent={
                                    <User className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Nom"
                                defaultValue="Dupont"
                                variant="bordered"
                                startContent={
                                    <User className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Email"
                                type="email"
                                defaultValue="jean.dupont@entreprise.com"
                                variant="bordered"
                                startContent={
                                    <Mail className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Téléphone"
                                defaultValue="+237 6XX XXX XXX"
                                variant="bordered"
                                startContent={
                                    <Smartphone className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Entreprise"
                                defaultValue="Entreprise XYZ"
                                variant="bordered"
                                isDisabled
                            />
                            <Input
                                label="Département"
                                defaultValue="Service Commercial"
                                variant="bordered"
                            />
                        </div>

                        <Divider className="my-4" />

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Photo de profil
                                </h4>
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        size="lg"
                                        name="Jean Dupont"
                                        className="w-20 h-20"
                                    />
                                    <div className="space-x-2">
                                        <Button size="sm" variant="flat">
                                            <Upload className="w-4 h-4 mr-1" />
                                            Changer
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="danger"
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Bio
                                </h4>
                                <Textarea
                                    variant="bordered"
                                    placeholder="Parlez-nous de vous..."
                                    minRows={3}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="flex justify-end">
                    <Button
                        color="primary"
                        isLoading={isSaving && savedSection === "account"}
                        startContent={!isSaving && <Save className="w-4 h-4" />}
                        onClick={() => handleSave("account")}
                    >
                        {savedSection === "account"
                            ? "Enregistré !"
                            : "Enregistrer"}
                    </Button>
                </div>
            </div>
        ),

        notifications: (
            <div className="space-y-6">
                {/* Notifications Email */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">
                                Notifications Email
                            </h3>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Mises à jour de tickets
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Recevoir un email lors de changements
                                        sur vos tickets
                                    </p>
                                </div>
                                <Switch
                                    isSelected={
                                        notifications.email.ticketUpdates
                                    }
                                    onValueChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            email: {
                                                ...notifications.email,
                                                ticketUpdates: value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Nouvelles assignations
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Être notifié quand un ticket vous est
                                        assigné
                                    </p>
                                </div>
                                <Switch
                                    isSelected={
                                        notifications.email.newAssignments
                                    }
                                    onValueChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            email: {
                                                ...notifications.email,
                                                newAssignments: value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Mentions</p>
                                    <p className="text-sm text-default-500">
                                        Recevoir un email quand vous êtes
                                        mentionné
                                    </p>
                                </div>
                                <Switch
                                    isSelected={notifications.email.mentions}
                                    onValueChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            email: {
                                                ...notifications.email,
                                                mentions: value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <Divider />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Newsletter</p>
                                    <p className="text-sm text-default-500">
                                        Actualités et mises à jour de HelpDesk
                                        Pro
                                    </p>
                                </div>
                                <Switch
                                    isSelected={notifications.email.newsletter}
                                    onValueChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            email: {
                                                ...notifications.email,
                                                newsletter: value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Communications marketing
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Offres spéciales et promotions
                                    </p>
                                </div>
                                <Switch
                                    isSelected={notifications.email.marketing}
                                    onValueChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            email: {
                                                ...notifications.email,
                                                marketing: value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Notifications Push */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">
                                Notifications Push
                            </h3>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Activer les notifications push
                                </p>
                                <p className="text-sm text-default-500">
                                    Recevoir des notifications dans votre
                                    navigateur
                                </p>
                            </div>
                            <Switch
                                isSelected={notifications.push.enabled}
                                onValueChange={(value) =>
                                    setNotifications({
                                        ...notifications,
                                        push: {
                                            ...notifications.push,
                                            enabled: value,
                                        },
                                    })
                                }
                            />
                        </div>

                        {notifications.push.enabled && (
                            <>
                                <Divider />
                                <div className="space-y-3 pl-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm">
                                            Mises à jour de tickets
                                        </p>
                                        <Switch
                                            size="sm"
                                            isSelected={
                                                notifications.push.ticketUpdates
                                            }
                                            onValueChange={(value) =>
                                                setNotifications({
                                                    ...notifications,
                                                    push: {
                                                        ...notifications.push,
                                                        ticketUpdates: value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm">Mentions</p>
                                        <Switch
                                            size="sm"
                                            isSelected={
                                                notifications.push.mentions
                                            }
                                            onValueChange={(value) =>
                                                setNotifications({
                                                    ...notifications,
                                                    push: {
                                                        ...notifications.push,
                                                        mentions: value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm">
                                            Son de notification
                                        </p>
                                        <Switch
                                            size="sm"
                                            isSelected={
                                                notifications.push.sound
                                            }
                                            onValueChange={(value) =>
                                                setNotifications({
                                                    ...notifications,
                                                    push: {
                                                        ...notifications.push,
                                                        sound: value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </CardBody>
                </Card>

                {/* Notifications SMS */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5" />
                            <h3 className="text-lg font-semibold">
                                Notifications SMS
                            </h3>
                            <Chip size="sm" color="warning" variant="flat">
                                Premium
                            </Chip>
                        </div>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Activer les SMS</p>
                                <p className="text-sm text-default-500">
                                    Recevoir des SMS pour les notifications
                                    importantes
                                </p>
                            </div>
                            <Switch
                                isSelected={notifications.sms.enabled}
                                onValueChange={(value) =>
                                    setNotifications({
                                        ...notifications,
                                        sms: {
                                            ...notifications.sms,
                                            enabled: value,
                                        },
                                    })
                                }
                            />
                        </div>

                        {notifications.sms.enabled && (
                            <>
                                <Divider />
                                <div className="flex items-center justify-between pl-4">
                                    <p className="text-sm">
                                        Urgences uniquement
                                    </p>
                                    <Switch
                                        size="sm"
                                        isSelected={
                                            notifications.sms.criticalOnly
                                        }
                                        onValueChange={(value) =>
                                            setNotifications({
                                                ...notifications,
                                                sms: {
                                                    ...notifications.sms,
                                                    criticalOnly: value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </CardBody>
                </Card>

                <div className="flex justify-end">
                    <Button
                        color="primary"
                        isLoading={isSaving && savedSection === "notifications"}
                        startContent={!isSaving && <Save className="w-4 h-4" />}
                        onClick={() => handleSave("notifications")}
                    >
                        {savedSection === "notifications"
                            ? "Enregistré !"
                            : "Enregistrer"}
                    </Button>
                </div>
            </div>
        ),

        security: (
            <div className="space-y-6">
                {/* Mot de passe */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Mot de passe</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Changer le mot de passe
                                </p>
                                <p className="text-sm text-default-500">
                                    Dernière modification il y a 3 mois
                                </p>
                            </div>
                            <Button
                                variant="flat"
                                startContent={<Key className="w-4 h-4" />}
                                onClick={onPasswordOpen}
                            >
                                Modifier
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {/* Authentification à deux facteurs */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Authentification à deux facteurs
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-2 rounded-lg ${
                                        security.twoFactorEnabled
                                            ? "bg-success/10 text-success"
                                            : "bg-default-100"
                                    }`}
                                >
                                    {security.twoFactorEnabled ? (
                                        <Shield className="w-5 h-5" />
                                    ) : (
                                        <AlertTriangle className="w-5 h-5" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {security.twoFactorEnabled
                                            ? "Activée"
                                            : "Désactivée"}
                                    </p>
                                    <p className="text-sm text-default-500">
                                        {security.twoFactorEnabled
                                            ? "Votre compte est protégé"
                                            : "Ajoutez une couche de sécurité supplémentaire"}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant={
                                    security.twoFactorEnabled ? "flat" : "solid"
                                }
                                color={
                                    security.twoFactorEnabled
                                        ? "default"
                                        : "primary"
                                }
                                onClick={on2FAOpen}
                            >
                                {security.twoFactorEnabled
                                    ? "Gérer"
                                    : "Activer"}
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                {/* Sessions et appareils */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Sessions et sécurité
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Durée de session avant déconnexion
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Déconnexion automatique après inactivité
                                    </p>
                                </div>
                                <Select
                                    size="sm"
                                    className="w-32"
                                    selectedKeys={[
                                        security.sessionTimeout.toString(),
                                    ]}
                                    onSelectionChange={(keys) => {
                                        const value = Array.from(keys)[0];
                                        setSecurity({
                                            ...security,
                                            sessionTimeout: parseInt(
                                                value as string
                                            ),
                                        });
                                    }}
                                >
                                    <SelectItem key="15" value="15">
                                        15 min
                                    </SelectItem>
                                    <SelectItem key="30" value="30">
                                        30 min
                                    </SelectItem>
                                    <SelectItem key="60" value="60">
                                        1 heure
                                    </SelectItem>
                                    <SelectItem key="120" value="120">
                                        2 heures
                                    </SelectItem>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Notifications de connexion
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Être alerté lors de nouvelles connexions
                                    </p>
                                </div>
                                <Switch
                                    isSelected={security.loginNotifications}
                                    onValueChange={(value) =>
                                        setSecurity({
                                            ...security,
                                            loginNotifications: value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium">
                                    Appareils connectés
                                </h4>
                                <Button size="sm" variant="flat" color="danger">
                                    Déconnecter tout
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Monitor className="w-5 h-5 text-success" />
                                            <div>
                                                <p className="font-medium text-sm">
                                                    Chrome - Windows
                                                </p>
                                                <p className="text-xs text-default-500">
                                                    Appareil actuel • Yaoundé,
                                                    CM
                                                </p>
                                            </div>
                                        </div>
                                        <Chip
                                            size="sm"
                                            color="success"
                                            variant="flat"
                                        >
                                            Actif
                                        </Chip>
                                    </div>
                                </div>

                                <div className="p-3 bg-default-100 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="w-5 h-5" />
                                            <div>
                                                <p className="font-medium text-sm">
                                                    Safari - iPhone
                                                </p>
                                                <p className="text-xs text-default-500">
                                                    Dernière activité il y a 2
                                                    jours
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="light"
                                            color="danger"
                                        >
                                            Retirer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Accès API */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Accès API</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Clés API</p>
                                <p className="text-sm text-default-500">
                                    Gérer l&apos;accès programmatique à votre
                                    compte
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!security.apiAccess && (
                                    <Chip size="sm" variant="flat">
                                        Désactivé
                                    </Chip>
                                )}
                                <Button
                                    variant="flat"
                                    size="sm"
                                    startContent={<Zap className="w-4 h-4" />}
                                >
                                    Gérer
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <div className="flex justify-end">
                    <Button
                        color="primary"
                        isLoading={isSaving && savedSection === "security"}
                        startContent={!isSaving && <Save className="w-4 h-4" />}
                        onClick={() => handleSave("security")}
                    >
                        {savedSection === "security"
                            ? "Enregistré !"
                            : "Enregistrer"}
                    </Button>
                </div>
            </div>
        ),

        display: (
            <div className="space-y-6">
                {/* Thème */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Apparence</h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div>
                            <p className="font-medium mb-3">Thème</p>
                            <RadioGroup
                                value={display.theme}
                                onValueChange={(value) =>
                                    setDisplay({
                                        ...display,
                                        theme: value as any,
                                    })
                                }
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <Card
                                        className={`border-2 cursor-pointer transition-colors ${
                                            display.theme === "light"
                                                ? "border-primary"
                                                : "border-transparent"
                                        }`}
                                        isPressable
                                        onClick={() =>
                                            setDisplay({
                                                ...display,
                                                theme: "light",
                                            })
                                        }
                                    >
                                        <CardBody className="text-center p-4">
                                            <Sun className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-medium">Clair</p>
                                        </CardBody>
                                    </Card>

                                    <Card
                                        className={`border-2 cursor-pointer transition-colors ${
                                            display.theme === "dark"
                                                ? "border-primary"
                                                : "border-transparent"
                                        }`}
                                        isPressable
                                        onClick={() =>
                                            setDisplay({
                                                ...display,
                                                theme: "dark",
                                            })
                                        }
                                    >
                                        <CardBody className="text-center p-4">
                                            <Moon className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-medium">
                                                Sombre
                                            </p>
                                        </CardBody>
                                    </Card>

                                    <Card
                                        className={`border-2 cursor-pointer transition-colors ${
                                            display.theme === "system"
                                                ? "border-primary"
                                                : "border-transparent"
                                        }`}
                                        isPressable
                                        onClick={() =>
                                            setDisplay({
                                                ...display,
                                                theme: "system",
                                            })
                                        }
                                    >
                                        <CardBody className="text-center p-4">
                                            <Monitor className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-medium">
                                                Système
                                            </p>
                                        </CardBody>
                                    </Card>
                                </div>
                            </RadioGroup>
                        </div>

                        <Divider />

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Mode compact</p>
                                    <p className="text-sm text-default-500">
                                        Réduire l&apos;espacement pour afficher
                                        plus d&apos;informations
                                    </p>
                                </div>
                                <Switch
                                    isSelected={display.compactMode}
                                    onValueChange={(value) =>
                                        setDisplay({
                                            ...display,
                                            compactMode: value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Animations</p>
                                    <p className="text-sm text-default-500">
                                        Activer les transitions et animations
                                    </p>
                                </div>
                                <Switch
                                    isSelected={display.animations}
                                    onValueChange={(value) =>
                                        setDisplay({
                                            ...display,
                                            animations: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Langue et région */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Langue et région
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                label="Langue"
                                selectedKeys={[display.language]}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    setDisplay({
                                        ...display,
                                        language: value as string,
                                    });
                                }}
                                startContent={
                                    <Globe className="w-4 h-4 text-default-400" />
                                }
                            >
                                {languages.map((lang) => (
                                    <SelectItem
                                        key={lang.value}
                                        value={lang.value}
                                        startContent={<span>{lang.flag}</span>}
                                    >
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="Fuseau horaire"
                                selectedKeys={[display.timezone]}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    setDisplay({
                                        ...display,
                                        timezone: value as string,
                                    });
                                }}
                            >
                                {timezones.map((tz) => (
                                    <SelectItem key={tz.value} value={tz.value}>
                                        {tz.label}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="Format de date"
                                selectedKeys={[display.dateFormat]}
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0];
                                    setDisplay({
                                        ...display,
                                        dateFormat: value as string,
                                    });
                                }}
                            >
                                {dateFormats.map((format) => (
                                    <SelectItem
                                        key={format.value}
                                        value={format.value}
                                    >
                                        {format.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                </Card>

                <div className="flex justify-end">
                    <Button
                        color="primary"
                        isLoading={isSaving && savedSection === "display"}
                        startContent={!isSaving && <Save className="w-4 h-4" />}
                        onClick={() => handleSave("display")}
                    >
                        {savedSection === "display"
                            ? "Enregistré !"
                            : "Enregistrer"}
                    </Button>
                </div>
            </div>
        ),

        integrations: (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Intégrations disponibles
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    name: "Slack",
                                    description:
                                        "Recevoir les notifications dans Slack",
                                    icon: "💬",
                                    connected: false,
                                },
                                {
                                    name: "Microsoft Teams",
                                    description:
                                        "Intégration avec Microsoft Teams",
                                    icon: "👥",
                                    connected: false,
                                },
                                {
                                    name: "Google Calendar",
                                    description: "Synchroniser les événements",
                                    icon: "📅",
                                    connected: true,
                                },
                                {
                                    name: "Jira",
                                    description:
                                        "Créer des issues depuis les tickets",
                                    icon: "🎯",
                                    connected: false,
                                },
                            ].map((integration) => (
                                <Card key={integration.name} className="border">
                                    <CardBody>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">
                                                    {integration.icon}
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {integration.name}
                                                    </p>
                                                    <p className="text-sm text-default-500">
                                                        {
                                                            integration.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant={
                                                    integration.connected
                                                        ? "flat"
                                                        : "solid"
                                                }
                                                color={
                                                    integration.connected
                                                        ? "default"
                                                        : "primary"
                                                }
                                                startContent={
                                                    integration.connected ? (
                                                        <Check className="w-4 h-4" />
                                                    ) : (
                                                        <Link2 className="w-4 h-4" />
                                                    )
                                                }
                                            >
                                                {integration.connected
                                                    ? "Connecté"
                                                    : "Connecter"}
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        ),

        privacy: (
            <div className="space-y-6">
                {/* Données personnelles */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Données personnelles
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="space-y-3">
                            <Button
                                variant="flat"
                                className="w-full justify-between"
                                endContent={<Download className="w-4 h-4" />}
                            >
                                <span>Télécharger mes données</span>
                            </Button>
                            <p className="text-sm text-default-500 px-1">
                                Exportez toutes vos données au format JSON
                            </p>
                        </div>

                        <Divider />

                        <div className="space-y-3">
                            <Button
                                variant="flat"
                                color="danger"
                                className="w-full justify-between"
                                endContent={<Trash2 className="w-4 h-4" />}
                                onClick={onDeleteOpen}
                            >
                                <span>Supprimer mon compte</span>
                            </Button>
                            <p className="text-sm text-default-500 px-1">
                                Cette action est irréversible
                            </p>
                        </div>
                    </CardBody>
                </Card>

                {/* Préférences de confidentialité */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">
                            Préférences de confidentialité
                        </h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Profil public</p>
                                    <p className="text-sm text-default-500">
                                        Permettre aux autres utilisateurs de
                                        voir votre profil
                                    </p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Statistiques anonymes
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Aider à améliorer HelpDesk Pro
                                    </p>
                                </div>
                                <Switch defaultSelected />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        Cookies de performance
                                    </p>
                                    <p className="text-sm text-default-500">
                                        Analyser l&apos;utilisation de
                                        l&apos;application
                                    </p>
                                </div>
                                <Switch defaultSelected />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        ),
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Paramètres</h1>
                <p className="text-default-600">
                    Gérez vos préférences et personnalisez votre expérience
                </p>
            </div>

            {/* Navigation Tabs */}
            <Card>
                <CardBody className="p-0">
                    <Tabs
                        selectedKey={selectedTab}
                        onSelectionChange={(key) =>
                            setSelectedTab(key as string)
                        }
                        variant="underlined"
                        classNames={{
                            tabList: "w-full overflow-x-auto",
                            tab: "px-6 py-4",
                        }}
                    >
                        <Tab
                            key="account"
                            title={
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>Compte</span>
                                </div>
                            }
                        />
                        <Tab
                            key="notifications"
                            title={
                                <div className="flex items-center gap-2">
                                    <Bell className="w-4 h-4" />
                                    <span>Notifications</span>
                                </div>
                            }
                        />
                        <Tab
                            key="security"
                            title={
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Sécurité</span>
                                </div>
                            }
                        />
                        <Tab
                            key="display"
                            title={
                                <div className="flex items-center gap-2">
                                    <Palette className="w-4 h-4" />
                                    <span>Affichage</span>
                                </div>
                            }
                        />
                        <Tab
                            key="integrations"
                            title={
                                <div className="flex items-center gap-2">
                                    <Link2 className="w-4 h-4" />
                                    <span>Intégrations</span>
                                </div>
                            }
                        />
                        <Tab
                            key="privacy"
                            title={
                                <div className="flex items-center gap-2">
                                    <Database className="w-4 h-4" />
                                    <span>Confidentialité</span>
                                </div>
                            }
                        />
                    </Tabs>
                </CardBody>
            </Card>

            {/* Tab Content */}
            <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {tabContent[selectedTab as keyof typeof tabContent]}
            </motion.div>

            {/* Modals */}

            {/* Delete Account Modal */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalContent>
                    <ModalHeader>
                        <div className="flex items-center gap-2 text-danger">
                            <AlertTriangle className="w-5 h-5" />
                            Supprimer le compte
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                            Cette action est irréversible et toutes vos données
                            seront perdues.
                        </p>
                        <Input
                            label="Tapez DELETE pour confirmer"
                            variant="bordered"
                            className="mt-4"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onClick={onDeleteClose}>
                            Annuler
                        </Button>
                        <Button color="danger" isDisabled>
                            Supprimer mon compte
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* 2FA Modal */}
            <Modal isOpen={is2FAOpen} onClose={on2FAClose} size="lg">
                <ModalContent>
                    <ModalHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Authentification à deux facteurs
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <p>
                                L&apos;authentification à deux facteurs ajoute
                                une couche de sécurité supplémentaire à votre
                                compte.
                            </p>
                            <div className="bg-default-100 p-4 rounded-lg">
                                <p className="font-medium mb-2">
                                    Comment ça fonctionne :
                                </p>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-default-600">
                                    <li>
                                        Installez une application
                                        d&apos;authentification
                                    </li>
                                    <li>
                                        Scannez le QR code avec
                                        l&apos;application
                                    </li>
                                    <li>
                                        Entrez le code généré pour activer la
                                        protection
                                    </li>
                                </ol>
                            </div>
                            {/* QR Code placeholder */}
                            <div className="flex justify-center">
                                <div className="w-48 h-48 bg-default-200 rounded-lg flex items-center justify-center">
                                    <p className="text-default-500">QR Code</p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onClick={on2FAClose}>
                            Annuler
                        </Button>
                        <Button color="primary" onClick={on2FAClose}>
                            Activer
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Change Password Modal */}
            <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
                <ModalContent>
                    <ModalHeader>
                        <div className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Changer le mot de passe
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Input
                                label="Mot de passe actuel"
                                type="password"
                                variant="bordered"
                                startContent={
                                    <Lock className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Nouveau mot de passe"
                                type="password"
                                variant="bordered"
                                startContent={
                                    <Lock className="w-4 h-4 text-default-400" />
                                }
                            />
                            <Input
                                label="Confirmer le nouveau mot de passe"
                                type="password"
                                variant="bordered"
                                startContent={
                                    <Lock className="w-4 h-4 text-default-400" />
                                }
                            />
                            <div className="bg-default-100 p-3 rounded-lg">
                                <p className="text-sm font-medium mb-2">
                                    Le mot de passe doit contenir :
                                </p>
                                <ul className="text-xs space-y-1 text-default-600">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-3 h-3 text-success" />
                                        Au moins 8 caractères
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-3 h-3 text-success" />
                                        Une lettre majuscule
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="w-3 h-3 text-danger" />
                                        Un chiffre
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="w-3 h-3 text-danger" />
                                        Un caractère spécial
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onClick={onPasswordClose}>
                            Annuler
                        </Button>
                        <Button color="primary" onClick={onPasswordClose}>
                            Modifier
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
