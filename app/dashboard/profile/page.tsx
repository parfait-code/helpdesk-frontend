"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Avatar,
  Divider,
  Chip,
  Switch,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Link,
} from "@nextui-org/react";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Key,
  Save,
  Camera,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  Ticket,
  BarChart3,
  Award,
  Star,
  Lock,
  Smartphone,
  Monitor,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock user data
const userData = {
  id: "1",
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@entreprise.com",
  phone: "+237 6XX XXX XXX",
  company: "Entreprise XYZ",
  department: "Service Commercial",
  role: "Manager",
  location: "Yaoundé, Cameroun",
  avatar: "",
  joinedDate: new Date("2023-01-15"),
  lastLogin: new Date("2024-03-15T14:30:00"),
  stats: {
    totalTickets: 156,
    resolvedTickets: 142,
    averageResponseTime: "2.5h",
    satisfactionRate: 4.8,
  },
  preferences: {
    language: "fr",
    timezone: "Africa/Douala",
    notifications: {
      email: true,
      sms: false,
      browser: true,
      ticketUpdates: true,
      newsletter: true,
      marketing: false,
    },
    theme: "light",
  },
  devices: [
    {
      id: "1",
      name: "Chrome - Windows",
      type: "desktop",
      lastActive: new Date("2024-03-15T14:30:00"),
      current: true,
    },
    {
      id: "2",
      name: "Safari - iPhone",
      type: "mobile",
      lastActive: new Date("2024-03-14T18:00:00"),
      current: false,
    },
  ],
};

const languages = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

const timezones = [
  { value: "Africa/Douala", label: "Yaoundé/Douala (GMT+1)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "UTC", label: "UTC (GMT+0)" },
];

export default function ProfilePage() {
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onClose: onPhotoClose,
  } = useDisclosure();

  const [selectedTab, setSelectedTab] = React.useState("general");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    company: userData.company,
    department: userData.department,
    role: userData.role,
    location: userData.location,
  });

  const [preferences, setPreferences] = React.useState(userData.preferences);

  const [passwordData, setPasswordData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePasswordChange = async () => {
    console.log("Changing password...");
    onPasswordClose();
  };

  const handleDeviceLogout = (deviceId: string) => {
    console.log("Logging out device:", deviceId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mon Profil</h1>
          <p className="text-default-600">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-success"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Modifications enregistrées</span>
          </motion.div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar
                src={userData.avatar}
                name={`${userData.firstName} ${userData.lastName}`}
                className="w-24 h-24 text-2xl"
              />
              <Button
                isIconOnly
                size="sm"
                className="absolute bottom-0 right-0"
                onClick={onPhotoOpen}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-default-600">{userData.email}</p>
              <p className="text-sm text-default-500 mt-1">
                {userData.role} • {userData.department}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <Chip
                  size="sm"
                  variant="flat"
                  startContent={<Calendar className="w-3 h-3" />}
                >
                  Membre depuis{" "}
                  {userData.joinedDate.toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                </Chip>
                <Chip
                  size="sm"
                  variant="flat"
                  startContent={<Clock className="w-3 h-3" />}
                >
                  Dernière connexion{" "}
                  {userData.lastLogin.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Chip>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-auto">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {userData.stats.totalTickets}
                </p>
                <p className="text-xs text-default-500">Tickets créés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {userData.stats.resolvedTickets}
                </p>
                <p className="text-xs text-default-500">Résolus</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {userData.stats.averageResponseTime}
                </p>
                <p className="text-xs text-default-500">Temps moyen</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-2xl font-bold">
                    {userData.stats.satisfactionRate}
                  </p>
                  <Star className="w-5 h-5 text-warning fill-current" />
                </div>
                <p className="text-xs text-default-500">Satisfaction</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs Content */}
      <Card>
        <CardBody>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
          >
            <Tab key="general" title="Informations générales">
              <div className="space-y-6 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Informations personnelles
                  </h3>
                  {!isEditing ? (
                    <Button
                      variant="flat"
                      startContent={<Edit className="w-4 h-4" />}
                      onClick={() => setIsEditing(true)}
                    >
                      Modifier
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="light"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            phone: userData.phone,
                            company: userData.company,
                            department: userData.department,
                            role: userData.role,
                            location: userData.location,
                          });
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        color="primary"
                        startContent={<Save className="w-4 h-4" />}
                        onClick={handleSave}
                        isLoading={isSaving}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    value={formData.firstName}
                    onValueChange={(value) =>
                      setFormData({ ...formData, firstName: value })
                    }
                    isReadOnly={!isEditing}
                    startContent={<User className="w-4 h-4 text-default-400" />}
                  />
                  <Input
                    label="Nom"
                    value={formData.lastName}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lastName: value })
                    }
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    isReadOnly
                    startContent={<Mail className="w-4 h-4 text-default-400" />}
                    description="L'email ne peut pas être modifié"
                  />
                  <Input
                    label="Téléphone"
                    value={formData.phone}
                    onValueChange={(value) =>
                      setFormData({ ...formData, phone: value })
                    }
                    isReadOnly={!isEditing}
                    startContent={
                      <Phone className="w-4 h-4 text-default-400" />
                    }
                  />
                  <Input
                    label="Entreprise"
                    value={formData.company}
                    onValueChange={(value) =>
                      setFormData({ ...formData, company: value })
                    }
                    isReadOnly={!isEditing}
                    startContent={
                      <Building className="w-4 h-4 text-default-400" />
                    }
                  />
                  <Input
                    label="Département"
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Fonction"
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Localisation"
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                    isReadOnly={!isEditing}
                    startContent={
                      <MapPin className="w-4 h-4 text-default-400" />
                    }
                  />
                </div>
              </div>
            </Tab>

            <Tab key="preferences" title="Préférences">
              <div className="space-y-6 mt-6">
                {/* Language & Region */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Langue et région
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Langue"
                      value={preferences.language}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          language: e.target.value,
                        })
                      }
                      startContent={
                        <Globe className="w-4 h-4 text-default-400" />
                      }
                    >
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Fuseau horaire"
                      value={preferences.timezone}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          timezone: e.target.value,
                        })
                      }
                      startContent={
                        <Clock className="w-4 h-4 text-default-400" />
                      }
                    >
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <Divider />

                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-default-400" />
                        <div>
                          <p className="font-medium">Notifications par email</p>
                          <p className="text-sm text-default-500">
                            Recevoir les mises à jour par email
                          </p>
                        </div>
                      </div>
                      <Switch
                        isSelected={preferences.notifications.email}
                        onValueChange={(value) =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              email: value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-default-400" />
                        <div>
                          <p className="font-medium">Notifications SMS</p>
                          <p className="text-sm text-default-500">
                            Recevoir les alertes urgentes par SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        isSelected={preferences.notifications.sms}
                        onValueChange={(value) =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              sms: value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-default-400" />
                        <div>
                          <p className="font-medium">
                            Notifications navigateur
                          </p>
                          <p className="text-sm text-default-500">
                            Afficher les notifications dans le navigateur
                          </p>
                        </div>
                      </div>
                      <Switch
                        isSelected={preferences.notifications.browser}
                        onValueChange={(value) =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              browser: value,
                            },
                          })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Ticket className="w-5 h-5 text-default-400" />
                        <div>
                          <p className="font-medium">
                            Mises à jour des tickets
                          </p>
                          <p className="text-sm text-default-500">
                            Notifications sur l'évolution de vos tickets
                          </p>
                        </div>
                      </div>
                      <Switch
                        isSelected={preferences.notifications.ticketUpdates}
                        onValueChange={(value) =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              ticketUpdates: value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-default-400" />
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-default-500">
                            Actualités et conseils IT
                          </p>
                        </div>
                      </div>
                      <Switch
                        isSelected={preferences.notifications.newsletter}
                        onValueChange={(value) =>
                          setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              newsletter: value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button color="primary" className="w-full sm:w-auto">
                  Enregistrer les préférences
                </Button>
              </div>
            </Tab>

            <Tab key="security" title="Sécurité">
              <div className="space-y-6 mt-6">
                {/* Password */}
                <Card>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Key className="w-5 h-5 text-default-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Mot de passe</p>
                          <p className="text-sm text-default-500">
                            Dernière modification il y a 3 mois
                          </p>
                        </div>
                      </div>
                      <Button variant="flat" size="sm" onClick={onPasswordOpen}>
                        Modifier
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* Two-Factor Auth */}
                <Card>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-default-400 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            Authentification à deux facteurs
                          </p>
                          <p className="text-sm text-default-500">
                            Ajoutez une couche de sécurité supplémentaire
                          </p>
                        </div>
                      </div>
                      <Chip color="danger" variant="flat" size="sm">
                        Désactivée
                      </Chip>
                    </div>
                    <Button
                      variant="flat"
                      color="primary"
                      className="w-full mt-4"
                    >
                      Activer 2FA
                    </Button>
                  </CardBody>
                </Card>

                <Divider />

                {/* Active Sessions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Sessions actives
                  </h3>
                  <div className="space-y-3">
                    {userData.devices.map((device) => (
                      <Card key={device.id}>
                        <CardBody>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {device.type === "desktop" ? (
                                <Monitor className="w-5 h-5 text-default-400" />
                              ) : (
                                <Smartphone className="w-5 h-5 text-default-400" />
                              )}
                              <div>
                                <p className="font-medium">{device.name}</p>
                                <p className="text-sm text-default-500">
                                  Dernière activité :{" "}
                                  {device.lastActive.toLocaleString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {device.current && (
                                <Chip size="sm" color="success" variant="flat">
                                  Session actuelle
                                </Chip>
                              )}
                              {!device.current && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="danger"
                                  startContent={<LogOut className="w-4 h-4" />}
                                  onClick={() => handleDeviceLogout(device.id)}
                                >
                                  Déconnecter
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-danger">
                    Zone dangereuse
                  </h3>
                  <Card className="border-danger">
                    <CardBody>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Supprimer le compte</p>
                          <p className="text-sm text-default-500">
                            Cette action est irréversible
                          </p>
                        </div>
                        <Button
                          color="danger"
                          variant="flat"
                          size="sm"
                          onClick={onDeleteOpen}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
        <ModalContent>
          <ModalHeader>Modifier le mot de passe</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Mot de passe actuel"
                type="password"
                value={passwordData.currentPassword}
                onValueChange={(value) =>
                  setPasswordData({ ...passwordData, currentPassword: value })
                }
                startContent={<Lock className="w-4 h-4 text-default-400" />}
              />
              <Input
                label="Nouveau mot de passe"
                type="password"
                value={passwordData.newPassword}
                onValueChange={(value) =>
                  setPasswordData({ ...passwordData, newPassword: value })
                }
                startContent={<Key className="w-4 h-4 text-default-400" />}
                description="Minimum 8 caractères avec majuscules, minuscules et chiffres"
              />
              <Input
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={passwordData.confirmPassword}
                onValueChange={(value) =>
                  setPasswordData({ ...passwordData, confirmPassword: value })
                }
                startContent={<Shield className="w-4 h-4 text-default-400" />}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onPasswordClose}>
              Annuler
            </Button>
            <Button color="primary" onPress={handlePasswordChange}>
              Modifier
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Account Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Supprimer le compte</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                <div>
                  <p className="font-medium">Cette action est irréversible</p>
                  <p className="text-sm text-default-500 mt-1">
                    Toutes vos données seront définitivement supprimées,
                    incluant :
                  </p>
                  <ul className="text-sm text-default-500 mt-2 space-y-1 list-disc list-inside">
                    <li>Tous vos tickets et historiques</li>
                    <li>Vos informations personnelles</li>
                    <li>Vos préférences et paramètres</li>
                  </ul>
                </div>
              </div>
              <Input
                label="Tapez DELETE pour confirmer"
                placeholder="DELETE"
                description="Cette action ne peut pas être annulée"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onDeleteClose}>
              Annuler
            </Button>
            <Button color="danger" onPress={onDeleteClose} isDisabled>
              Supprimer définitivement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Photo Modal */}
      <Modal isOpen={isPhotoOpen} onClose={onPhotoClose}>
        <ModalContent>
          <ModalHeader>Modifier la photo de profil</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Avatar
                  src={userData.avatar}
                  name={`${userData.firstName} ${userData.lastName}`}
                  className="w-32 h-32 text-3xl"
                />
              </div>
              <div className="text-center">
                <Button color="primary" variant="flat">
                  Choisir une photo
                </Button>
                <p className="text-xs text-default-500 mt-2">
                  JPG, PNG ou GIF - Max 5MB
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onPhotoClose}>
              Annuler
            </Button>
            <Button color="primary" onPress={onPhotoClose}>
              Enregistrer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
